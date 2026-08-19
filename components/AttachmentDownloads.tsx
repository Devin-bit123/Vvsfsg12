import { Download } from "lucide-react";
import type { Attachment } from "@/lib/attachments";

/**
 * 附件下载区（服务端组件，无客户端 JS）。
 * - variant="panel"：文章页，标题下方、正文之前的完整面板
 * - variant="strip"：电子书阅读页顶栏下方的紧凑条
 */
export default function AttachmentDownloads({
  items,
  variant = "panel",
}: {
  items: Attachment[];
  variant?: "panel" | "strip";
}) {
  if (items.length === 0) return null;

  if (variant === "strip") {
    return (
      <div className="shrink-0 border-b border-rule bg-paper-warm/60">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-[10px] tracking-widest text-mute shrink-0">
            附件下载
          </span>
          {items.map((a) => (
            <a
              key={a.url}
              href={a.url}
              {...downloadProps(a)}
              className="inline-flex items-center gap-1.5 group"
            >
              <span className="font-mono text-[10px] border border-rule px-1.5 py-0.5 text-ink">
                {a.ext}
              </span>
              <span className="font-display text-sm text-ink group-hover:text-vermilion transition-colors">
                {a.name}
              </span>
              {a.size && (
                <span className="font-mono text-[10px] text-mute tabular-nums">
                  {a.size}
                </span>
              )}
              <Download
                size={12}
                className="text-mute group-hover:text-vermilion transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section aria-label="附件下载" className="mb-10 border border-rule">
      <div className="flex items-center justify-between px-4 md:px-5 py-2.5 border-b border-rule bg-paper-warm">
        <span className="font-mono text-[10px] tracking-widest text-mute">
          ATTACHMENTS · 附件下载
        </span>
        <span className="font-mono text-[10px] text-mute tabular-nums">
          {items.length} 个文件
        </span>
      </div>
      <ul>
        {items.map((a) => (
          <li key={a.url} className="border-b border-rule/10 last:border-b-0">
            <a
              href={a.url}
              {...downloadProps(a)}
              className="flex items-center gap-3 px-4 md:px-5 py-3 hover:bg-paper-warm transition-colors group"
            >
              <span className="shrink-0 font-mono text-[10px] border border-rule px-1.5 py-0.5 text-ink">
                {a.ext}
              </span>
              <span className="flex-1 min-w-0 truncate font-display text-sm text-ink group-hover:text-vermilion transition-colors">
                {a.name}
              </span>
              {a.size && (
                <span className="shrink-0 font-mono text-[10px] text-mute tabular-nums">
                  {a.size}
                </span>
              )}
              <Download
                size={14}
                className="shrink-0 text-mute group-hover:text-vermilion transition-colors"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 站内文件强制下载并可指定保存名；外链新开标签页 */
function downloadProps(a: Attachment) {
  if (/^https?:\/\//i.test(a.url)) {
    return { target: "_blank", rel: "noopener noreferrer" } as const;
  }
  return { download: a.filename ?? true } as const;
}
