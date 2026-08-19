"use client";

import { Github } from "lucide-react";
import Giscus from "@giscus/react";

/**
 * === Giscus 配置 ===
 * 1. 仓库需公开，启用 Discussions
 * 2. 安装 giscus app：https://github.com/apps/giscus
 * 3. 在 https://giscus.app 生成 repo / repoId / category / categoryId
 * 4. 替换下方四个字段
 */
const GISCUS_CONFIG = {
  repo: "Devin-bit123/Vvsfsg12" as `${string}/${string}` | "",
  repoId: "R_kgDOT9CLmA",
  category: "Announcements",
  categoryId: "DIC_kwDOT9CLmM4DDtGs",
};

const isConfigured = Boolean(
  GISCUS_CONFIG.repo &&
    GISCUS_CONFIG.repoId &&
    GISCUS_CONFIG.category &&
    GISCUS_CONFIG.categoryId
);

export default function GiscusComments() {
  if (!isConfigured) {
    return (
      <div className="mt-10 border border-rule p-8 bg-paper-warm">
        <p className="font-display text-lg text-ink mb-2">Giscus not configured</p>
        <p className="font-display text-sm text-slate leading-relaxed mb-5">
          Configure repo / repoId / category / categoryId in{" "}
          <code className="text-ink">components/GiscusComments.tsx</code>
        </p>
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-display text-sm text-vermilion"
        >
          <Github size={13} /> giscus.app →
        </a>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Giscus
        repo={GISCUS_CONFIG.repo as `${string}/${string}`}
        repoId={GISCUS_CONFIG.repoId}
        category={GISCUS_CONFIG.category}
        categoryId={GISCUS_CONFIG.categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
