"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HomeIcon, ArrowLeftIcon } from "@/components/WoodcutIllustrations";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-rule">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8 flex items-center justify-between h-14">
        <Link href="/" aria-label="返回主页" className="text-ink hover:text-vermilion transition-colors">
          <HomeIcon width={20} height={20} />
        </Link>

        <button
          className="p-1 text-ink hover:text-vermilion transition-colors"
          onClick={() => router.back()}
          aria-label="返回上一级"
        >
          <ArrowLeftIcon width={22} height={22} />
        </button>
      </div>
    </header>
  );
}
