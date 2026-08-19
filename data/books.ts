export type Book = {
  id: string;
  title: string;
  originalAuthor: string;
  translator?: string;
  year: string;
  intro: string;
  /** .epub 下载路径（位于 /public/books/ 下） */
  downloadUrl: string;
  /** 在线阅读用的 epub 资源路径 */
  epubUrl: string;
  /** 书脊主色（CSS 色值） */
  spineColor: string;
  /** 书脊高光色 */
  spineHighlight: string;
};

/**
 * 书籍元数据。新增书籍时：
 * 1. 在 /public/books/ 放入对应的 .epub 文件
 * 2. 在下方数组追加一条记录，确保 id 唯一
 *
 * 当前无书籍。epubUrl 指向的文件若未放置，
 * 阅读器会优雅降级显示提示，不影响整站可用性。
 */
export const books: Book[] = [];

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
