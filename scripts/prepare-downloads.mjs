#!/usr/bin/env node
/**
 * 构建前钩子（prebuild）：把 content/posts/*.md 复制到 public/downloads/posts/，
 * 供每篇文章页的「Markdown 原稿」直接下载。
 * public/downloads/ 已在 .gitignore 忽略，CI 每次构建重新生成。
 */
import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "content", "posts");
const DEST = path.join(process.cwd(), "public", "downloads", "posts");

fs.mkdirSync(DEST, { recursive: true });

let count = 0;
if (fs.existsSync(SRC)) {
  for (const f of fs.readdirSync(SRC)) {
    if (f.endsWith(".md") || f.endsWith(".mdx")) {
      // .mdx 一律以 .md 之名提供下载，与页面生成的下载链接保持一致
      const dest = f.replace(/\.mdx$/, ".md");
      fs.copyFileSync(path.join(SRC, f), path.join(DEST, dest));
      count += 1;
    }
  }
}
console.log(`prepare-downloads: copied ${count} markdown file(s) to public/downloads/posts/`);
