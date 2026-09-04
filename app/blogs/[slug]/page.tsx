import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getPostCategory } from "@/lib/blogUtils";
import { getSeriesContextForPost } from "@/lib/series";
import MDXContent from "@/components/blog/MDXContent";
import LanguageToggleClient from "@/components/blog/LanguageToggleClient";
import ArticleJsonLd from "@/components/blog/ArticleJsonLd";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import SeriesBanner from "@/components/blog/SeriesBanner";
import SeriesNavigationFooter from "@/components/blog/SeriesNavigationFooter";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

const BASE_URL = "https://iamadityaranjan.com";

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };

    const allPosts = getAllPosts();
    const siblings = post.meta.translationKey
        ? allPosts.filter(
              (p) => p.translationKey === post.meta.translationKey && p.slug !== slug
          )
        : [];

    const canonicalUrl = `${BASE_URL}/blogs/${slug}`;
    const hreflangLanguages: Record<string, string> = {
        [post.meta.language || "en"]: canonicalUrl,
    };
    siblings.forEach((s) => {
        if (s.language) hreflangLanguages[s.language] = `${BASE_URL}/blogs/${s.slug}`;
    });

    const ogImage = post.meta.coverImage
        ? `${BASE_URL}${post.meta.coverImage}`
        : `${BASE_URL}/og-image.jpg`;

    return {
        title: post.meta.title,
        description: post.meta.excerpt,
        alternates: {
            canonical: canonicalUrl,
            languages: siblings.length > 0 ? hreflangLanguages : undefined,
        },
        openGraph: {
            title: post.meta.title,
            description: post.meta.excerpt,
            type: "article",
            url: canonicalUrl,
            publishedTime: post.meta.date,
            authors: [post.meta.author?.name || "Aditya Ranjan"],
            tags: post.meta.tags,
            images: [{ url: ogImage, width: 1200, height: 630, alt: post.meta.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.meta.title,
            description: post.meta.excerpt,
            images: [ogImage],
        },
    };
}

export default async function BlogPostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post || !post.meta.published) notFound();

    const allPosts = getAllPosts();

    const translations = post.meta.translationKey
        ? allPosts.filter(
              (p) => p.translationKey === post.meta.translationKey && p.slug !== slug
          )
        : [];

    // Series Context
    const seriesContext = getSeriesContextForPost(post.meta);

    // Related: same category, different post, English only, max 4
    const category = getPostCategory(post.meta);
    const related = allPosts
        .filter((p) => p.slug !== slug && p.language !== "hi" && getPostCategory(p) === category)
        .slice(0, 4);

    const canonicalUrl = `${BASE_URL}/blogs/${slug}`;

    return (
        <>
            <ReadingProgressBar />
            <ArticleJsonLd post={post.meta} url={canonicalUrl} />

            <main className="min-h-screen bg-gray-950 text-white pt-28 pb-24 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">

                    {/* Back */}
                    <Link
                        href="/blogs"
                        className="inline-block text-sm text-gray-500 hover:text-white transition-colors mb-10"
                    >
                        ← Writing
                    </Link>

                    {/* Tags */}
                    <p className="text-xs font-mono text-gray-600 mb-4 uppercase tracking-widest">
                        {post.meta.tags.join("  ·  ")}
                    </p>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-5">
                        {post.meta.title}
                    </h1>

                    {/* Meta */}
                    <p className="text-sm font-mono text-gray-500 mb-6">
                        {post.meta.date}&nbsp;&nbsp;·&nbsp;&nbsp;{post.meta.readTime}
                    </p>

                    {/* Series Banner */}
                    {seriesContext && (
                        <SeriesBanner context={seriesContext} currentSlug={slug} />
                    )}

                    {/* Language toggle */}
                    {translations.length > 0 && (
                        <LanguageToggleClient
                            currentLanguage={post.meta.language || "en"}
                            translations={translations.map((t) => ({
                                slug: t.slug,
                                language: t.language,
                            }))}
                        />
                    )}

                    {/* Divider */}
                    <hr className="border-gray-800 mb-10" />

                    {/* Article body */}
                    <article>
                        <MDXContent source={post.content} />
                    </article>

                    {/* Series Navigation Footer */}
                    {seriesContext && (
                        <SeriesNavigationFooter context={seriesContext} />
                    )}

                    {/* Footer */}
                    <hr className="border-gray-800 mt-12 mb-8" />
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blogs"
                            className="text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            ← All Writing
                        </Link>
                        <span className="text-xs font-mono text-gray-700">
                            Aditya Ranjan
                        </span>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <div className="mt-16">
                            <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-4">
                                More in {category === "life" ? "Essays" : "Tech"}
                            </p>
                            <div className="space-y-0">
                                {related.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/blogs/${p.slug}`}
                                        className="group flex items-baseline justify-between py-3 border-b border-gray-800 hover:border-gray-600 transition-colors gap-4"
                                    >
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            {p.title}
                                        </span>
                                        <span className="text-xs font-mono text-gray-700 shrink-0">
                                            {p.readTime}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
