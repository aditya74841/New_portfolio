"use client";

import { useState, useMemo } from "react";
import { Search, X, Layers } from "lucide-react";
import { BlogPostMeta } from "@/lib/blog";
import { getPostCategory } from "@/lib/blogUtils";
import { SeriesGroup } from "@/lib/series";
import BlogCard from "./BlogCard";
import SeriesCard from "./SeriesCard";

type CategoryFilter = "all" | "tech" | "life" | "series";
type LangFilter = "all" | "en" | "hi";

interface BlogListClientProps {
    posts: BlogPostMeta[];
    allTags: string[];
    allSeries?: SeriesGroup[];
}

export default function BlogListClient({ posts, allSeries = [] }: BlogListClientProps) {
    const [category, setCategory] = useState<CategoryFilter>("all");
    const [lang, setLang] = useState<LangFilter>("all");
    const [search, setSearch] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);

    // 1. Group posts by translationKey (or slug) so each article appears exactly once
    const groupedPosts = useMemo(() => {
        const groups = new Map<string, BlogPostMeta[]>();

        posts.forEach((post) => {
            const key = post.translationKey || post.slug;
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key)!.push(post);
        });

        const result: BlogPostMeta[] = [];

        groups.forEach((variants) => {
            const availableLangs = Array.from(
                new Set(variants.map((v) => v.language || "en"))
            );

            let representative: BlogPostMeta | undefined;

            if (lang === "hi") {
                representative = variants.find((v) => v.language === "hi");
            } else if (lang === "en") {
                representative = variants.find((v) => v.language !== "hi");
            } else {
                // 'all': Default to English / primary version
                representative =
                    variants.find((v) => v.language !== "hi") || variants[0];
            }

            if (representative) {
                result.push({
                    ...representative,
                    availableLangs,
                });
            }
        });

        return result;
    }, [posts, lang]);

    // 2. Filter grouped posts by search query and category
    const filtered = useMemo(() => {
        return groupedPosts.filter((post) => {
            const matchSearch =
                !search ||
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(search.toLowerCase());
            
            if (category === "series") {
                return matchSearch && !!post.series;
            }
            const matchCat =
                category === "all" || getPostCategory(post) === category;
            return matchSearch && matchCat;
        });
    }, [groupedPosts, search, category]);

    const filteredSeries = useMemo(() => {
        if (!search) return allSeries;
        return allSeries.filter(
            (s) =>
                s.title.toLowerCase().includes(search.toLowerCase()) ||
                s.posts.some((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        );
    }, [allSeries, search]);

    const clearAll = () => {
        setSearch("");
        setCategory("all");
        setLang("all");
        setSearchOpen(false);
    };

    const tab = (active: boolean) =>
        `text-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
            active ? "text-white font-medium" : "text-gray-500 hover:text-gray-300"
        }`;

    const isFiltering = !!search || category !== "all" || lang !== "all";

    const featuredPost = !isFiltering
        ? filtered.find((p) => p.featured) || null
        : null;
    const gridPosts = featuredPost
        ? filtered.filter((p) => p.slug !== featuredPost.slug)
        : filtered;

    const showSeriesSection = (category === "all" || category === "series") && !search && lang === "all" && allSeries.length > 0;

    return (
        <div>
            {/* Filter row */}
            <div className="flex items-center gap-5 pb-5 border-b border-gray-800 mb-8 flex-wrap">
                <button onClick={() => setCategory("all")} className={tab(category === "all")}>All</button>
                <button onClick={() => setCategory("series")} className={tab(category === "series")}>
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Series
                </button>
                <button onClick={() => setCategory("tech")} className={tab(category === "tech")}>Tech</button>
                <button onClick={() => setCategory("life")} className={tab(category === "life")}>Essays</button>

                <span className="text-gray-800 select-none">·</span>

                <button onClick={() => setLang("all")} className={tab(lang === "all")}>All Lang</button>
                <button onClick={() => setLang("en")} className={tab(lang === "en")}>EN</button>
                <button onClick={() => setLang("hi")} className={tab(lang === "hi")}>HI</button>

                <div className="ml-auto">
                    {searchOpen ? (
                        <div className="flex items-center gap-2">
                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search…"
                                className="bg-transparent border-b border-gray-700 focus:border-gray-400 text-sm text-white placeholder-gray-600 outline-none py-0.5 w-36 transition-colors"
                            />
                            <button onClick={clearAll} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setSearchOpen(true)} className="text-gray-600 hover:text-white transition-colors">
                            <Search className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Featured Series Card (URL Shortener) */}
            {showSeriesSection && (
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                            Featured Engineering Series
                        </span>
                    </div>
                    {filteredSeries.map((series) => (
                        <SeriesCard key={series.id} series={series} defaultExpanded={true} />
                    ))}
                </div>
            )}

            {/* Featured post — full width horizontal card */}
            {category !== "series" && featuredPost && (
                <div className="mb-8">
                    <BlogCard post={featuredPost} featured />
                </div>
            )}

            {/* Grid */}
            {gridPosts.length > 0 ? (
                <div>
                    {category === "all" && showSeriesSection && (
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                            All Articles
                        </h3>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {gridPosts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>
                </div>
            ) : !featuredPost && !showSeriesSection ? (
                <div className="py-16 text-center">
                    <p className="text-gray-600 text-sm">No articles found.</p>
                    <button onClick={clearAll} className="text-gray-500 hover:text-white text-xs mt-3 underline underline-offset-4 transition-colors">
                        Clear filters
                    </button>
                </div>
            ) : null}

            {/* Count */}
            <p className="text-xs font-mono text-gray-700 mt-8">
                {filtered.length} articles
            </p>
        </div>
    );
}

