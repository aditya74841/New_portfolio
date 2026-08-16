import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readTime: string;
    coverImage?: string;
    author?: {
        name: string;
        avatar?: string;
    };
    featured?: boolean;
    published?: boolean;
    language?: string;
    translationKey?: string;
}

export interface BlogPost {
    meta: BlogPostMeta;
    content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

/**
 * Calculate estimated reading time for a text block (approx. 200 wpm)
 */
function calculateReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
}

/**
 * Get all published blog posts metadata sorted by date descending
 */
export function getAllPosts(): BlogPostMeta[] {
    if (!fs.existsSync(BLOGS_DIR)) {
        return [];
    }

    const fileNames = fs.readdirSync(BLOGS_DIR);

    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, "");
            const fullPath = path.join(BLOGS_DIR, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            const meta: BlogPostMeta = {
                slug,
                title: data.title || "Untitled Post",
                date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
                excerpt: data.excerpt || "",
                tags: Array.isArray(data.tags) ? data.tags : [],
                readTime: data.readTime || calculateReadingTime(content),
                coverImage: data.coverImage || undefined,
                author: data.author || { name: "Aditya Ranjan" },
                featured: Boolean(data.featured),
                published: data.published !== false,
                language: data.language || undefined,
                translationKey: data.translationKey || undefined,
            };

            return meta;
        })
        .filter((post) => post.published)
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return posts;
}

/**
 * Get single blog post content and metadata by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const mdxPath = path.join(BLOGS_DIR, `${slug}.mdx`);
    const mdPath = path.join(BLOGS_DIR, `${slug}.md`);

    let fullPath = "";
    if (fs.existsSync(mdxPath)) {
        fullPath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
        fullPath = mdPath;
    } else {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const meta: BlogPostMeta = {
        slug,
        title: data.title || "Untitled Post",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        excerpt: data.excerpt || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readTime: data.readTime || calculateReadingTime(content),
        coverImage: data.coverImage || undefined,
        author: data.author || { name: "Aditya Ranjan" },
        featured: Boolean(data.featured),
        published: data.published !== false,
        language: data.language || undefined,
        translationKey: data.translationKey || undefined,
    };

    return {
        meta,
        content,
    };
}

/**
 * Get all unique tags from published blog posts
 */
export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
        post.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
}
