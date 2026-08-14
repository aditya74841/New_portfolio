import React from "react";
import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog | Aditya Ranjan",
    description:
        "Articles on web architecture, Next.js, React, software design patterns, and engineering insights by Aditya Ranjan.",
    openGraph: {
        title: "Blog & Technical Writings | Aditya Ranjan",
        description:
            "Articles on web architecture, Next.js, React, software design patterns, and engineering insights.",
        type: "website",
    },
};

export default function BlogListingPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
        <main className="min-h-screen bg-gray-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Hero Header */}
                <div className="mb-14 text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-gray-300 text-xs font-mono mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                        <span>Engineering Insights & Writing</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        Thoughts, Tutorials & <br />
                        Software Architecture
                    </h1>

                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                        Deep dives into full-stack development, Next.js, performance optimization, and building scalable web applications.
                    </p>
                </div>

                {/* Interactive Blog List Component */}
                <BlogListClient posts={posts} allTags={tags} />
            </div>
        </main>
    );
}
