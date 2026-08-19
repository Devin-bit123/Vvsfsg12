import type { Metadata } from "next";
import GiscusComments from "@/components/GiscusComments";

export const metadata: Metadata = {
  title: "留言",
  description: "交流、校对、闲谈皆可留痕。",
};

export default function GuestbookPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 md:px-8 py-16 md:py-20">
      <header className="mb-10">
        <h1 className="font-display text-ink leading-none text-3xl">
          <span className="text-4xl">03.</span>
          <span> — 留言</span>
        </h1>
      </header>

      <GiscusComments />
    </div>
  );
}
