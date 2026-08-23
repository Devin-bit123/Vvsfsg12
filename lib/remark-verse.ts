import type { Node, Parent, Paragraph, PhrasingContent, Root } from "mdast";
import type { Transformer } from "unified";

/**
 * 诗体排版插件：识别「多行短行」段落并标记 class="verse"。
 *
 * 判定规则：段内行数 ≥ MIN_LINES 且每行可见内容长度 ≤ MAX_LINE
 * （测量时行内连续空格折叠为单个，行号对齐等装饰性空格不计入，
 * 否则带深度对齐缩进的诗行会因 trim 后长度超标而漏判）。
 * - 诗歌/诗体散文（一行一句，中文诗行约 10-20 字、希腊六音步约 50-55 字符）命中
 * - 普通文章（一段一行）、手动折行的长行散文（>60 字符）不命中，排版不变
 * - 标题 / 列表 / 引用 / 代码块 / 表格等其他节点不参与判定
 *
 * 配合 globals.css 的 `.prose p.verse { white-space: pre-wrap }`，
 * 保留源文件的逐行换行、行首缩进与行内空格（如行号对齐），
 * 与 GitHub Issue 预览的诗体观感一致。
 */
const MAX_LINE = 60;
const MIN_LINES = 2;

/** 提取段落的可见行结构：text 按 \n 切分，break 节点视为换行，行内节点拼入当前行 */
function collectLines(
  children: PhrasingContent[],
  lines: string[] = [""]
): string[] {
  const append = (text: string) => {
    const parts = text.split("\n");
    lines[lines.length - 1] += parts[0];
    for (let i = 1; i < parts.length; i++) {
      lines.push("");
      lines[lines.length - 1] += parts[i];
    }
  };

  for (const node of children) {
    if (node.type === "text") {
      append(node.value);
    } else if (node.type === "break") {
      lines.push("");
    } else if (node.type === "inlineCode") {
      append(node.value);
    } else if ("children" in node && Array.isArray(node.children)) {
      collectLines(node.children as PhrasingContent[], lines);
    }
    // footnoteReference / image / html 等无行内文本，忽略
  }
  return lines;
}

/** 行的可见内容长度：trim 后行内连续空格折叠为单个（对齐空格不计入） */
function visibleLength(line: string): number {
  return line.trim().replace(/\s+/g, " ").length;
}

function looksLikeVerse(paragraph: Paragraph): boolean {
  const lines = collectLines(paragraph.children);
  if (lines.length < MIN_LINES) return false;
  return lines.every((line) => visibleLength(line) <= MAX_LINE);
}

export function remarkVerse(): Transformer<Root> {
  return (tree) => {
    const walk = (node: Node): void => {
      if (node.type === "paragraph" && looksLikeVerse(node as Paragraph)) {
        const data = ((node.data ?? {}) as Record<string, unknown>) ?? {};
        const hProperties = (data.hProperties ?? {}) as Record<string, unknown>;
        const prev =
          typeof hProperties.className === "string"
            ? [hProperties.className]
            : Array.isArray(hProperties.className)
              ? (hProperties.className as string[])
              : [];
        data.hProperties = {
          ...hProperties,
          className: [...prev, "verse"],
        };
        node.data = data;
      }
      if ("children" in node && Array.isArray((node as Parent).children)) {
        for (const child of (node as Parent).children as Node[]) {
          walk(child);
        }
      }
    };
    walk(tree);
    return tree;
  };
}
