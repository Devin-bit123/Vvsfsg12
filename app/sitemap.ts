import type { MetadataRoute } from "next";
import { books } from "@/data/books";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // TODO: 部署后替换为实际域名
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/books`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/posts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guestbook`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const bookRoutes: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${base}/books/${b.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/posts/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...bookRoutes, ...postRoutes];
}
