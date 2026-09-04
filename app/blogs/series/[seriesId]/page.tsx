import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSeries, getSeriesById } from "@/lib/series";
import { Layers, CheckCircle2, ArrowRight } from "lucide-react";

interface SeriesPageProps {
    params: Promise<{ seriesId: string }>;
}

export async function generateStaticParams() {
    return getAllSeries().map((series) => ({ seriesId: series.id }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
    const { seriesId } = await params;
    const series = getSeriesById(seriesId);
    if (!series) return { title: "Series Not Found" };

    return {
        title: `${series.title} — Blog Series`,
        description: `Explore all ${series.totalParts} parts of the "${series.title}" series by Aditya Ranjan.`,
    };
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
    const { seriesId } = await params;
    const series = getSeriesById(seriesId);

    if (!series) notFound();

    return (
        <main className="min-h-screen bg-gray-950 text-white pt-28 pb-24 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/blogs"
                    className="inline-block text-sm text-gray-500 hover:text-white transition-colors mb-8"
                >
                    ← Back to Writing
                </Link>

                {/* Series Header Card */}
                <div className="p-6 sm:p-8 rounded-2xl border border-indigo-900/80 bg-gradient-to-b from-indigo-950/60 to-gray-900 mb-10 shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-3">
                        <Layers className="w-4 h-4" />
                        <span>Curated Series</span>
                        <span>·</span>
                        <span>{series.totalParts} Episodes</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        {series.title}
                    </h1>

                    <p className="text-sm font-mono text-gray-400">
                        Last updated: {series.lastUpdated}
                    </p>
                </div>

                {/* Timeline Roadmap */}
                <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
                    Series Syllabus & Roadmap
                </h2>

                <div className="space-y-4">
                    {series.posts.map((post, idx) => (
                        <Link
                            key={post.slug}
                            href={`/blogs/${post.slug}`}
                            className="group flex items-start gap-4 p-5 rounded-xl border border-gray-800 hover:border-indigo-500/80 bg-gray-900/60 hover:bg-gray-900 transition-all"
                        >
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/80 text-indigo-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                                {idx + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4 mb-1">
                                    <h3 className="text-base font-semibold text-gray-100 group-hover:text-white transition-colors">
                                        {post.title}
                                    </h3>
                                    <span className="text-xs font-mono text-gray-500 shrink-0">
                                        {post.readTime}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>

                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 self-center" />
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
