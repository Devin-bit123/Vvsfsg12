import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vvsfsg12的个人网站",
    template: "%s · Vvsfsg12的个人网站",
  },
  description:
    "个人学术翻译与写作分享 —— 藏书、随笔、留言。在文字与文字之间，留存一点人文学的温度。",
  keywords: ["翻译", "学术", "随笔", "藏书", "EPUB 阅读"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-paper text-ink font-sans antialiased min-h-screen flex flex-col">
        <div className="grain" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
