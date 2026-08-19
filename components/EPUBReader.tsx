"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import ReaderLoading from "./ReaderLoading";

// epubjs / react-reader 依赖浏览器 API，必须关闭 SSR
const ReactReader = dynamic(
  () => import("react-reader").then((m) => m.ReactReader),
  {
    ssr: false,
    loading: () => <ReaderLoading />,
  }
);

type Rendition = any;

export default function EPUBReader({
  bookId,
  epubUrl,
  title,
}: {
  bookId: string;
  epubUrl: string;
  title: string;
}) {
  const [location, setLocation] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(100);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const renditionRef = useRef<Rendition>(null);

  // 读取 localStorage 持久化状态
  useEffect(() => {
    const savedLoc = localStorage.getItem(`epub-loc-${bookId}`);
    if (savedLoc) setLocation(savedLoc);
    const savedSize = localStorage.getItem(`epub-fontsize-${bookId}`);
    if (savedSize) setFontSize(parseInt(savedSize));
  }, [bookId]);

  // 加载超时检测：10 秒未 ready 视为文件缺失
  useEffect(() => {
    const t = setTimeout(() => {
      if (!ready) setFailed(true);
    }, 10000);
    return () => clearTimeout(t);
  }, [ready]);

  const updateProgress = (rend: Rendition, loc: string) => {
    try {
      if (rend?.book?.locations?.length() > 0 && loc) {
        const pct = rend.book.locations.percentageFromCfi(loc);
        setProgress(Math.round(pct * 100));
      }
    } catch {
      /* ignore */
    }
  };

  const handleLocationChanged = (loc: string) => {
    setLocation(loc);
    setReady(true);
    setFailed(false);
    localStorage.setItem(`epub-loc-${bookId}`, loc);
    updateProgress(renditionRef.current, loc);
  };

  const handleGetRendition = (rend: Rendition) => {
    renditionRef.current = rend;
    rend.themes.fontSize(`${fontSize}%`);
    rend.book?.ready
      ?.then(() => rend.book.locations.generate(1024))
      .then(() => {
        if (location) updateProgress(rend, location);
      })
      .catch(() => {
        /* ignore */
      });
  };

  const changeFontSize = (delta: number) => {
    const next = Math.min(160, Math.max(70, fontSize + delta));
    setFontSize(next);
    localStorage.setItem(`epub-fontsize-${bookId}`, String(next));
    renditionRef.current?.themes?.fontSize(`${next}%`);
  };

  const prev = () => renditionRef.current?.prev();
  const next = () => renditionRef.current?.next();

  if (failed) {
    return (
      <div className="h-screen">
        <ReaderLoading failed title={title} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 relative bg-paper">
        <ReactReader
          url={epubUrl}
          location={location ?? null}
          locationChanged={handleLocationChanged as any}
          getRendition={handleGetRendition}
          title={title}
          showToc={true}
        />
      </div>

      {/* 底部控制条 */}
      <div className="shrink-0 border-t border-rule bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={prev}
            aria-label="上一页"
            className="p-2 text-mute hover:text-vermilion transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => changeFontSize(-10)}
              aria-label="缩小字号"
              className="p-1.5 text-mute hover:text-vermilion transition-colors"
            >
              <ZoomOut size={15} />
            </button>
            <span className="font-mono text-xs text-ink w-10 text-center tabular-nums">
              {fontSize}%
            </span>
            <button
              onClick={() => changeFontSize(10)}
              aria-label="放大字号"
              className="p-1.5 text-mute hover:text-vermilion transition-colors"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          <div className="flex-1 max-w-[180px] flex flex-col items-center gap-1">
            <div className="w-full h-[2px] bg-mute/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-vermilion transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-ink tabular-nums">
              {progress}%
            </span>
          </div>

          <button
            onClick={next}
            aria-label="下一页"
            className="p-2 text-mute hover:text-vermilion transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
