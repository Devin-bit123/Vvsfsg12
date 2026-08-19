/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // GitHub Pages 项目站点部署在 /traewebsite/ 子路径
  basePath: "/traewebsite",
  images: { unoptimized: true },
};

export default nextConfig;
