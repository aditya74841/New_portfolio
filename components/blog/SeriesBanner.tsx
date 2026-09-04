"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { SeriesContext } from "@/lib/series";

interface SeriesBannerProps {
    context: SeriesContext;
    currentSlug: string;
}

export default function SeriesBanner({ context, currentSlug }: SeriesBannerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { series, currentPart, totalParts } = context;

    return (
        <div className="my-8 rounded-xl border border-indigo-900/60 bg-gradient-to-b from-indigo-950/40 to-gray-900/80 p-4 sm:p-5 shadow-lg">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono font-medium text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/80">
                                Part {currentPart} of {totalParts}
                            </span>
                            <span className="text-xs font-mono text-gray-400">
                                Series
                            </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-white mt-1">
                            {series.title}
                        </h4>
                    </div>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 hover:text-white bg-indigo-900/40 hover:bg-indigo-900/70 px-3 py-1.5 rounded-lg border border-indigo-700/50 transition-colors cursor-pointer ml-auto"
                >
                    <span>{isOpen ? "Hide Episodes" : "All Episodes"}</span>
                    {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Collapsible parts list */}
            {isOpen && (
                <div className="mt-4 pt-4 border-t border-indigo-900/50 space-y-2">
                    <p className="text-xs font-mono text-gray-400 mb-3 uppercase tracking-wider">
                        Series Roadmap:
                    </p>
                    {series.posts.map((p) => {
                        const isCurrent = p.slug === currentSlug;
                        const partNumber = p.series?.order || 0;

                        return (
                            <Link
                                key={p.slug}
                                href={`/blogs/${p.slug}`}
                                className={`flex items-center justify-between p-2.5 rounded-lg border text-sm transition-all ${
                                    isCurrent
                                        ? "bg-indigo-900/40 border-indigo-500/80 text-white font-medium shadow-sm"
                                        : "bg-gray-900/60 border-gray-800/80 text-gray-400 hover:text-white hover:border-gray-700 hover:bg-gray-800/50"
                                }`}
                            >
                                <div className="flex items-center gap-3 min-w-0 pr-2">
                                    {isCurrent ? (
                                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                                    ) : (
                                        <Circle className="w-4 h-4 text-gray-600 shrink-0" />
                                    )}
                                    <span className="truncate text-xs sm:text-sm">
                                        <span className="font-mono text-xs text-gray-500 mr-2">
                                            Part {partNumber}:
                                        </span>
                                        {p.title}
                                    </span>
                                </div>
                                <span className="text-xs font-mono shrink-0 text-gray-500">
                                    {p.readTime}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
