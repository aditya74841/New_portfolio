import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
    post: BlogPostMeta;
    featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
    const hasImage = !!post.coverImage;

    return (
        <article
            className={`group relative flex flex-col rounded-2xl bg-gray-900 border border-gray-800 p-6 transition-all duration-300 hover:border-gray-700 hover:shadow-xl ${
                featured && hasImage ? "md:grid md:grid-cols-12 md:gap-6" : ""
            }`}
        >
            {featured && hasImage && (
                <div className="relative w-full aspect-[16/10] md:aspect-auto md:min-h-[240px] md:col-span-5 rounded-xl overflow-hidden border border-gray-800 mb-4 md:mb-0">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300"
                    />
                </div>
            )}

            {!featured && hasImage && (
                <div className="relative w-full aspect-[16/9] mb-4 rounded-xl overflow-hidden border border-gray-800">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            <div className={`flex flex-col justify-between h-full ${
                featured ? (hasImage ? "md:col-span-7" : "md:col-span-12") : ""
            }`}>
                <div>
                    {/* Header Badges & Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-mono text-gray-400">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 text-gray-400">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                {post.date}
                            </span>
                            <span className="text-gray-700">•</span>
                            <span className="flex items-center gap-1.5 text-gray-400">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                {post.readTime}
                            </span>
                        </div>

                        {featured && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-800 text-white border border-gray-700">
                                Featured Article
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h2
                        className={`font-bold text-white tracking-tight group-hover:text-gray-200 transition-colors mb-3 ${
                            featured ? "text-2xl md:text-3xl" : "text-xl"
                        }`}
                    >
                        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {post.title}
                        </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                    </p>
                </div>

                {/* Footer: Tags & Read More */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-800 mt-auto">
                    <div className="flex flex-wrap items-center gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700"
                            >
                                <Tag className="w-3 h-3 text-gray-400" />
                                {tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="text-xs text-gray-400 font-mono">
                                +{post.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-gray-300 group-hover:translate-x-1 transition-all">
                        <span>Read</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
