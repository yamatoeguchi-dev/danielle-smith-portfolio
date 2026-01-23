import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { ArchiveOrganizationType } from "@/lib/enums/archive.enum";
import { NBCArticleContent, NbcSdScraper } from "@/services/scraper/nbc-sd-scraper";
import { notifierConfig } from "@/lib/config/notifier.config";
import { GmailNotifier } from "@/services/notifier/gmail-notifier";

/**
 * Scrapes data from NBC San Diego and stores it in the database.
 */
export async function GET() {
  const nbc_sd_scraper = new NbcSdScraper();
  let nbc_articles: NBCArticleContent[] = [];

  try {
    nbc_articles = await nbc_sd_scraper.scrape();
  } catch (error) {
    console.error("Error during NBC San Diego scraping:", error);
    return NextResponse.json({ message: "Error during scraping.", error }, { status: 500 });
  }

  if (nbc_articles.length === 0) {
    console.info("No articles found during NBC San Diego scraping.");
    return NextResponse.json({ message: "No articles found." });
  }

  const gmailNotifier = new GmailNotifier(notifierConfig.GMAIL);

  function normalizeHeadline(s: string): string {
    return (s ?? "")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, "-")
      .trim()
      .toLowerCase();
  }

  // -----------------------------
  // 1) Dedup within the scrape itself
  // -----------------------------
  const seenInScrape = new Set<string>();
  const scrapeDeduped: NBCArticleContent[] = [];

  for (const a of nbc_articles) {
    const key = normalizeHeadline(a.headline ?? "");
    if (!key) continue;
    if (seenInScrape.has(key)) continue;
    seenInScrape.add(key);
    scrapeDeduped.push(a);
  }

  // -----------------------------
  // 2) Pull a RECENT window of DB headlines and normalize in-memory
  // -----------------------------
  const TAKE_N = 500;
  let existingRows = await prisma.archive.findMany({
    where: {
      organization: ArchiveOrganizationType.NBC_SAN_DIEGO,
    },
    orderBy: { publishDate: "desc" },
    take: TAKE_N,
    select: { headline: true },
  });

  if (existingRows.length === 0) {
    console.warn(
      `No existing rows found for org=${ArchiveOrganizationType.NBC_SAN_DIEGO}. Falling back to recent global headlines.`
    );
    existingRows = await prisma.archive.findMany({
      orderBy: { publishDate: "desc" },
      take: TAKE_N,
      select: { headline: true },
    });
  }

  const existingNormSet = new Set(
    existingRows.map((r) => normalizeHeadline(r.headline ?? "")).filter(Boolean)
  );

  // -----------------------------
  // 3) Final: headline-only "new" = not in DB set
  // -----------------------------
  const filtered_new_articles = scrapeDeduped.filter((a) => {
    const key = normalizeHeadline(a.headline ?? "");
    return key && !existingNormSet.has(key);
  });

  // If no new articles, notify and return early
  if (filtered_new_articles.length === 0) {
    console.info("No new articles found.");

    const subject = "🔔DAN-E-BLAST ALERT: No new articles.";
    const body = `<p>No new articles were found during the latest NBC San Diego scrape.</p>`;
    await gmailNotifier.sendNotification(notifierConfig.recipients, subject, body);

    return NextResponse.json({ message: "Scraping complete. No new articles found." });
  }

  console.log(
    `Found ${filtered_new_articles.length} new articles. Saving to database...`
  );

  await prisma.archive.createMany({
    data: filtered_new_articles.map((a) => ({
      organization: a.organization,
      contentType: a.contentType,
      publishDate: a.publishDate,
      url: a.articleUrl,
      headline: a.headline,
      imageUrl: a.imageUrl,
    })),
    skipDuplicates: true,
  });

  // -----------------------------
  // Email rendering
  // -----------------------------
  const subject = `🔔DAN-E-BLAST ALERT: ${filtered_new_articles.length} new articles found!`;

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(d);
  };

  const escapeHtml = (value: string): string =>
    (value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const storyCards = filtered_new_articles
    .map((story) => {
      const headline = escapeHtml(story.headline ?? "");
      const dateStr = formatDate(story.publishDate);

      return `
        <tr>
          <td style="padding: 0 0 14px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
              style="border: 1px solid #e6e6e6; border-radius: 12px; background: #ffffff;">
              <tr>
                <td style="padding: 18px 18px 14px 18px;">
                  <div style="font-size: 18px; line-height: 1.3; font-weight: 700; margin: 0 0 6px 0;">
                    <a href="${story.articleUrl}"
                       style="color: #111827; text-decoration: none;">
                      ${headline}
                    </a>
                  </div>

                  <div style="font-size: 12px; color: #6b7280; margin: 0 0 12px 0;">
                    ${escapeHtml(dateStr)}
                  </div>

                  <div style="margin-top: 14px;">
                    <a href="${story.articleUrl}"
                       style="display: inline-block; padding: 10px 14px; border-radius: 10px; background: #111827; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600;">
                      Read full story →
                    </a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join("");

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${escapeHtml(subject)}</title>
    </head>
    <body style="margin:0; padding:0; background:#f3f4f6;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f4f6; padding: 28px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0"
              style="width: 640px; max-width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

              <tr>
                <td style="padding: 0 0 14px 0;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                    style="border-radius: 14px; background: #111827; color: #ffffff;">
                    <tr>
                      <td style="padding: 18px;">
                        <div style="font-size: 22px; font-weight: 800; margin-top: 6px;">
                          🔔 ${filtered_new_articles.length} New Dani Articles
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${storyCards}

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `.trim();

  await gmailNotifier.sendNotification(notifierConfig.recipients, subject, html);
  console.log("Notification sent.");

  return NextResponse.json({ message: `Found and saved ${filtered_new_articles.length} articles.` });
}
