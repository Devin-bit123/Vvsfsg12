#!/usr/bin/env node
/**
 * 从 GitHub Issue 生成本站内容：
 *   - 带 post 标签 → content/posts/issue-<N>.md   （文章）
 *   - 带 book 标签 → content/books/issue-<N>.json （书籍元数据）
 * 由 .github/workflows/publish.yml 调用，Issue 数据经环境变量注入。
 * 幂等设计：同一 Issue 再次触发（编辑 / 重开 / 补标签）总是覆盖同一个文件。
 */

import fs from "node:fs";
import path from "node:path";

// ── 站点配置（仓库改名时，需与 next.config.mjs 的 basePath 同步修改）──
const SITE_URL = "https://devin-bit123.github.io/Vvsfsg12";
const BASE_PATH = "/Vvsfsg12";

// ── Issue 输入 ──
const number = String(process.env.ISSUE_NUMBER || "").trim();
const title = String(process.env.ISSUE_TITLE || "").trim();
const body = String(process.env.ISSUE_BODY || "");
const labels = String(process.env.ISSUE_LABELS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const createdAt = process.env.ISSUE_CREATED_AT || new Date().toISOString();

function die(msg) {
  console.error(`::error::${msg}`);
  process.exit(1);
}

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `${key}=${String(value).replace(/\r?\n/g, " ")}\n`
    );
  }
}

/** 解析 issue 表单正文：### 字段名\n\n值 */
function parseSections(text) {
  const map = {};
  for (const part of text.split(/^###\s+/m).slice(1)) {
    const nl = part.indexOf("\n");
    if (nl === -1) continue;
    const key = part.slice(0, nl).trim();
    let val = part.slice(nl + 1).trim();
    if (/^_no response_$/i.test(val)) val = ""; // GitHub 表单空字段占位
    map[key] = val;
  }
  return map;
}

if (!number) die("缺少 ISSUE_NUMBER");
if (!title) die("Issue 标题不能为空（它是文章标题 / 书名）");

const isPost = labels.includes("post");
const isBook = labels.includes("book");
if (isPost && isBook) die("同一 Issue 不能同时带 post 和 book 标签");

if (isPost) {
  // 正文是表单最后一个字段：取「### 正文」标记之后的全部内容，
  // 这样文章里出现 ### 三级标题也不会被误切
  const marker = "### 正文";
  const idx = body.indexOf(marker);
  const header = parseSections(idx === -1 ? "" : body.slice(0, idx));
  const content = (idx === -1 ? body : body.slice(idx + marker.length)).trim();
  if (!content) die("正文不能为空");

  const date = createdAt.slice(0, 10);
  let excerpt = (header["摘要"] || "").trim();
  if (!excerpt) {
    excerpt = content
      .replace(/```[\s\S]*?```/g, "")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100);
  }
  const tags = (header["标签"] || "")
    .split(/[,，、]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const file = `content/posts/issue-${number}.md`;
  const front = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `date: ${JSON.stringify(date)}`,
    `excerpt: ${JSON.stringify(excerpt)}`,
    `tags: ${JSON.stringify(tags)}`,
    "---",
    "",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, front + content + "\n");
  console.log(`written: ${file}`);
  setOutput("message", `文章《${title}》已发布：${SITE_URL}/posts/issue-${number}`);
} else if (isBook) {
  const sections = parseSections(body);
  const get = (...keys) => {
    for (const k of keys) {
      const v = (sections[k] || "").trim();
      if (v) return v;
    }
    return "";
  };

  const author = get("作者", "原作者", "原著作者");
  const translator = get("译者");
  const year = get("年份") || String(new Date(createdAt).getFullYear());
  const intro = get("简介", "介绍");
  const fileField = get("EPUB 文件名", "文件名");

  if (!author) die("缺少「作者」字段");
  if (!intro) die("缺少「简介」字段");
  if (!fileField) die("缺少「EPUB 文件名」字段");

  // 兼容用户粘贴 "public/books/x.epub" 或完整外链
  const fileName = fileField
    .replace(/^public\/books\//i, "")
    .replace(/^\/+/, "")
    .trim();
  const isExternal = /^https?:\/\//i.test(fileName);
  const downloadUrl = isExternal
    ? fileName
    : `${BASE_PATH}/books/${encodeURIComponent(fileName)}`;

  // epub 缺失提醒（外链无法校验）
  if (!isExternal && !fs.existsSync(path.join("public", "books", fileName))) {
    setOutput(
      "warning",
      `注意：public/books/ 下暂未找到 ${fileName}，请先上传 epub 文件（上传后无需重提表单，下次部署自动生效）。`
    );
  }

  // 书脊配色：用户指定，否则按 Issue 编号从色板轮换
  const palette = [
    "#1A1A1A", "#3D2B1F", "#2F3E46", "#4A5568",
    "#5C4033", "#374151", "#583101", "#3F3F46",
  ];
  const colorInput = get("书脊颜色").trim();
  const spineColor = /^#[0-9a-fA-F]{6}$/.test(colorInput)
    ? colorInput.toLowerCase()
    : palette[Number(number) % palette.length];

  function lighten(hex, ratio = 0.22) {
    const n = parseInt(hex.slice(1), 16);
    const mix = (c) => Math.min(255, Math.round(c + 255 * ratio));
    const r = mix((n >> 16) & 255);
    const g = mix((n >> 8) & 255);
    const b = mix(n & 255);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  const book = {
    id: `issue-${number}`,
    title,
    originalAuthor: author,
    ...(translator ? { translator } : {}),
    year: String(year),
    intro,
    downloadUrl,
    epubUrl: downloadUrl,
    spineColor,
    spineHighlight: lighten(spineColor),
  };

  const file = `content/books/issue-${number}.json`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(book, null, 2) + "\n");
  console.log(`written: ${file}`);
  setOutput("message", `《${title}》已上架阅读栏目：${SITE_URL}/books`);
} else {
  console.log("skipped: no post/book label");
  setOutput("message", "Issue 未带 post / book 标签，已跳过");
}
