---
title: "网站使用指南：发布文章与上架电子书"
date: "2026-08-19"
excerpt: "在 GitHub 网页上填一个表单提交，机器人自动发布到网站，约两分钟上线。"
tags: ["指南"]
---

这个网站的所有内容都通过 GitHub 仓库管理。核心入口只有一个：**仓库 → Issues → New issue → 选择模板 → 填表提交**，剩下的交给机器人自动完成。

## 发布文章

1. 打开仓库的 Issues 页面，点击绿色按钮 New issue
2. 选择模板「发布文章」
3. 按提示填写：Issue 标题就是文章标题；摘要和标签可以留空；正文用 Markdown 书写，直接粘贴或拖入图片会自动上传显示
4. 点击 Submit new issue 提交
5. 约 1-2 分钟后，机器人会在这条 issue 里回复文章的访问链接，并自动关闭 issue

## 修改文章

找到对应的那条 issue（已关闭的也可以），点击编辑，改完保存就会自动重新发布。

注意：要编辑 issue 本身。在 issue 下面添加评论是不会触发更新的。

## 上架电子书

1. 先上传 epub 文件：打开仓库的 public/books/ 目录 → 右上角 Add file → Upload files → 拖入 .epub 文件 → Commit changes
2. 回到 Issues → New issue → 选择模板「上架电子书」
3. 填写书名（issue 标题）、作者、年份、简介、EPUB 文件名
4. 提交后自动上架到网站的「阅读」栏目，支持下载和在线阅读

## 删除内容（少见操作）

在仓库网页里直接删除对应文件，删除提交后网站会自动重新部署：

- 文章：content/posts/issue-编号.md
- 书籍：content/books/issue-编号.json
