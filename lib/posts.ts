import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  wordCount: number;
};

export type Post = PostMeta & {
  content: string;
};

/** 统计字数：中文字符（含中文标点）按 1 计，英文按词计 */
function countWords(text: string): number {
  const clean = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/[#>*_~\-\[\]]/g, "");
  const cjk = (
    clean.match(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []
  ).length;
  const en = (clean.match(/[a-zA-Z]+/g) || []).length;
  return cjk + en;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts: PostMeta[] = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      excerpt: (data.excerpt as string) ?? "",
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      wordCount: countWords(content),
    };
  });

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export function getPost(slug: string): Post | null {
  // 防御：dev 模式下 params.slug 可能是 URL 编码的中文，需 decode 后才能匹配文件名
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    /* slug 非合法 URL 编码时保持原样 */
  }
  const candidates = [`${decoded}.md`, `${decoded}.mdx`].map((f) =>
    path.join(postsDir, f)
  );
  const file = candidates.find((f) => fs.existsSync(f));
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    wordCount: countWords(content),
    content,
  };
}

/** 中文格式日期：2024年3月 */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}
