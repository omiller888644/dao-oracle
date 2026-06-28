# 全栈网站平台模块摘要

最后更新：2026-06-28

## 模块目标

把 Dao Oracle 从静态 MVP 和效果图升级为可测试、可运营、可持续优化的全栈网站系统。

第一版系统需要支持：

- 用户输入问题。
- 起卦动画和 6 爻生成。
- 根据抽到的卦象和用户问题生成个性化 AI 解读。
- 保存用户问题、卦象结果、AI 输出和用户反馈。
- 后台查看 64 卦内容、起卦记录、AI 解读、Prompt 版本、SEO/GEO 页面和反馈。
- 部署到方便测试的预览环境。

## 已确认技术方案

采用：

- Next.js App Router
- Tailwind CSS
- Supabase Postgres
- Supabase Auth
- OpenAI API
- Vercel Preview / Production
- GitHub 仓库：`omiller888644/dao-oracle`

## 2026-06-27 搭建进展

已创建第一版全栈应用目录：

- `apps/web`

已完成：

- Next.js App Router 应用骨架。
- Tailwind CSS 基础视觉系统。
- 首页英文落地页。
- 64 卦 JSONL 读取和校验。
- Supabase 初始 migration。
- 64 卦 seed 校验和 dry-run 导入脚本。
- 起卦 cast 逻辑。
- AI 解读上下文构建。
- `/api/readings` 和 `/api/interpretations` API 边界。
- 首批 SEO/GEO 页面路由。
- `/hexagrams` 列表页。
- 64 个 `/hexagrams/[slug]` 静态详情页。
- `robots.txt` 和 `sitemap.xml`。
- 后台 MVP 页面结构。
- Vercel 部署说明和 `vercel.json`。
- 已根据效果图修正用户端视觉偏差：
  - 首页改为居中手机稿结构。
  - 问题页改为效果图中的 question page 结构。
  - 摇卦页改为深空宇宙门 / 呼吸感视觉。
  - 结果页改为卦象卡 + Cosmic Timing + Human Field + 解锁/分享入口。
  - 新增 `/reading/transition`，用于查看问题提交后的过渡动画状态。
  - 新增 `/reading/payment`，用于查看付费详情页。
  - 新增 `/reading/share`，用于查看分享卡页面。
- 已加强过渡页和摇卦页宇宙感：
  - 新增深空星点层、粒子漂移、星云尘埃呼吸。
  - 宇宙门加入多层呼吸环和点击脉冲。
  - `/reading/transition` 增加自动文案过渡和呼吸动画。
  - `/reading/cast` 增加 6 次点击摇卦交互、进度条、卦线逐步生成和完成后 reveal 入口。
- 已按 2026-06-28 反馈继续调整：
  - 首页标题字号下调并增加立体阴影感。
  - 首页只保留 `Begin Your Reading` 一个金色主按钮。
  - `Learn Dao Oracle` 和 `The Origin of the 64 Hexagrams` 改为文字链接。
  - 问题页去掉上方重复大线框，改为开放式排版。
  - 问题页 5 个方向按钮改为可选状态，并分散排列。
  - `/reading/transition` 改为自动过渡，不再需要用户点击按钮。
  - 过渡页不再使用单一光束 / comet，改为 `Your confusion?` 和用户真实问题文字碎片被宇宙中心吸入。
  - `/reading/cast` 改为进入后自动摇卦，不再需要点击。
  - 摇卦页移除中心静态 64 卦符号和黑色圆圈，改为淡光宇宙核心。
  - 自动摇卦节奏从快速动感调整为 1.8 秒一次的呼吸感节奏；每次从宇宙核心缓慢淡入一条卦线，消失后进入下一条，第六次后完整卦象浮现并自动进入结果页。
  - 问题页输入内容会暂存在浏览器本地，用于过渡页生成真实问题文字碎片；无输入时使用预设文字碎片兜底。

本地测试 URL：

- `http://127.0.0.1:3000`

当前限制：

- Supabase 真实项目尚未连接，API 仍使用 mock persistence。
- OpenAI key 尚未配置，AI 解读 API 返回 `source: "mock"` 的开发版输出。
- 后台页面是运营结构 MVP，真实登录、RLS 查询和编辑功能待接 Supabase 后继续。
- 当前前端已更接近效果图，但还需要后续逐屏视觉精修，包括真实随机起卦、动画亮度细调、字体细节和真实结果数据接入。

部署策略：

- 第一阶段：Vercel Preview + Supabase Staging。
- 正式上线：Vercel Production + Supabase Production + 正式域名。
- Cloudflare 暂不作为第一版主部署环境，后期用于全球缓存、Workers 或边缘优化。

## 64 卦数据库文件

第一版数据库种子文件：

- `outputs/hexagram_content/dao_oracle_64_hexagrams_database_ready.jsonl`

已确认：

- 共 64 条。
- 每行一个卦。
- 字段包括 `number`、`title_en`、`title_zh`、`core_en`、`core_zh`、`sections`、`question_lens`。
- `sections` 包括 `cosmic_timing`、`human_field`、`earthly_leverage`、`ancient_root`。
- `question_lens` 目前为空，第一版由模型根据用户问题动态生成个性化 lens。

## 核心架构原则

- 64 卦固定内容由数据库控制，是权威来源。
- 模型只负责把“用户问题 + 固定卦义 + 问题类型”转成个性化解读。
- 模型不能编造卦义、传统经文或确定性预测。
- 每次 AI 输出必须保存，便于后期优化 Prompt 和复盘用户反馈。
- SEO/GEO 页面必须可索引，不能只靠客户端渲染。

## 核心数据库表

第一版表：

- `hexagrams`
- `profiles`
- `readings`
- `prompt_versions`
- `reading_interpretations`
- `user_feedback`
- `seo_pages`

## 第一版页面

用户端：

- `/`
- `/reading`
- `/reading/cast`
- `/reading/result/[id]`
- `/hexagrams`
- `/hexagrams/[number-slug]`
- `/i-ching/origin-of-64-hexagrams`
- `/i-ching/64-hexagrams`
- `/i-ching/beginners-guide`
- `/readings/love`
- `/readings/career`
- `/dao-oracle`

后台：

- `/admin`
- `/admin/hexagrams`
- `/admin/readings`
- `/admin/interpretations`
- `/admin/prompts`
- `/admin/feedback`
- `/admin/seo-pages`

## 主设计规格

- `docs/superpowers/specs/2026-06-26-full-stack-website-platform-design.md`

## 待实施

- 创建 Supabase Staging 项目并配置环境变量。
- 在 Supabase 执行 migration。
- 真实导入 64 卦 seed。
- 连接 `/api/readings` 到 Supabase `readings` 表。
- 连接 `/api/interpretations` 到 OpenAI API 和 `reading_interpretations` 表。
- 配置 Supabase Auth 和 admin 权限。
- 部署 Vercel Preview。
- 后续接入 Stripe 付费和深度解读。
