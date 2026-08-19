import fs from "fs";
import path from "path";

export type Book = {
  id: string;
  title: string;
  originalAuthor: string;
  translator?: string;
  year: string;
  intro: string;
  /** .epub 下载路径（位于 /public/books/ 下，或完整外链 URL） */
  downloadUrl: string;
  /** 在线阅读用的 epub 资源路径 */
  epubUrl: string;
  /** 书脊主色（CSS 色值） */
  spineColor: string;
  /** 书脊高光色 */
  spineHighlight: string;
};

/**
 * 书籍元数据：从 content/books/*.json 读取。
 * - 自动方式：仓库 Issues → New issue → 「上架电子书」表单提交，工作流自动生成
 * - 手动方式：在 content/books/ 放一个 JSON 文件（字段同 Book 类型）
 *
 * epub 文件放 public/books/；未放置时阅读器会优雅降级显示提示，
 * 不影响整站可用性。
 */
const booksDir = path.join(process.cwd(), "content", "books");

function loadBooks(): Book[] {
  if (!fs.existsSync(booksDir)) return [];
  return fs
    .readdirSync(booksDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(booksDir, f), "utf-8")) as Book);
}

export const books: Book[] = loadBooks();

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
