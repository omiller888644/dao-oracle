# Dao Oracle 全栈网站平台设计方案

日期：2026-06-26
状态：已确认技术方向，等待按本规格拆分实施计划
适用范围：Dao Oracle 第一版可测试全栈网站、后台、数据库、AI 解读链路和测试部署环境

## 1. 目标

把当前 Dao Oracle 静态 MVP 和效果图升级为可测试、可运营、可持续优化的全栈网站系统。

第一版目标：

- 用户可以输入问题并完成起卦流程。
- 系统根据抽到的卦象和用户问题生成个性化解读。
- 64 卦固定内容来自我们已准备好的数据库种子文件。
- 后台可以查看卦象内容、用户问题、起卦记录、AI 解读结果、Prompt 版本和用户反馈。
- SEO/GEO 页面可以逐步建设，支持未来 AI 搜索引用。
- 部署在便于测试和快速迭代的环境中。

不在第一版范围：

- 复杂会员等级。
- Stripe 付费闭环。
- 多语言后台。
- 原生 App。
- 完整 KOL / affiliate 系统。
- 对 64 卦内容做大规模人工再编辑。

## 2. 技术栈

采用：

- Frontend / Backend：Next.js App Router
- UI：Tailwind CSS
- Database：Supabase Postgres
- Auth：Supabase Auth
- AI：OpenAI API
- Deployment：Vercel Preview + Vercel Production
- Database Environments：Supabase Staging + Supabase Production
- Source Control：GitHub `omiller888644/dao-oracle`

选择理由：

- Next.js 适合同时承载页面、API、后台和 SEO/GEO 内容页。
- Supabase 的 Postgres、Auth、Row Level Security 和 SQL migration 适合快速搭建后台。
- OpenAI API 负责把用户问题和固定卦义结合成个性化解读。
- Vercel 对 Next.js 测试部署最顺，每次 GitHub 推送都能生成 Preview 链接。

Cloudflare 暂不作为第一版主部署环境。它更适合后期做边缘缓存、全球性能和 Workers 扩展。

## 3. 数据源

64 卦内容使用以下文件作为第一版数据库种子：

`outputs/hexagram_content/dao_oracle_64_hexagrams_database_ready.jsonl`

已确认结构：

- 共 64 行，每行一个卦。
- 顶层字段：
  - `number`
  - `title_en`
  - `title_zh`
  - `core_en`
  - `core_zh`
  - `sections`
  - `question_lens`
- `sections` 包含：
  - `cosmic_timing`
  - `human_field`
  - `earthly_leverage`
  - `ancient_root`
- `question_lens` 包含：
  - `love`
  - `career`
  - `money`
  - `wellbeing`
  - `life_path`

当前 `question_lens` 全部为空。第一版不补写人工 lens，而是让模型根据用户问题、问题类型和固定卦义动态生成个性化 lens。后期可以把高质量模型输出沉淀为人工审核后的 lens 内容。

## 4. 核心原则

### 4.1 固定卦义和模型生成分离

数据库中的 64 卦内容是权威来源。模型不能自由改写卦义、添加不存在的传统文本或编造出处。

模型只做：

- 根据用户问题选择表达角度。
- 把固定卦义转译成现代英文建议。
- 生成结构化、可保存、可复盘的解读结果。

### 4.2 所有 AI 输出必须保存

每次 AI 解读都要保存：

- 用户问题。
- 问题类型。
- 抽到的卦象编号。
- 使用的 Prompt 版本。
- 输入给模型的上下文摘要。
- 模型原始结构化输出。
- 用户反馈。

这样后期才能优化 Prompt、发现问题、建立高质量案例库。

### 4.3 SEO/GEO 内容必须可索引

公开内容页必须以可索引 HTML 输出，不只依赖客户端渲染。核心 SEO/GEO 页面应有标题、meta description、canonical、结构化数据和内部链接。

### 4.4 后台先做运营必需功能

第一版后台只做能支持测试和优化的功能，不做复杂 CMS。重点是查看、筛选、编辑 Prompt、复盘用户反馈。

## 5. 页面架构

### 5.1 用户端页面

- `/`：首页，承接 Dao Oracle 品牌定位和主要入口。
- `/reading`：用户输入问题，选择问题类型。
- `/reading/cast`：起卦动画页，生成 6 爻并确定卦象。
- `/reading/result/[id]`：展示一次完整解读结果。
- `/hexagrams`：64 卦列表。
- `/hexagrams/[number-slug]`：单卦详情页。
- `/i-ching/origin-of-64-hexagrams`：64 卦起源页。
- `/i-ching/64-hexagrams`：64 卦知识页。
- `/i-ching/beginners-guide`：I Ching 新手指南。
- `/readings/love`：Love Reading 意图页。
- `/readings/career`：Career Reading 意图页。
- `/dao-oracle`：What Is Dao Oracle 页面。

### 5.2 后台页面

- `/admin`：后台首页，显示核心指标。
- `/admin/hexagrams`：64 卦内容查看与后期编辑入口。
- `/admin/readings`：用户起卦记录。
- `/admin/interpretations`：AI 解读结果列表。
- `/admin/prompts`：Prompt 版本管理。
- `/admin/feedback`：用户反馈。
- `/admin/seo-pages`：SEO/GEO 页面内容管理。

第一版后台只允许管理员访问。管理员账户通过 Supabase Auth 和数据库角色控制。

## 6. 数据库设计

### 6.1 `hexagrams`

用途：保存 64 卦固定内容。

字段：

- `id`: uuid primary key
- `number`: integer unique not null
- `slug`: text unique not null
- `title_en`: text not null
- `title_zh`: text not null
- `core_en`: text not null
- `core_zh`: text not null
- `sections`: jsonb not null
- `question_lens`: jsonb not null
- `source_file`: text not null
- `created_at`: timestamptz not null
- `updated_at`: timestamptz not null

索引：

- unique index on `number`
- unique index on `slug`
- GIN index on `sections`

### 6.2 `profiles`

用途：保存登录用户资料。第一版可只服务后台管理员，后期扩展普通用户。

字段：

- `id`: uuid primary key, references auth.users
- `email`: text not null
- `role`: text not null, values: `admin`, `user`
- `created_at`: timestamptz not null
- `updated_at`: timestamptz not null

### 6.3 `readings`

用途：保存每次起卦的输入和结果。

字段：

- `id`: uuid primary key
- `user_id`: uuid nullable, references profiles
- `question`: text not null
- `question_type`: text not null, values: `love`, `career`, `money`, `wellbeing`, `life_path`, `general`
- `hexagram_id`: uuid not null, references hexagrams
- `hexagram_number`: integer not null
- `cast_method`: text not null, values: `six_line_tap`, `daily`, `manual_test`
- `lines`: jsonb not null
- `changing_lines`: jsonb not null
- `locale`: text not null default `en`
- `created_at`: timestamptz not null

第一版可以先不实现变卦解释，但必须保存 `changing_lines`，避免以后重构数据结构。

### 6.4 `prompt_versions`

用途：保存 AI 解读 Prompt 版本。

字段：

- `id`: uuid primary key
- `name`: text not null
- `version`: integer not null
- `status`: text not null, values: `draft`, `active`, `archived`
- `system_prompt`: text not null
- `developer_prompt`: text not null
- `output_schema`: jsonb not null
- `model`: text not null
- `temperature`: numeric not null
- `created_by`: uuid nullable, references profiles
- `created_at`: timestamptz not null
- `updated_at`: timestamptz not null

约束：

- 同一时间只允许一个 `active` reading prompt。

### 6.5 `reading_interpretations`

用途：保存模型生成结果。

字段：

- `id`: uuid primary key
- `reading_id`: uuid not null, references readings
- `prompt_version_id`: uuid not null, references prompt_versions
- `model`: text not null
- `input_context`: jsonb not null
- `output`: jsonb not null
- `summary`: text not null
- `status`: text not null, values: `generated`, `failed`, `reviewed`
- `error_message`: text nullable
- `created_at`: timestamptz not null

### 6.6 `user_feedback`

用途：保存用户对解读结果的反馈。

字段：

- `id`: uuid primary key
- `reading_id`: uuid not null, references readings
- `interpretation_id`: uuid not null, references reading_interpretations
- `rating`: integer nullable
- `label`: text not null, values: `helpful`, `unclear`, `too_generic`, `inaccurate`, `too_mystical`, `other`
- `comment`: text nullable
- `created_at`: timestamptz not null

### 6.7 `seo_pages`

用途：保存 GEO/SEO 内容页元数据和内容。

字段：

- `id`: uuid primary key
- `slug`: text unique not null
- `title`: text not null
- `meta_description`: text not null
- `page_type`: text not null, values: `guide`, `reading_landing`, `hexagram`, `dao_oracle`
- `status`: text not null, values: `draft`, `published`, `archived`
- `content`: jsonb not null
- `schema_json`: jsonb nullable
- `published_at`: timestamptz nullable
- `created_at`: timestamptz not null
- `updated_at`: timestamptz not null

## 7. 起卦与解读流程

### 7.1 用户流程

1. 用户进入 `/reading`。
2. 用户输入问题并选择问题类型。
3. 系统生成临时 reading draft。
4. 用户进入 `/reading/cast` 完成 6 次交互。
5. 前端把 6 爻结果提交给后端。
6. 后端计算卦象编号。
7. 后端创建 `readings` 记录。
8. 后端读取 `hexagrams` 中对应卦象内容。
9. 后端读取当前 active prompt。
10. 后端调用 OpenAI API。
11. 后端保存 `reading_interpretations`。
12. 用户跳转到 `/reading/result/[id]` 查看结果。
13. 用户提交反馈，写入 `user_feedback`。

### 7.2 模型输入

模型输入必须包含：

- 用户问题。
- 问题类型。
- 抽到的卦象编号。
- 卦象英文标题。
- 卦象核心英文句。
- `cosmic_timing` 英文内容摘要。
- `human_field` 英文内容摘要。
- `earthly_leverage` 英文内容摘要。
- `ancient_root` 英文内容摘要。
- 品牌边界：不是 fortune telling，不承诺固定结果。

### 7.3 模型输出结构

模型输出必须是结构化 JSON：

```json
{
  "summary": "A short direct answer.",
  "hexagram_message": "How this hexagram speaks to the user's question.",
  "timing": "What the timing suggests.",
  "relationship_or_context_lens": "Lens adapted to the question type.",
  "action_steps": ["Step 1", "Step 2", "Step 3"],
  "reflection_question": "A question for the user to sit with.",
  "caution": "A grounded limitation or warning.",
  "not_fortune_telling_note": "A short agency-preserving note."
}
```

输出要求：

- 使用英文。
- 语气现代、克制、可信、有仪式感。
- 不说 guaranteed、destiny is fixed、this will happen。
- 不编造传统经文。
- 不给医疗、法律、金融确定性建议。

## 8. 后台优化闭环

后台应支持我们回答三个问题：

1. 用户最常问什么问题？
2. 哪些卦象/问题类型的模型回答最容易被认为有帮助？
3. 哪些回答太泛、太玄或不准确，需要调整 Prompt？

第一版后台指标：

- 今日 readings 数量。
- 最近 7 天 readings 数量。
- 问题类型分布。
- 常见卦象分布。
- 用户反馈标签分布。
- AI 生成失败次数。
- 当前 active prompt 版本。

## 9. 权限与安全

第一版安全要求：

- `/admin/*` 必须登录且 role 为 `admin`。
- Supabase RLS 开启。
- 公开用户不能直接写 `hexagrams`、`prompt_versions`、`seo_pages`。
- OpenAI API key 只存在服务端环境变量中。
- Supabase service role key 只存在服务端环境变量中。
- 用户输入问题长度限制，第一版建议 20-800 字符。
- AI 调用失败时返回友好错误，不暴露内部 key、SQL 或 stack trace。

## 10. 测试部署方案

第一阶段使用：

- Vercel Preview：每次 GitHub 推送生成测试链接。
- Supabase Staging：测试数据库。
- Vercel Environment Variables：配置 Supabase 和 OpenAI key。

环境变量：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `OPENAI_READING_MODEL`
- `APP_ENV`

后期正式上线：

- Vercel Production
- Supabase Production
- 正式域名
- Google Search Console
- Bing Webmaster Tools

## 11. 测试策略

第一版测试分三层：

### 11.1 数据导入测试

- JSONL 文件必须能解析出 64 条。
- 每条 `number` 为 1-64 且不重复。
- 每条必须有英文标题、中文标题、英文核心句、中文核心句。
- 每条必须有四个 section。

### 11.2 API 测试

- 创建 reading 成功。
- 无效问题类型被拒绝。
- 无效卦象编号被拒绝。
- AI 输出不符合 schema 时被记录为失败。
- 成功生成后写入 `reading_interpretations`。

### 11.3 页面流程测试

- 首页进入 reading。
- 输入问题进入 cast。
- cast 产生 6 爻。
- result 页面展示固定卦义和 AI 个性化解读。
- feedback 能保存。
- 非管理员不能访问后台。

## 12. 第一阶段实施顺序

1. 创建 Next.js 应用骨架。
2. 配置 Tailwind 和基础设计 token。
3. 配置 Supabase 客户端和服务端环境。
4. 建立数据库 migration。
5. 编写 JSONL 导入脚本。
6. 导入 64 卦内容。
7. 实现 reading 创建和起卦计算。
8. 实现 OpenAI 结构化解读 API。
9. 实现用户端核心页面。
10. 实现后台最小可用页面。
11. 部署到 Vercel Preview。
12. 连接 Supabase Staging。
13. 更新项目摘要和运行说明。

## 13. 需要用户确认的实施前事项

进入实际开发前，需要确认：

- Supabase 项目由谁创建，以及项目 URL / anon key / service role key 如何提供。
- OpenAI API key 是否由用户提供，或先用本地 `.env.local.example` 示例变量等待配置。
- Vercel 是否连接当前 GitHub 仓库 `omiller888644/dao-oracle`。
- 第一版后台是否只需要一个管理员账户。

默认假设：

- 先用本地 `.env.local.example` 定义变量名，不写真实 key。
- 先搭建代码和数据库 migration。
- 真实 Supabase、OpenAI、Vercel key 由用户配置到本地和 Vercel。
- 第一版后台只支持 admin 角色。
