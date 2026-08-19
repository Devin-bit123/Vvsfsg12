"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import { remarkVerse } from "@/lib/remark-verse";

export default function PostContent({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkFootnotes, remarkVerse]}>
      {content}
    </ReactMarkdown>
  );
}
