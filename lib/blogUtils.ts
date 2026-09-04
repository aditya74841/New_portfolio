import { BlogPostMeta } from "@/lib/blog";

const LIFE_TAGS = new Set([
    "life",
    "perspective",
    "family",
    "philosophy",
    "personal",
    "mindset",
    "society",
    "relationships",
    "nature",
    "farmer",
    "essay",
]);

/**
 * Derive content category from a post's tags.
 * Kept in a separate file so it can be safely imported by both
 * server components AND client components (no Node.js `fs` dependency).
 */
export function getPostCategory(post: BlogPostMeta): "tech" | "life" {
    const tags = post.tags.map((t) => t.toLowerCase());
    return tags.some((t) => LIFE_TAGS.has(t)) ? "life" : "tech";
}
