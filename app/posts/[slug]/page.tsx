import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { resolveAttachments, type Attachment } from "@/lib/attachments";
import PostContent from "@/components/PostContent";
import AttachmentDownloads from "@/components/AttachmentDownloads";

export function generateStaticParams() {
  const params = getAllPosts().map((p) => ({ slug: p.slug }));
  // output: 'export' 要求动态路由返回非空参数；文章为空时用占位符（渲染为 404）
  return params.length ? params : [{ slug: "_" }];
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  return {
    title: post?.title ?? "随笔",
    description: post?.excerpt,
  };
}

export default function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // 附件：用户上传的（public/attachments/，缺失自动跳过）+ 自动生成的 Markdown 原稿
  const downloads: Attachment[] = [
    ...resolveAttachments(post.attachments),
    {
      name: "Markdown 原稿",
      url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/downloads/posts/${encodeURIComponent(post.slug)}.md`,
      ext: "MD",
      filename: `${post.slug}.md`,
    },
  ];

  return (
    <article className="max-w-prose mx-auto px-6 py-16">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-vermilion"
      >
        <ArrowLeft size={14} /> 返回文章随笔
      </Link>

      <header className="mt-8 mb-10">
        <h1 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-mute font-mono tabular-nums">
          <time>{formatDate(post.date)}</time>
          <span className="text-mute/50">|</span>
          <span>约 {post.wordCount} 字</span>
        </div>
        <div className="hr-soft mt-6" />
      </header>

      <AttachmentDownloads items={downloads} />

      <div className="prose prose-stone max-w-none">
        <PostContent content={post.content} />
      </div>

      {post.tags.length > 0 && (
        <footer className="mt-12 pt-6 border-t border-rule flex gap-3 text-xs font-mono">
          {post.tags.map((t) => (
            <span key={t} className="text-mute">
              #{t}
            </span>
          ))}
        </footer>
      )}
    </article>
  );
}
