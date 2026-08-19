/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // GitHub Pages 项目站点部署在 /Vvsfsg12/ 子路径（与仓库名一致）
  basePath: "/Vvsfsg12",
  images: { unoptimized: true },
};

export default nextConfig;
