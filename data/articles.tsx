// TODO: Create a database of articles and fetch from there instead of hardcoding.

import { ArticleLink } from "@/types/media-content";

export const SOCIAL_MEDIA_ARTICLES: ArticleLink[] = [
    {
        title: "Sample Article 1",
        url: "https://example.com/article1",
        publishedAt: "2023-01-01",
        tags: ["sample", "article"],
        company: "Example Co.",
        description: "This is a sample article for demonstration purposes.",
        imageUrl: "https://rdaniellesmith.wordpress.com/wp-content/uploads/2024/12/point-loma-shooting-erik-ho-1.png.webp"
    },
    {
        title: "Sample Article 2",
        url: "https://example.com/article1",
        publishedAt: "2023-01-01",
        tags: ["sample", "article"],
        company: "Example Co.",
        description: "This is a sample article for demonstration purposes.",
        imageUrl: "https://rdaniellesmith.wordpress.com/wp-content/uploads/2024/12/carlsbad-emotorcycle.png.webp"
    },
    {
        title: "Sample Article 3",
        url: "https://example.com/article1",
        publishedAt: "2023-01-01",
        tags: ["sample", "article"],
        company: "Example Co.",
        description: "This is a sample article for demonstration purposes.",
        imageUrl: "https://rdaniellesmith.wordpress.com/wp-content/uploads/2024/12/drowning.png.webp"
    },
];

export const DIGITAL_WEB_ARTICLES: ArticleLink[] = [
    {
        title: "Sample Article 2",
        url: "https://example.com/article2",
        publishedAt: "2023-02-01",
        tags: ["digital", "web"],
        company: "Example Co.",
        description: "This is another sample article for demonstration purposes.",
        imageUrl: "https://example.com/image2.jpg"
    }
];