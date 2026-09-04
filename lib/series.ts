import { getAllPosts, BlogPostMeta } from "@/lib/blog";

export interface SeriesGroup {
    id: string;
    title: string;
    totalParts: number;
    posts: BlogPostMeta[];
    lastUpdated: string;
}

export interface SeriesContext {
    series: SeriesGroup;
    currentPart: number;
    totalParts: number;
    previousPost: BlogPostMeta | null;
    nextPost: BlogPostMeta | null;
}

/**
 * Get all blog series grouped by series ID
 */
export function getAllSeries(): SeriesGroup[] {
    const posts = getAllPosts();
    const map = new Map<string, { title: string; posts: BlogPostMeta[] }>();

    posts.forEach((post) => {
        if (post.series) {
            const { id, title } = post.series;
            if (!map.has(id)) {
                map.set(id, { title, posts: [] });
            }
            map.get(id)!.posts.push(post);
        }
    });

    const seriesList: SeriesGroup[] = [];

    map.forEach((data, id) => {
        // Sort posts inside the series by series.order ascending (1, 2, 3...)
        const sortedPosts = [...data.posts].sort(
            (a, b) => (a.series?.order || 0) - (b.series?.order || 0)
        );

        const lastUpdated = sortedPosts.reduce((latest, p) => {
            return new Date(p.date) > new Date(latest) ? p.date : latest;
        }, sortedPosts[0]?.date || new Date().toISOString());

        seriesList.push({
            id,
            title: data.title,
            totalParts: sortedPosts.length,
            posts: sortedPosts,
            lastUpdated,
        });
    });

    return seriesList;
}

/**
 * Get a single series by its ID
 */
export function getSeriesById(seriesId: string): SeriesGroup | null {
    const allSeries = getAllSeries();
    return allSeries.find((s) => s.id === seriesId) || null;
}

/**
 * Get series context (prev/next post, position, all parts) for a given post
 */
export function getSeriesContextForPost(postMeta: BlogPostMeta): SeriesContext | null {
    if (!postMeta.series) return null;

    const series = getSeriesById(postMeta.series.id);
    if (!series || series.posts.length === 0) return null;

    const currentIndex = series.posts.findIndex((p) => p.slug === postMeta.slug);
    if (currentIndex === -1) return null;

    const previousPost = currentIndex > 0 ? series.posts[currentIndex - 1] : null;
    const nextPost = currentIndex < series.posts.length - 1 ? series.posts[currentIndex + 1] : null;

    return {
        series,
        currentPart: postMeta.series.order,
        totalParts: series.totalParts,
        previousPost,
        nextPost,
    };
}
