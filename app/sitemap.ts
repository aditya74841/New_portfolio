import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://iamadityaranjan.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const allPosts = getAllPosts();
    // Include English posts in sitemap; Hindi posts are alternates (hreflang handles them)
    const englishPosts = allPosts.filter((p) => p.language !== "hi");

    const blogEntries: MetadataRoute.Sitemap = englishPosts.map((post) => ({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: post.featured ? 0.9 : 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/cv`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.7,
        },
        ...blogEntries,
    ];
}