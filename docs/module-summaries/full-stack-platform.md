# 全栈网站平台模块摘要

最后更新：2026-06-26

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

- 创建 Next.js 项目骨架。
- 建立 Supabase migration。
- 编写 64 卦 JSONL 导入脚本。
- 实现起卦和 reading API。
- 接入 OpenAI 结构化输出。
- 搭建用户端核心页面。
- 搭建后台最小可用功能。
- 配置 Vercel Preview 和 Supabase Staging。
