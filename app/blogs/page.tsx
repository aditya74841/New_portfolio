import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { getAllSeries } from "@/lib/series";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
    title: "Writing",
    description:
        "Articles on web development, Next.js, React, and personal essays by Aditya Ranjan.",
    alternates: {
        types: {
            "application/rss+xml": "https://iamadityaranjan.com/rss.xml",
        },
    },
};

export default function BlogListingPage() {
    const posts = getAllPosts();
    const tags = getAllTags();
    const seriesList = getAllSeries();

    return (
        <main className="min-h-screen bg-gray-950 text-white pt-28 pb-24 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold text-white mb-8">
                    Writing
                </h1>
                <BlogListClient posts={posts} allTags={tags} allSeries={seriesList} />
            </div>
        </main>
    );
}
