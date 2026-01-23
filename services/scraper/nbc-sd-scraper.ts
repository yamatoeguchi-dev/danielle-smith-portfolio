import * as cheerio from "cheerio";

import { WebScraper } from "./web-scraper";
import { ArchiveContentType, ArchiveOrganizationType } from "@/lib/enums/archive.enum";


/**
 * Type representing the content of a digital article.
 *
 * @property contentType - The type of content, set to DIGITAL_ARTICLE
 * @property headline - The headline of the article
 * @property publishDate - The published date of the article
 * @property articleUrl - The URL of the article
 */
export type NBCArticleContent = {
    "organization": ArchiveOrganizationType.NBC_SAN_DIEGO;
    "contentType": ArchiveContentType.DIGITAL_ARTICLE;
    "headline": string;
    "publishDate": string;
    "articleUrl": string;
    "imageUrl": string;
}

/**
 * Scraper class for NBC San Diego website.
 */
export class NbcSdScraper extends WebScraper {
    base_url: string = "https://www.nbcsandiego.com/author/danielle-smith/";

    /**
     * Parses the HTML content of a NBC San Diego webpage.
     *
     * @param html - The HTML content as a string
     * @returns - The parsed data
     */
    async parse_html(html: string): Promise<any> {
        // Implement NBC San Diego specific HTML parsing logic here
        console.info("Parsing HTML for NBC San Diego...");

        const $page = cheerio.load(html);
        const storyCards = $page("li.story-card").toArray();

        const articleContents: NBCArticleContent[] = [];

        for (const cardE1 of storyCards) {
            const $card = $page(cardE1);

            const articleUrl = $card.find("a.story-card__thumbnail").attr("href")?.trim() ?? "";

            // Ignore Telemundo stories
            if (!articleUrl || articleUrl.includes("telemundo")) continue;

            // Scrape the article page HTML
            const articleData = await WebScraper.get_html(articleUrl);
            const $article = cheerio.load(articleData);

            // Get the article headline
            const headlineRaw = $article("h1.article-headline").first().text().trim();
            const articleHeadline = NbcSdScraper.normalizeText(headlineRaw);

            // Get article published date
            const datetimeRaw = $article("time.entry-date.published").first().attr("datetime") ?? "";
            const articlePublishedDate = NbcSdScraper.normalizeText(datetimeRaw);

            // Get image url
            const imageUrl = NbcSdScraper.extractBestImageUrl($article);

            articleContents.push({
                organization: ArchiveOrganizationType.NBC_SAN_DIEGO,
                contentType: ArchiveContentType.DIGITAL_ARTICLE,
                publishDate: articlePublishedDate,
                articleUrl: articleUrl,
                headline: articleHeadline,
                imageUrl: imageUrl
            })
        }

        console.log(`Parsed ${articleContents.length} articles from NBC San Diego.`);
        return articleContents;
    }

    private static normalizeText(s: string): string {
        return (s ?? "").replace(/\s+/g, " ").trim();
    }

    /**
     * Attempts to extract the "best" image URL for an NBC article:
     * 1) figure.article-featured-media img -> best from srcset, else src
     * 2) video player case: [data-react-component='VideoPlaylist'][data-props] -> first video poster
     */
    private static extractBestImageUrl($article: cheerio.CheerioAPI): string {
        const $figure = $article("figure.article-featured-media").first();
        if (!$figure.length) return "";

        // Case 1: standard featured image
        const $img = $figure.find("img").first();
        if ($img.length) {
            const srcset = ($img.attr("srcset") ?? "").trim();
            const fromSrcset = NbcSdScraper.bestFromSrcset(srcset);
            const src = ($img.attr("src") ?? "").trim();
            const chosen = (fromSrcset || src || "").trim();
            if (chosen) return chosen;
        }

        // Case 2: video player -> parse props for poster
        const $vp = $figure
            .find("[data-react-component='VideoPlaylist']")
            .first();

        const propsRaw = $vp.attr("data-props");
        if (propsRaw) {
            // The HTML attribute is often entity-escaped; cheerio's decodeEntities may help,
            // but we still normalize common cases explicitly.
            const unescaped = NbcSdScraper.htmlUnescape(propsRaw);

            try {
            const props = JSON.parse(unescaped) as any;
            const videos: any[] = props?.videos ?? [];
            const first = videos?.[0] ?? {};
            const poster = (first?.poster ?? "").trim();
            if (poster) return poster;
            } catch {
            // ignore JSON parse failures; return empty below
            }
        }

        return "";
    }

    /**
     * Given a srcset string, return the URL with the largest width descriptor.
     * Example: "a.jpg 320w, b.jpg 850w" -> "b.jpg"
     */
    private static bestFromSrcset(srcset: string): string | null {
        if (!srcset) return null;

        let bestUrl: string | null = null;
        let bestW = -1;

        for (const partRaw of srcset.split(",")) {
            const part = partRaw.trim();
            if (!part) continue;

            const tokens = part.split(/\s+/).filter(Boolean);
            const url = (tokens[0] ?? "").trim();
            if (!url) continue;

            let w = 0; // if no width descriptor, treat as lowest priority

            if (tokens.length > 1) {
            const m = tokens[1].match(/(\d+)w$/);
            if (m?.[1]) w = parseInt(m[1], 10);
            }

            if (w > bestW) {
            bestW = w;
            bestUrl = url;
            }
        }

        return bestUrl;
    }

    /**
     * Minimal HTML entity unescape for common attribute-escaped JSON.
     * (Equivalent spirit to Python's html.unescape for this use-case.)
     */
    private static htmlUnescape(s: string): string {
        if (!s) return s;

        // Common entities found in attribute-escaped JSON
        return s
            .replace(/&quot;/g, '"')
            .replace(/&#34;/g, '"')
            .replace(/&#x22;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&#39;/g, "'")
            .replace(/&#x27;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }
}