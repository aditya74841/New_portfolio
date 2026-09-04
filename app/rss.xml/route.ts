import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://iamadityaranjan.com";

export async function GET() {
    const posts = getAllPosts().filter((p) => p.language !== "hi");

    const items = posts
        .map(
            (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blogs/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`
        )
        .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Aditya Ranjan — Blog</title>
    <link>${BASE_URL}/blogs</link>
    <description>Articles on web development, Next.js, React, and personal essays by Aditya Ranjan.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Aditya Ranjan</copyright>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>Aditya Ranjan — Blog</title>
      <link>${BASE_URL}/blogs</link>
    </image>
    ${items}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}
