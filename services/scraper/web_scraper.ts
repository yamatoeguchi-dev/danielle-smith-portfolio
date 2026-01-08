/**
 * Abstract class representing a web scraper.
 */
export abstract class WebScraper {
    /**
     * Scrapes data from a given webpage URL.
     *
     * @param url - The URL of the webpage to scrape
     * @returns - The scraped data
     */
    async scrape(url: string): Promise<string> {
        // Get HTML content from the URL
        const html = await this.get_html(url);

        // Parse the HTML content
        const scrapeData = this.parse_html(html);

        return scrapeData;
    }

    /**
     * Scrapes the HTML content of a given webpage URL.
     *
     * @param url - The URL of the webpage to scrape
     * @returns - The HTML content of the scraped webpage as a string
     */
    async get_html(url: string): Promise<string> {
        if (!url) {
            throw new Error("URL is required for scraping.");
        }

        console.info(`Scraping URL: ${url}`);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const htmlText: string = await response.text();
            return htmlText;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Parses the HTML content of a webpage.
     *
     * @param html - The HTML content as a string
     * @returns - The parsed data
     */
    abstract parse_html(html: string): any;
}