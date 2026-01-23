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

            articleContents.push({
                organization: ArchiveOrganizationType.NBC_SAN_DIEGO,
                contentType: ArchiveContentType.DIGITAL_ARTICLE,
                publishDate: articlePublishedDate,
                articleUrl: articleUrl,
                headline: articleHeadline,
            })
        }

        console.log(`Parsed ${articleContents.length} articles from NBC San Diego.`);
        return articleContents;
    }

    private static normalizeText(s: string): string {
        return (s ?? "").replace(/\s+/g, " ").trim();
    }
}