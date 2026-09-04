import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { SeriesContext } from "@/lib/series";

interface SeriesNavigationFooterProps {
    context: SeriesContext;
}

export default function SeriesNavigationFooter({ context }: SeriesNavigationFooterProps) {
    const { previousPost, nextPost, series } = context;

    if (!previousPost && !nextPost) return null;

    return (
        <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Series: {series.title}</span>
                </div>
                <Link
                    href={`/blogs/series/${series.id}`}
                    className="text-xs font-mono text-gray-400 hover:text-white transition-colors underline underline-offset-4"
                >
                    View Series Overview →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous Part */}
                {previousPost ? (
                    <Link
                        href={`/blogs/${previousPost.slug}`}
                        className="group flex flex-col p-4 rounded-xl border border-gray-800 hover:border-indigo-500/60 bg-gray-900/60 hover:bg-gray-900 transition-all text-left"
                    >
                        <span className="flex items-center gap-1.5 text-xs font-mono text-gray-500 group-hover:text-indigo-400 transition-colors mb-1">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Previous (Part {previousPost.series?.order})
                        </span>
                        <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                            {previousPost.title}
                        </span>
                    </Link>
                ) : (
                    <div className="hidden sm:block" />
                )}

                {/* Next Part */}
                {nextPost ? (
                    <Link
                        href={`/blogs/${nextPost.slug}`}
                        className="group flex flex-col p-4 rounded-xl border border-gray-800 hover:border-indigo-500/60 bg-gray-900/60 hover:bg-gray-900 transition-all text-right items-end"
                    >
                        <span className="flex items-center gap-1.5 text-xs font-mono text-gray-500 group-hover:text-indigo-400 transition-colors mb-1">
                            Next (Part {nextPost.series?.order})
                            <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                            {nextPost.title}
                        </span>
                    </Link>
                ) : (
                    <div className="hidden sm:block" />
                )}
            </div>
        </div>
    );
}
