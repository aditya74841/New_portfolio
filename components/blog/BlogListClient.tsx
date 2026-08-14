"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Tag, Sparkles } from "lucide-react";
import { BlogPostMeta } from "@/lib/blog";
import BlogCard from "./BlogCard";

interface BlogListClientProps {
    posts: BlogPostMeta[];
    allTags: string[];
}

export default function BlogListClient({ posts, allTags }: BlogListClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Featured post (highest priority or first featured post)
    const featuredPost = useMemo(() => {
        return posts.find((p) => p.featured) || posts[0];
    }, [posts]);

    // Filter posts based on search query and selected tag
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                searchQuery.trim() === "" ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [posts, searchQuery, selectedTag]);

    return (
        <div className="space-y-10">
            {/* Featured Post Banner (only when no search/filter active) */}
            {featuredPost && searchQuery === "" && selectedTag === null && (
                <section className="mb-12">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-300 mb-3 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>Featured Article</span>
                    </div>
                    <BlogCard post={featuredPost} featured={true} />
                </section>
            )}

            {/* Controls Header: Search Bar & Tag Filters */}
            <div className="space-y-6 bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles by title, topic, or technology..."
                        className="w-full pl-10 pr-10 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Tag Filter Pills */}
                {allTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-gray-400 mr-2 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-gray-400" /> Filter:
                        </span>
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTag === null
                                    ? "bg-white text-gray-950 font-bold"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            All ({posts.length})
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTag === tag
                                        ? "bg-white text-gray-950 font-bold"
                                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between text-sm text-gray-400">
                <span>
                    Showing <strong className="text-white">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
                </span>
                {(searchQuery || selectedTag) && (
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedTag(null);
                        }}
                        className="text-xs font-mono text-gray-400 hover:text-white underline"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-4 rounded-2xl border border-gray-800 bg-gray-900">
                    <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
                    <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
                        No posts matched your search criteria. Try clearing filters or searching for another keyword.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedTag(null);
                        }}
                        className="px-4 py-2 bg-white text-gray-950 hover:bg-gray-200 text-xs font-bold rounded-xl transition-colors"
                    >
                        Reset Search
                    </button>
                </div>
            )}
        </div>
    );
}
