import Link from "next/link";
import { Download, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "阅读",
  description: "电子书与 EPUB 在线阅读。",
};

export default function BooksPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 md:px-8 py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <h1 className="font-display text-ink leading-none text-3xl">
          <span className="text-4xl">01.</span>
          <span> — 阅读</span>
        </h1>
      </header>

      <div className="flex flex-col border-t border-rule">
        {books.length === 0 ? (
          <div className="py-20 text-center font-display text-sm text-mute">暂无内容，敬请期待</div>
        ) : (
          books.map((book) => (
            <article
              key={book.id}
              className="p-6 md:p-8 flex gap-6 md:gap-8 items-stretch border-b border-rule hover:bg-paper-warm transition-colors"
            >
              {/* 书脊 */}
              <div className="shrink-0 w-10 md:w-14" style={{ backgroundColor: book.spineColor }} />

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl md:text-2xl text-ink">
                  {book.title}
                </h2>
                <p className="font-sans text-sm text-ink/80 mt-3 leading-relaxed">
                  {book.intro}
                </p>

                <div className="flex flex-wrap gap-4 mt-5">
                  <a
                    href={book.downloadUrl}
                    download
                    className="inline-flex items-center gap-1.5 font-display text-sm text-slate hover:text-vermilion transition-colors"
                  >
                    <Download size={14} /> 下载 EPUB
                  </a>
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-flex items-center gap-1.5 font-display text-sm text-vermilion hover:text-ink transition-colors"
                  >
                    <BookOpen size={14} /> 在线阅读
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
