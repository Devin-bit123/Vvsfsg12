import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章随笔",
  description: "学术随笔与翻译心得。按时间倒序排列。",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 md:px-8 py-16 md:py-20">
      <header className="mb-12 md:mb-16">
        <h1 className="font-display text-ink leading-none text-3xl">
          <span className="text-4xl">02.</span>
          <span> — 文章随笔</span>
        </h1>
      </header>

      <div className="flex flex-col">
        {posts.length === 0 ? (
          <div className="py-20 text-center font-display text-sm text-mute">暂无内容，敬请期待</div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="py-8 border-b border-rule last:border-b-0 hover:bg-paper-warm transition-colors"
            >
              <Link
                href={`/posts/${post.slug}`}
                className="font-display text-xl md:text-2xl text-ink hover:text-vermilion transition-colors"
              >
                {post.title}
              </Link>
              <p className="font-sans text-sm text-slate leading-relaxed mt-2">
                {post.excerpt}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
