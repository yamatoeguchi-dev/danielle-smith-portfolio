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
        imageUrl: "/gifs/social/ecoli.GIF"
    },
    {
        title: "Sample Article 2",
        url: "https://example.com/article1",
        publishedAt: "2023-01-01",
        tags: ["sample", "article"],
        company: "Example Co.",
        description: "This is a sample article for demonstration purposes.",
        imageUrl: "/gifs/social/parking.GIF"
    },
    {
        title: "Sample Article 3",
        url: "https://example.com/article1",
        publishedAt: "2023-01-01",
        tags: ["sample", "article"],
        company: "Example Co.",
        description: "This is a sample article for demonstration purposes.",
        imageUrl: "/gifs/social/robot.GIF"
    },
    {
        title: "Sample Article 3",
        url: "https://example.com/article1",
        publishedAt: "2023-01-01",
        tags: ["sample", "article"],
        company: "Example Co.",
        description: "This is a sample article for demonstration purposes.",
        imageUrl: "/gifs/social/spider.GIF"
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