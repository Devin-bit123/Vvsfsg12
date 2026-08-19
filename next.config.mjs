/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // GitHub Pages 项目站点部署在 /Vvsfsg12/ 子路径（与仓库名一致）
  basePath: "/Vvsfsg12",
  // 供服务端构建代码（lib/attachments.ts、文章页 Markdown 原稿链接）拼接站内绝对路径，
  // 仓库改名时与上面的 basePath 一起同步修改
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Vvsfsg12",
  },
  images: { unoptimized: true },
};

export default nextConfig;
