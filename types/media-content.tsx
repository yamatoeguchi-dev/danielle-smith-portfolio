export type ArticleLink = {
    title: string;
    url: string;
    publishedAt?: string; // ISO string
    category?: string  // e.g., "on-camera", "writing", "producing"
    tags?: string[];
    company?: string;  // e.g., "NBC"
    description?: string;
    imageUrl: string;
}