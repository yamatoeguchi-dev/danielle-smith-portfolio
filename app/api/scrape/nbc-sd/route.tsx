import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { ArchiveOrganizationType } from '@/lib/enums/Archive.enum'
import { NBCArticleContent } from '@/services/scraper/nbc-sd-scraper'
import { NbcSdScraper } from '@/services/scraper/nbc-sd-scraper'

/**
 * Scrapes data from a specified source and stores it in the database.
 *
 * @param request - NextRequest object containing request details
 * @returns NextResponse indicating the result of the scraping operation
 */
export async function GET() {
  // For now, only scrape NBC San Diego website. This will be expanded once more scrapers are added.
  const nbc_sd_scraper = new NbcSdScraper()
  const nbc_articles: NBCArticleContent[] = await nbc_sd_scraper.scrape()

  // Get the latest publishDate in the database
  const latest_saved_publish_date = await prisma.archive.findFirst({
    where: {
      organization: ArchiveOrganizationType.NBC_SAN_DIEGO,
    },
    orderBy: {
      publishDate: 'desc',
    },
  })

  // Filter scraped data to only include new articles
  const new_articles: NBCArticleContent[] = nbc_articles.filter((article: any) => {
    if (!latest_saved_publish_date) return true
    return new Date(article.publishDate) > new Date(latest_saved_publish_date.publishDate)
  })

  // If no new articles, return early
  if (new_articles.length === 0) {
    return NextResponse.json({ message: "Scraping complete. No new articles found." })
  }

  console.log(`Found ${new_articles.length} new articles from NBC San Diego. Saving to database...`)
  await prisma.archive.createMany({
    data: new_articles.map(a => ({
      organization: a.organization,
      contentType: a.contentType,
      publishDate: a.publishDate,
      url: a.articleUrl,
      headline: a.headline,
    })),
    skipDuplicates: true,
  });

  return NextResponse.json({ message: `Found and saved ${new_articles.length} articles.` })
}