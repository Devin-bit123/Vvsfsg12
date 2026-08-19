"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-paper text-ink px-6 text-center">
      <h1 className="font-display text-4xl text-ink">Error</h1>
      <p className="font-mono text-xs text-mute">An error occurred</p>
      <div className="flex gap-4">
        <button onClick={reset} className="font-mono text-xs text-vermilion">
          重试
        </button>
        <Link href="/" className="font-mono text-xs text-vermilion">
          返回首页
        </Link>
      </div>
    </div>
  );
}
