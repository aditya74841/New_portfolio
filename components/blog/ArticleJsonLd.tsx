import { BlogPostMeta } from "@/lib/blog";

interface ArticleJsonLdProps {
    post: BlogPostMeta;
    url: string;
}

export default function ArticleJsonLd({ post, url }: ArticleJsonLdProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage
            ? `https://iamadityaranjan.com${post.coverImage}`
            : "https://iamadityaranjan.com/og-image.jpg",
        author: {
            "@type": "Person",
            name: post.author?.name || "Aditya Ranjan",
            url: "https://iamadityaranjan.com",
        },
        publisher: {
            "@type": "Person",
            name: "Aditya Ranjan",
            url: "https://iamadityaranjan.com",
        },
        datePublished: post.date,
        dateModified: post.date,
        url,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        keywords: post.tags.join(", "),
        inLanguage: post.language === "hi" ? "hi-IN" : "en-US",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
