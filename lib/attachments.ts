import fs from "fs";
import path from "path";

/**
 * 附件解析（构建期运行，仅服务端）。
 *
 * 附件条目存于文章 frontmatter / 书籍 JSON 的 attachments 字段，三种写法：
 *   1. "文件名.pdf"               → public/attachments/ 下的本地文件
 *   2. "显示名|文件名.pdf"         → 自定义展示名的本地文件
 *   3. "https://…" 或 "名|https://…" → 外链直链
 *
 * 格式无关：任意扩展名均可，徽标显示大写扩展名（EPUB/MD/PDF/TXT/…），
 * 未来新增格式无需改代码。本地文件缺失时跳过并告警
 * （后补上传文件会触发重新部署，下载项随之自动出现）。
 */

export type Attachment = {
  /** 展示名 */
  name: string;
  /** 下载地址（含 basePath 的站内路径，或完整外链） */
  url: string;
  /** 大写扩展名徽标（EPUB / MD / PDF / TXT / …） */
  ext: string;
  /** 文件大小（如 "1.2 MB"），仅本地文件有 */
  size?: string;
  /** <a download> 指定的保存文件名（可选，仅站内文件生效） */
  filename?: string;
};

/** 由 next.config.mjs 的 env 注入，与 basePath 保持一致 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ATTACHMENTS_DIR = path.join(process.cwd(), "public", "attachments");

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function extOf(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name);
  return m ? m[1].toUpperCase() : "FILE";
}

/** "显示名|目标" → 两段；无 | 时展示名留空（后续回退为文件名） */
function splitEntry(entry: string): { display: string; target: string } {
  const idx = entry.indexOf("|");
  if (idx === -1) return { display: "", target: entry.trim() };
  return {
    display: entry.slice(0, idx).trim(),
    target: entry.slice(idx + 1).trim(),
  };
}

function basenameOf(url: string): string {
  try {
    const clean = url.split(/[?#]/)[0];
    return decodeURIComponent(clean.split("/").filter(Boolean).pop() || url);
  } catch {
    return url;
  }
}

/** 解析 frontmatter / JSON 里的原始附件条目列表 */
export function resolveAttachments(entries?: string[]): Attachment[] {
  if (!entries || entries.length === 0) return [];

  const out: Attachment[] = [];
  for (const raw of entries) {
    const entry = String(raw || "").trim();
    if (!entry) continue;

    const { display, target } = splitEntry(entry);
    if (!target) continue;

    // 外链：原样直链
    if (/^https?:\/\//i.test(target)) {
      const base = basenameOf(target);
      out.push({
        name: display || base || target,
        url: target,
        ext: extOf(base),
      });
      continue;
    }

    // 本地文件：public/attachments/<target>（容错 "attachments/" 前缀与子目录）
    const fileName = target.replace(/^attachments\//i, "").replace(/^\/+/, "");
    const abs = path.join(ATTACHMENTS_DIR, fileName);
    if (!fs.existsSync(abs)) {
      console.warn(`[attachments] 文件不存在，已跳过：${fileName}`);
      continue;
    }
    out.push({
      name: display || fileName,
      url: `${BASE_PATH}/attachments/${encodeURIComponent(fileName).replace(/%2F/gi, "/")}`,
      ext: extOf(fileName),
      size: formatSize(fs.statSync(abs).size),
    });
  }
  return out;
}

/**
 * 解析书籍 JSON 中已带 basePath 的 downloadUrl（如 /Vvsfsg12/books/x.epub）
 * 或完整外链。文件不存在时返回 null（阅读器仍可优雅降级）。
 */
export function attachmentFromUrl(url: string, name?: string): Attachment | null {
  if (!url) return null;

  if (/^https?:\/\//i.test(url)) {
    const base = basenameOf(url);
    return { name: name || base || url, url, ext: extOf(base) };
  }

  // 站内路径：去掉 basePath 前缀，相对 public/ 定位（需还原 URL 编码）
  let rel = BASE_PATH && url.startsWith(BASE_PATH)
    ? url.slice(BASE_PATH.length)
    : url.replace(/^\/+/, "");
  try {
    rel = decodeURIComponent(rel);
  } catch {
    /* 保持原样 */
  }
  const abs = path.join(process.cwd(), "public", rel);
  if (!fs.existsSync(abs)) {
    console.warn(`[attachments] 文件不存在，已跳过：${rel}`);
    return null;
  }
  return {
    name: name || basenameOf(url) || rel,
    url,
    ext: extOf(rel),
    size: formatSize(fs.statSync(abs).size),
  };
}
