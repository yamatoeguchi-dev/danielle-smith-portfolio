import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { NbcSdScraper } from '@/services/scraper/nbc_sd_scraper'
import { scraperConfig } from '@/lib/config/scraper.config'

/**
 * Scrapes data from a specified source and stores it in the database.
 *
 * @param request - NextRequest object containing request details
 * @returns NextResponse indicating the result of the scraping operation
 */
export async function GET(request: NextRequest) {
  // For now, only scrape NBC San Diego website. This will be expanded once more scrapers are added.
  const url = scraperConfig.url
  const webscraper = new NbcSdScraper()
  const html = await webscraper.scrape(url)

  return NextResponse.json({ message: 'Scraping completed', data: html })
}