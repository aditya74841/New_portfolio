"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, ChevronDown, ChevronUp, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { SeriesGroup } from "@/lib/series";

interface SeriesCardProps {
    series: SeriesGroup;
    defaultExpanded?: boolean;
}

export default function SeriesCard({ series, defaultExpanded = true }: SeriesCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="relative overflow-hidden rounded-2xl border border-indigo-900/70 bg-gradient-to-b from-indigo-950/50 via-gray-900/90 to-gray-950 p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-indigo-700/60 mb-8">
            {/* Background Accent Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-medium">
                        <Layers className="w-3.5 h-3.5" />
                        Curated Engineering Series
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 text-xs font-mono">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        {series.totalParts} Episodes
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/blogs/series/${series.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300 hover:text-white transition-colors underline underline-offset-4"
                    >
                        <span>Full Series Roadmap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-900/40 hover:bg-indigo-900/70 text-indigo-300 hover:text-white border border-indigo-700/50 text-xs font-mono transition-colors cursor-pointer"
                    >
                        <span>{isExpanded ? "Hide Episodes" : "All Episodes"}</span>
                        {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Series Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                {series.title}
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed max-w-3xl mb-5">
                A 6-part production engineering case study tracing the architecture evolution of a high-performance URL shortener — covering atomic operations, database indexing, Redis caching, worker crash resiliency, and logging overhead profiling.
            </p>

            {/* Expandable Episodes List */}
            {isExpanded && (
                <div className="pt-4 border-t border-indigo-900/50 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
                        <span>Episode Syllabus:</span>
                        <span>{series.posts.length} of {series.totalParts} Parts</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
                        {series.posts.map((post) => {
                            const partNum = post.series?.order || 1;
                            return (
                                <Link
                                    key={post.slug}
                                    href={`/blogs/${post.slug}`}
                                    className="group flex items-center justify-between p-3 rounded-xl border border-gray-800/90 bg-gray-900/70 hover:bg-gray-850 hover:border-indigo-500/60 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3 min-w-0 pr-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-950 border border-indigo-800/80 text-indigo-400 text-xs font-mono font-bold shrink-0">
                                            {partNum}
                                        </span>
                                        <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                                            {post.title}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-gray-500 group-hover:text-indigo-400 transition-colors">
                                        <span className="hidden sm:inline">{post.readTime}</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
