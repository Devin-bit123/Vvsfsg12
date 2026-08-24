import Link from "next/link";
import { BookWoodcut, PenWoodcut, EnvelopeWoodcut } from "@/components/WoodcutIllustrations";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 md:px-8 py-20 md:py-28">
      {/* 首屏 —— 左对齐站名 */}
      <section className="fade-in">
        <h1 className="text-2xl md:text-3xl font-display tracking-tight text-ink">
          Vvsfsg12的个人网站
        </h1>
      </section>

      {/* 入口区上方粗黑分隔线 */}
      <div className="border-t-2 border-rule my-12 md:my-16" />

      {/* 三栏入口 —— 报纸版面，墨黑粗线分隔 */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        <Link href="/books" className="group block">
          <div className="space-y-3 py-4 md:pr-8">
            <div>
              <h2 className="block text-2xl font-display tracking-wide text-ink transition-colors group-hover:text-vermilion">阅读</h2>
              <span className="block text-sm font-display text-slate mt-1">BOOKS</span>
            </div>
            <div className="h-32 md:h-40 flex items-center justify-center">
              <BookWoodcut className="w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
        </Link>

        <Link
          href="/posts"
          className="group block md:border-l-2 md:border-rule"
        >
          <div className="space-y-3 py-4 md:px-8">
            <div>
              <h2 className="block text-2xl font-display tracking-wide text-ink transition-colors group-hover:text-vermilion">发布</h2>
              <span className="block text-sm font-display text-slate mt-1">POSTS</span>
            </div>
            <div className="h-32 md:h-40 flex items-center justify-center">
              <PenWoodcut className="w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
        </Link>

        <Link
          href="/guestbook"
          className="group block md:border-l-2 md:border-rule"
        >
          <div className="space-y-3 py-4 md:pl-8">
            <div>
              <h2 className="block text-2xl font-display tracking-wide text-ink transition-colors group-hover:text-vermilion">留言</h2>
              <span className="block text-sm font-display text-slate mt-1">COMMENTS</span>
            </div>
            <div className="h-32 md:h-40 flex items-center justify-center">
              <EnvelopeWoodcut className="w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
