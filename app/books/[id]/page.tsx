import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { books, getBookById } from "@/data/books";
import EPUBReader from "@/components/EPUBReader";

export function generateStaticParams() {
  const params = books.map((b) => ({ id: b.id }));
  // output: 'export' 要求动态路由返回非空参数；书目为空时用占位符（渲染为 404）
  return params.length ? params : [{ id: "_" }];
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const book = getBookById(params.id);
  return {
    title: book ? `《${book.title}》· 在线阅读` : "在线阅读",
  };
}

export default function BookReaderPage({
  params,
}: {
  params: { id: string };
}) {
  const book = getBookById(params.id);
  if (!book) notFound();

  return (
    <div className="fixed inset-0 z-50 bg-paper flex flex-col">
      {/* 顶部条 */}
      <div className="shrink-0 border-b border-rule bg-paper">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8 py-8 flex items-center justify-between">
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-vermilion"
          >
            <ArrowLeft size={14} /> 返回阅读
          </Link>
          <span className="font-mono text-xs text-mute tabular-nums">
            {book.title}
          </span>
        </div>
      </div>

      {/* 阅读器 */}
      <div className="flex-1 min-h-0">
        <EPUBReader
          bookId={book.id}
          epubUrl={book.epubUrl}
          title={book.title}
        />
      </div>
    </div>
  );
}
