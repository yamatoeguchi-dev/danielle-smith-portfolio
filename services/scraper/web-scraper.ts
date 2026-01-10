/**
 * Abstract class representing a web scraper.
 */
export abstract class WebScraper {
    abstract base_url: string;

    /**
     * Scrapes data from a given webpage URL.
     *
     * @returns - The scraped data
     */
    async scrape(): Promise<any> {
        // Get HTML content from the URL
        const html = await WebScraper.get_html(this.base_url);

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
    static async get_html(url: string): Promise<string> {
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

            console.log(`Successfully scraped URL: ${url}`);
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