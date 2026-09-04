import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
    post: BlogPostMeta;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    const hasImage = !!post.coverImage;
    const hasMultipleLangs =
        post.availableLangs && post.availableLangs.length > 1;

    // Featured: wide horizontal card — image left, content right
    if (featured && hasImage) {
        return (
            <Link
                href={`/blogs/${post.slug}`}
                className="group flex flex-col sm:flex-row rounded-xl border border-gray-800 hover:border-gray-600 bg-gray-900 overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
            >
                <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-gray-800 shrink-0">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 flex-1">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                            Featured
                        </p>
                        {hasMultipleLangs && (
                            <span className="text-[10px] font-mono text-gray-400 bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
                                EN · HI
                            </span>
                        )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100 group-hover:text-white transition-colors leading-snug mb-3">
                        {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                        {post.excerpt}
                    </p>
                    <p className="text-xs font-mono text-gray-600">
                        {post.date}&nbsp;&nbsp;·&nbsp;&nbsp;{post.readTime}
                    </p>
                </div>
            </Link>
        );
    }

    // Regular card
    return (
        <Link
            href={`/blogs/${post.slug}`}
            className="group flex flex-col rounded-xl border border-gray-800 hover:border-gray-600 bg-gray-900 overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
        >
            {/* Cover image */}
            {hasImage && (
                <div className="w-full aspect-[16/9] overflow-hidden bg-gray-800">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                {post.series && (
                    <div className="mb-2">
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/80">
                            Series: Part {post.series.order}
                        </span>
                    </div>
                )}

                <h2 className="text-[15px] font-semibold text-gray-100 group-hover:text-white transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs font-mono text-gray-600">
                    <span>
                        {post.date}&nbsp;&nbsp;·&nbsp;&nbsp;{post.readTime}
                    </span>
                    {hasMultipleLangs && (
                        <span className="text-[10px] text-gray-400 bg-gray-800/80 px-1.5 py-0.5 rounded border border-gray-700/60">
                            EN · HI
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export { BlogCard };
