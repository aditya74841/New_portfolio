import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import MDXContent from "@/components/blog/MDXContent";

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

/**
 * Generate static params for SSG pre-rendering
 */
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

/**
 * Generate dynamic SEO metadata
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found | Aditya Ranjan",
        };
    }

    return {
        title: `${post.meta.title} | Aditya Ranjan Blog`,
        description: post.meta.excerpt,
        openGraph: {
            title: post.meta.title,
            description: post.meta.excerpt,
            type: "article",
            publishedTime: post.meta.date,
            authors: [post.meta.author?.name || "Aditya Ranjan"],
            tags: post.meta.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.meta.title,
            description: post.meta.excerpt,
        },
    };
}

export default async function BlogPostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post || !post.meta.published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
                {/* Back Link */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-white transition-colors bg-gray-900 border border-gray-800 hover:border-gray-700 px-3.5 py-1.5 rounded-full"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Articles</span>
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-12 pb-8 border-b border-gray-800">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {post.meta.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-gray-900 text-gray-300 border border-gray-800"
                            >
                                <Tag className="w-3 h-3 text-gray-400" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Post Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                        {post.meta.title}
                    </h1>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                        <div className="flex items-center gap-2 text-gray-300">
                            <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="font-sans font-medium text-sm text-gray-200">
                                {post.meta.author?.name || "Aditya Ranjan"}
                            </span>
                        </div>

                        <span className="text-gray-700">•</span>

                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>{post.meta.date}</span>
                        </div>

                        <span className="text-gray-700">•</span>

                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>{post.meta.readTime}</span>
                        </div>
                    </div>
                </header>

                {/* Cover Image Banner */}
                {post.meta.coverImage && (
                    <div className="relative w-full aspect-[21/9] mb-10 rounded-3xl overflow-hidden border border-gray-800 shadow-xl bg-gray-900">
                        <img
                            src={post.meta.coverImage}
                            alt={post.meta.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                {/* Article Body Container */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-10 mb-12 shadow-xl">
                    <MDXContent source={post.content} />
                </div>

                {/* Author Footer Card */}
                <footer className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-mono font-bold text-white text-lg">
                            AR
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-base">Written by Aditya Ranjan</h4>
                            <p className="text-gray-400 text-xs">
                                Full Stack Developer passionate about building fast, accessible, & scalable web applications.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/blog"
                        className="px-4 py-2 bg-white text-gray-950 hover:bg-gray-200 text-xs font-bold rounded-xl transition-all"
                    >
                        Explore More Articles
                    </Link>
                </footer>
            </article>
        </main>
    );
}
