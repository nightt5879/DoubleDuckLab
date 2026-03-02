# Astro 课题组官网 UI 组件技术路线深度调研

## 执行摘要

本调研针对“本地优先、后续可上云、面向课题组官网”的 Astro 项目，给出一条**可落地、可迁移、可维护**的 UI 组件技术路线，并对至少 6 套候选方案做矩阵对比、推荐与实施计划。结论优先级按你给的约束排序：**现代科技感 + 流畅不卡顿** > **维护者不一定资深** > **先本地无后端** > **后续可接 0 代码编辑/CMS**。

核心事实基线（所有方案都应遵守）：
- Astro 的“Islands Architecture”默认输出大量静态 HTML，只在需要交互处通过“岛屿”引入少量 JS，是控制性能与包体积风险的根本抓手。 【来源类型：官方文档】citeturn0search0  
- Astro 的交互岛屿可用 `client:load / client:idle / client:visible / client:media / client:only` 等 hydration 指令精细控制何时在客户端加载与水合。 【来源类型：官方文档】citeturn4search2turn4search1  
- Tailwind v4 在 Astro 中的推荐做法已转向 Tailwind 的 Vite 插件；Astro 的 `@astrojs/tailwind` 集成在文档中标注为 Deprecated。 【来源类型：官方文档】citeturn0search1turn0search5  

主推路线（一句话）：  
**“Astro + Tailwind v4（官方 Vite 插件）+ shadcn/ui（Radix 交互原语、少量 React 岛屿）+ 设计 Token（CSS 变量）”**，以“静态为主、交互点状注入”为边界，既能迅速得到现代科技感组件外观，又能把交互 JS 限制在必要范围内，并对未来 CMS/0 代码内容维护保持兼容。 【来源类型：官方文档】citeturn6search0turn0search0turn4search2turn3search0  

Plan B（更轻、更少框架负担）：  
- **Tailwind + daisyUI + Astro 原生组件**：几乎不引入 React/重组件库，开发和维护更轻，但“高端定制感与组件细节”需要额外设计投入。 【来源类型：官方文档】citeturn4search10turn4search6  
- **纯 CSS 设计系统 + Astro 原生组件（Style Dictionary / Open Props 作为 Token 基础）**：性能与可迁移性最佳，但前期需要你们自己把常用组件体系化（按钮、表单、表格、卡片、导航、提示等）。 【来源类型：官方文档】citeturn3search0turn3search1  

不推荐（至少 2 个反例）：  
- **在 Astro 里“全站 React + MUI”或“全站 React + Ant Design”**：可以跑，但对课题组官网这类“内容为主、交互点状”的站而言，容易引入不必要的开发与包体积负担；并且 MUI 官方文档明确指出某些“barrel imports”会显著拖慢开发期启动和重建速度。 【来源类型：官方文档】citeturn4search2turn1search7turn1search17turn4search11  
- **在同一项目同时混用 2 套以上设计语言/组件体系（例如 shadcn + AntD + 自写组件混搭）**：长期会在样式冲突、可访问性一致性、主题系统、组件 API 语义等方面产生维护债务（此项为工程经验判断，但会在落地计划中用治理机制避免）。【推测｜依据：Astro 的 hydration 指令只作用于“直接导入”的组件，混搭会增加边界管理复杂度】citeturn4search1turn4search2  

---

## 候选组件方案清单

下列每套方案都给出“可落地形态”，并对“事实 vs 推测”与“来源类型”做标注。

### Tailwind v4 + shadcn/ui + Radix（少量 React 岛屿）

定位：**主推**。适合你们想要“现代、科技感、简洁、不卡顿”，同时维护者不一定资深的现实（因为 shadcn 组件是**拷贝到项目里**的，你们拥有代码，改样式不需要深入理解复杂主题引擎）。【来源类型：官方文档】citeturn5search1turn6search0turn0search6  

可落地构成（事实）：
- shadcn/ui：官方写明是“Copy‑paste React components built with Radix UI and Tailwind CSS”，并强调“full code ownership”。【来源类型：官方文档】citeturn5search1turn5search9  
- Radix：官方定位为低层 UI 原语（primitives），重点是可访问性、可定制、开发体验，并且强调“保留对样式的完全控制”，可通过 `data-state` 等属性做状态样式。 【来源类型：官方文档】citeturn0search6turn5search2turn0search10  
- Astro：通过框架组件与 hydration 指令，把 React 组件限制在“需要交互”的小范围（例如移动端导航、下拉菜单、对话框、Tab）。【来源类型：官方文档】citeturn2search22turn4search2turn0search0  
- Tailwind：Astro 中使用 Tailwind 官方 guide；并注意 `@astrojs/tailwind` 在 Tailwind v4 场景已被标注为 Deprecated。 【来源类型：官方文档】citeturn0search5turn0search1  

典型落地方式（推测，但强约束可执行）：
- “静态页面结构”尽量用 `.astro` 组件；只有交互组件才用 shadcn（React）并加 `client:visible / client:idle` 之类指令把 JS 延后。 【推测｜依据：Astro islands + hydration 指令机制】citeturn0search0turn4search2  
- 主题与 Token：用 CSS 变量承载语义 Token（如 `--color-bg`, `--color-fg`, `--radius`, `--shadow`），避免把主题逻辑绑死在某组件库内部，有利于后续接 CMS 与多语言内容。 【推测｜依据：Style Dictionary/Open Props 的 Token 输出理念】citeturn3search0turn3search1  

### Tailwind + Headless UI（React/Vue）+ 自定义样式体系

定位：偏“团队有一定前端能力、想保持 headless 的可控度”，但比 shadcn 更“需要你们自己补齐样式与交互细节”。

事实要点：
- Headless UI 官方定位为“Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS”，并提供 React/Vue 版本。 【来源类型：官方文档】citeturn1search2turn1search22  

推测要点：
- Headless UI 相比 shadcn：你们会写更少“组件业务逻辑”，但会写更多“样式与设计系统 glue”（例如 button/field 的 variant、spacing、focus ring、motion）。【推测｜依据：Headless UI 明确“unstyled”】citeturn1search2  

### Tailwind + Radix 原语（不使用 shadcn，自己封装）

定位：偏“架构师风格”，上限高，维护风险取决于你们是否能做出清晰的组件边界与文档。

事实要点：
- Radix 适合作为“设计系统底座”，可“增量采用”，并且强调对样式的控制与可访问性封装。 【来源类型：官方文档】citeturn0search6turn0search18  
- Radix 对组合（composition）有明确约束，比如组件必须正确透传 props，否则会破坏功能与可访问性。 【来源类型：官方文档】citeturn0search14  

推测要点：
- 对非资深维护者而言，自封装 Radix 的风险在于：组件 API/可访问性模式/状态样式约定（`data-state` 等）需要通过文档与示例固化，否则“每个人写一套”。【推测｜依据：Radix 强调可组合与状态属性，意味着需要约定】citeturn5search2turn0search14  

### Tailwind + daisyUI + Astro 原生组件（尽量零 JS）

定位：Plan B 的“低门槛 + 低 JS 风险”路线，适合先快速统一视觉与组件样式，再按需补少量交互。

事实要点：
- daisyUI 是 Tailwind 插件，通过 Tailwind plugin API 扩展可用 class 名，且“fully compatible with Tailwind CSS”。【来源类型：官方文档】citeturn4search10turn4search6  
- 安装方式是在 CSS 中通过 `@plugin "daisyui"` 启用。 【来源类型：官方文档】citeturn4search6turn4search22  

推测要点：
- daisyUI 的“组件 class”会显著提升开发速度，但如果你们追求“非常强的独特科技感”，往往需要在主题、排版、动效、图标体系上额外做“品牌化二次设计”。【推测｜依据：daisyUI 属于通用组件类名扩展】citeturn4search3turn4search10  

### 纯 CSS 设计系统（Astro 原生组件）+ 设计 Token（Style Dictionary / Open Props）

定位：**性能与迁移最强**，并且不绑定 React/Svelte；对课题组官网（内容型）非常契合，但需要你们把“组件规范 + Token”一次性立住。

事实要点：
- Style Dictionary 的定位是“Export your Design Tokens to any platform”，并强调与设计 Token 规范的兼容。 【来源类型：官方文档】citeturn3search0turn3search8  
- Open Props 提供“CSS variables design tokens”，可用于任何框架，形成一致组件。 【来源类型：官方文档】citeturn3search1  

推测要点（落地方向）：
- 对你们的站点类型，真正高频的组件集合通常不超过 20 个（按钮、链接、卡片、徽标、导航、表格、分页、标签、表单控件、提示/公告块等）。因此“自建轻设计系统”可能比“引入重组件库”更符合长期维护。此为经验判断，但可用 Week2‑Week4 的验收产物测试。【推测｜依据：Astro 内容型定位 + islands】citeturn0search0turn6search12  

### Web Components 路线：Shoelace（组件库）+ Lit（自研组件）

定位：强调“框架无关 + 可跨页面复用 + 后续可迁移到任何前端栈”。适合你们希望最大化未来可迁移性（例如将来不一定坚持 Astro/React/Svelte）。

事实要点：
- Lit 官方强调：Lit 是构建“fast, lightweight web components”的简单库，并且 Web Components 可与任何框架互操作。 【来源类型：官方文档】citeturn2search2turn2search10  
- Shoelace 官方说明其提供“framework agnostic”组件；并有“Integrating with Astro”的文档页面，且页面注明这是 community-maintained。 【来源类型：官方文档/社区实践】citeturn2search13turn2search5  

推测要点：
- Web Components 的样式隔离与主题系统（CSS parts/自定义属性）对非资深维护者不一定直观，需要在项目中提供“封装层”与示例；否则会出现“每个人用不同方式改样式”。【推测｜依据：Shoelace 与 Lit 强调可定制与互操作，但不提供你们项目级约定】citeturn2search13turn2search10  

### Astro + Svelte + Skeleton UI（Svelte 组件作为岛屿）

定位：适合你们团队有人更熟 Svelte，或者希望用更“框架内一致”的方式构建交互组件。

事实要点：
- Astro 有官方 Svelte 集成，文档明确它支持 Svelte 组件渲染与客户端水合。并提示 Svelte 版本差异（Svelte 5 vs 3/4）。【来源类型：官方文档】citeturn1search1  
- Skeleton 官方定位为“Svelte + Tailwind 的 UI Toolkit”，并描述其由“设计系统、Tailwind 扩展、可选的框架组件”组成。 【来源类型：官方文档】citeturn2search3turn2search14turn2search11  

推测要点：
- 代价是：维护者要学习 Svelte 组件心智；并且在 Astro 页面中混合 `.astro` 与 `.svelte`，需要更明确的组件边界规范。此为经验判断，可由 Week1 的“组件目录约定 + lint 规则 + 示例”降低风险。 【推测｜依据：Astro 需要集成框架组件并使用 hydration 指令】citeturn2search22turn4search2  

### React 重组件库在 Astro 的可行性：MUI 与 Ant Design（两者都“能跑但不优先”）

这两套我单独说明“可行性边界”，因为你要求必须覆盖它们在 Astro 中的可行性。

事实：在 Astro 中使用 React 组件（因此也能用 MUI/AntD）的前提，是安装 `@astrojs/react` 并通过 hydration 指令把 React 组件作为岛屿加载。 【来源类型：官方文档】citeturn2search22turn1search0turn4search2  

MUI 事实要点：
- MUI 安装示例显示其依赖 `@emotion/react` 与 `@emotion/styled`。 【来源类型：官方文档】citeturn1search17  
- MUI 官方“Minimizing bundle size”指南明确指出，开发期应避免 `@mui/material` 这类 barrel import，因为会显著拖慢启动与重建。 【来源类型：官方文档】citeturn1search7  

Ant Design 事实要点：
- Ant Design 文档在 Getting Started 中建议在使用前先学习 React；并在 Import on Demand 部分明确 ES modules 可 tree shaking（`import { Button } from 'antd'` 会丢弃未使用代码）。 【来源类型：官方文档】citeturn2search0turn4search11  
- Ant Design 也有专门的 bundle size / tree shaking 文章讨论在实际工程中 tree shaking 不完美、需要额外操作。 【来源类型：官方文档】citeturn4search4  

推测：对“课题组官网”而言，MUI/AntD 的价值（大量商业后台组件）与网站实际需求（内容展示为主、交互点状）不完全匹配，容易把“维护复杂度与包体积风险”带进来。该判断会在“推荐路线”中给出风险与替代。 【推测｜依据：Astro islands 的性能目标 + MUI dev 性能提醒】citeturn0search0turn1search7  

---

## 对比维度矩阵

评分说明：1–5 分，5 为最好。分数作为“架构判断”属于推测，但每项推测均给出**依据**（官方文档/社区实践/性能文章）。你可以把这张表当作“决策仪表盘”，最终由你们权重决定。

| 方案 | 与 Astro 集成复杂度 | 本地开发体验 | UI 一致性与可定制性 | 性能与包体积风险 | 学习成本（非资深） | CMS/0代码编辑兼容性 | 长期维护风险 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Tailwind + shadcn + Radix | 3 | 4 | 5 | 3 | 3 | 4 | 3 |
| Tailwind + Headless UI | 3 | 4 | 4 | 3 | 3 | 4 | 4 |
| Tailwind + Radix 自封装 | 3 | 3 | 5 | 4 | 2 | 4 | 3 |
| Tailwind + daisyUI | 5 | 5 | 3 | 5 | 4 | 5 | 3 |
| 纯 CSS + Token（Style Dictionary/Open Props） | 5 | 4 | 4 | 5 | 4 | 5 | 4 |
| Shoelace + Lit（Web Components） | 4 | 4 | 4 | 4 | 3 | 5 | 4 |
| Astro + Svelte + Skeleton | 3 | 4 | 4 | 3 | 3 | 4 | 3 |
| React + MUI（岛屿） | 2 | 2 | 4 | 2 | 3 | 4 | 4 |
| React + Ant Design（岛屿） | 2 | 2 | 4 | 2 | 3 | 4 | 4 |

关键解释（逐维度，尽量不给“空泛理由”）：

- 与 Astro 集成复杂度：  
  - 最高分给“纯 Astro / 纯 CSS / Tailwind 插件类方案”，因为不需要额外框架渲染器与 hydration 边界管理。Tailwind 在 Astro 中有官方 guide；daisyUI 作为 Tailwind 插件安装简洁。 【依据：官方文档】citeturn0search5turn4search6turn4search10  
  - React/Svelte 方案扣分点在于：需要安装对应 `@astrojs/*` 集成，并且 hydration 指令只能作用于“直接导入”的 UI 框架组件（这会影响你们的组件抽象方式）。【依据：官方文档】citeturn2search22turn4search1turn1search0turn1search1  

- 本地开发体验：  
  - MUI/AntD 扣分：MUI 官方明确“barrel imports 会显著拖慢启动与重建”，这对“本地预览优先”的你们是硬痛点。 【依据：官方文档】citeturn1search7  
  - daisyUI/纯 CSS 得分高：无额外交互框架编译链负担，更多是 CSS 与 Astro 模板层面的迭代。 【依据：官方文档】citeturn0search0turn4search10  

- UI 一致性与可定制性：  
  - shadcn + Radix 得分最高：shadcn 强调“你拥有代码”，Radix 强调“保留对样式完全控制”并提供状态属性方便一致化样式。 【依据：官方文档】citeturn5search1turn0search18turn5search2  
  - 纯 CSS + Token 得分也高：Token 输出跨平台、跨框架，不把主题锁死在某组件库。 【依据：官方文档】citeturn3search0turn3search1  

- 性能与包体积风险：  
  - Astro 的岛屿机制是“理论上可控”的，但前提是你们真的做到“只在必要处水合”。 【依据：官方文档】citeturn0search0turn4search2  
  - MUI/AntD 属于“组件覆盖广但更重”的方向；即便支持 tree shaking，仍需额外工程纪律控制导入与样式。 AntD 自己也在文档里讨论 tree shaking 在现实不完美。 【依据：官方文档】citeturn1search7turn4search11turn4search4  

- 学习成本：  
  - 纯 CSS / daisyUI 对非资深更友好；  
  - Radix 自封装与多框架混用对维护者要求更高，因为需要理解可访问性语义、组合约束、hydration 边界。 【依据：官方文档】citeturn0search14turn4search1turn4search2  

- CMS/0 代码编辑兼容性：  
  - 与 UI 技术栈最相关的“兼容性原则”是：**内容以结构化数据驱动（JSON/Markdown/Content Collections），UI 组件只负责渲染**。Astro Content Collections 提供类型安全与组织方式（利于后续把 JSON 逐步迁到 Markdown）。【依据：官方文档】citeturn5search0turn5search4  

- 长期维护风险：  
  - shadcn 属于“拷贝代码在仓库里”，优点是可控，缺点是更新需要人工合并（维护风险中等）。【依据：官方文档（代码拥有）】citeturn5search1turn5search9  
  - 纯 CSS + Token 风险更低，因为依赖更少；但你们必须把组件规范写清楚，否则“人治”会替代“机制”。【推测｜依据：Token 输出的跨平台理念 + Astro 内容型定位】citeturn3search0turn6search12  

---

## 推荐路线

### 主推方案

**主推：Tailwind v4（官方 Vite 插件）+ shadcn/ui（Radix 原语）+ “交互点状 React 岛屿” + 设计 Token（CSS 变量）**。

为什么现在就上（事实 + 推测拆开）：
- 事实：shadcn 有官方 Astro 安装指南，并给出典型模式：在 Astro 页面中引入组件并使用 `client:load` 等方式让交互组件在客户端运行（例如 dark mode toggle 示例）。【来源类型：官方文档】citeturn6search0turn6search3turn4search2  
- 事实：Radix 的目标就是作为可访问性与交互细节的“底座”，并允许你完全控制样式（非常适合做“课题组官网的轻设计系统”）。【来源类型：官方文档】citeturn0search6turn0search18turn0search10  
- 推测：对“维护者可能不是资深前端”的团队，shadcn 的“拷贝到仓库、代码即文档”比“深度依赖一个黑盒主题引擎”的重组件库更容易长期维护；你们可以把组件封装在 `src/components/ui/*`，上层只暴露 10–20 个稳定 API（Button/Card/Table/Form/Modal/Alert/Badge/Nav等）。【推测｜依据：shadcn 强调 code ownership + Astro islands 控制 JS】citeturn5search1turn0search0turn4search2  

建议的“边界规则”（强烈建议写入项目规范）：
- 页面结构、排版、列表卡片等“非交互内容”优先 `.astro` 组件；  
- 只有真正需要交互的区域（导航菜单、抽屉、对话框、筛选器、Tabs）才使用 shadcn（React），并默认用 `client:idle` 或 `client:visible`，除非交互必须首屏即用才用 `client:load`。 【推测｜依据：Astro hydration 指令与 islands】citeturn4search2turn0search0  
- 避免“动态组件映射后再 hydrate”的写法，因为 Astro 文档强调 client 指令只能用于“直接导入”的 UI 框架组件；这会影响你们组件注册表的实现方式。 【事实｜官方文档】citeturn4search1  

### 备选方案

**Plan B1：Tailwind + daisyUI + Astro 原生组件（必要时再引入少量 Preact/React 岛屿）**  
- 事实：daisyUI 是 Tailwind plugin，安装与使用路径清晰，适合快速统一视觉与组件样式。 【来源类型：官方文档】citeturn4search6turn4search10  
- 推测：它能让你们用更少 JS 实现“看起来完整”的界面，但更深的“科技感品牌化”需要你们增加排版、图标与动效设计。 【推测｜依据：daisyUI 的定位是 class 扩展与主题】citeturn4search3turn4search10  

**Plan B2：纯 CSS 设计系统 + Token（Style Dictionary/Open Props）+ Astro 原生组件**  
- 事实：Style Dictionary 的 Token 输出能把颜色/字号/间距等设计决策以可移植方式沉淀；Open Props 也提供可直接使用的 CSS variables tokens。 【来源类型：官方文档】citeturn3search0turn3search1  
- 推测：如果你们愿意在 Week1–Week2 把核心 Token 与 10 个基础组件立住，后续维护成本往往最低，并且对接任何 CMS 都不会被 UI 技术栈限制。 【推测｜依据：Token 可跨平台 + Astro 内容型定位】citeturn3search0turn6search12  

### 不推荐方案（反例）

**不推荐一：Astro + 全站 React + MUI**  
- 事实：MUI 安装需要 Emotion 运行时（意味着更多依赖与样式注入链路）。【来源类型：官方文档】citeturn1search17  
- 事实：MUI 官方指出某些导入方式会显著拖慢开发期启动与重建，这与“本地开发预览优先”直接冲突。 【来源类型：官方文档】citeturn1search7  
- 推测：对内容型官网，其“组件覆盖广”的优势无法抵消额外复杂度，且容易让维护者把页面做成“大型 SPA 心智”，偏离 Astro 的性能优势。 【推测｜依据：Astro islands 目标】citeturn0search0turn4search2  

**不推荐二：Astro + 全站 React + Ant Design**  
- 事实：Ant Design 官方文档明确建议使用前先学习 React，并讨论 bundle size/tree shaking 的现实问题与额外操作。 【来源类型：官方文档】citeturn2search0turn4search4turn4search11  
- 推测：对维护者不资深的长期迭代，不仅要学 React，还要学 AntD 的样式体系、按需加载与主题定制路径；当你们只需要少量交互组件时，这个学习与维护成本不划算。 【推测｜依据：AntD 文档对 React 前置要求 + Astro islands 的“少 JS”目标】citeturn2search0turn0search0  

---

## 落地实施计划

下面按 Week1–Week4 给出“目标、可验收产物、风险点与回滚策略”。默认你们当前内容在 JSON，后续可迁到 Markdown/Content Collections（不影响 UI 路线，只影响数据层与渲染适配）。

### Week1

目标：建立“样式与组件基础设施”，并把性能边界写清楚。  
可验收产物：
- Tailwind v4 在 Astro 中可用（按 Tailwind 官方 Astro guide），并确认未使用 Deprecated 的 `@astrojs/tailwind` 路径。 【验收依据：官方文档一致性】citeturn0search5turn0search1  
- 引入 shadcn/ui（按其官方 Astro 安装指南），并生成 3 个最小组件：Button、Card、Dialog（Dialog 用 `client:idle` 或 `client:visible`）。【验收依据：官方安装/使用示例】citeturn6search0turn4search2  
- 写一份 `UI_BOUNDARY.md`：明确哪些模块必须保持静态（`.astro`）、哪些允许岛屿（React），hydration 指令如何选型。 【验收依据：hydration 指令清单】citeturn4search2turn4search1  

风险点：
- Tailwind 引入会影响全局样式优先级与 reset；  
- 过早把大量页面改成 React，会破坏 Astro“静态为主”的架构。 【依据：Astro islands 目标】citeturn0search0  

回滚策略：
- Tailwind 与 shadcn 的引入用单独 PR；若冲突严重，回滚到仅保留 Tailwind 的基础配置或仅引入 Token（不引入组件）。  
- 所有 React 岛屿必须集中在 `src/components/islands/`，回滚时删除目录即可（页面仍可静态渲染）。

### Week2

目标：形成“基础组件层（Foundation）”，让非资深维护者只用你们封装后的 API。  
可验收产物：
- 建立 `src/components/ui/` 并固化组件 API：Button（variants/sizes）、Input、Select、Table、Badge、Alert、Tabs。  
- 为交互组件统一封装 hydration：例如 `DialogIsland.astro` 内部引入 React Dialog 并固定 hydration 策略（默认 `client:idle`）。【依据：hydration 指令机制】citeturn4search2  
- 引入“语义 Token”文件（例如 `tokens.css`）：至少覆盖颜色（前景/背景/强调/边框）、间距、圆角、阴影、字号。Token 可用 Style Dictionary 生成或先手写 CSS 变量；并写“Token 命名规则”。 【依据：Token 输出理念】citeturn3search0turn3search4  

风险点：
- Radix 组件需要正确透传 props（composition），封装不当会破坏组件行为。 【依据：Radix composition 指南】citeturn0search14  

回滚策略：
- 封装层与第三方组件代码严格隔离：`ui/*` 是你们的稳定 API，`vendor/*`（或 `ui/shadcn/*`）是可替换实现。实现出问题时，用纯 HTML/CSS 临时替代（按钮、卡片、表格等都能静态回退）。

### Week3

目标：把“内容渲染层”与“组件层”对齐，做到数据驱动与可扩展。  
可验收产物：
- 为你们现有 JSON 数据建立统一 schema（推荐迁到 Astro Content Collections 或至少用 zod schema 校验），并实现：成员列表、论文列表、项目列表三类页面的统一卡片与表格组件渲染。 【依据：Astro Content Collections 的类型安全与组织能力】citeturn5search0turn5search7  
- 在 2 个页面上做性能边界验证：页面 95% 以上为静态 `.astro` 渲染，只有导航/过滤等少量岛屿；并在代码审查中记录“为何需要该岛屿”。【依据：Astro islands 的目标与 hydration 指令控制】citeturn0search0turn4search2  
- 实现暗色模式（若你选主推方案，可参考 shadcn 的 Astro dark mode guide，包含 inline theme script 与 toggle 组件）。【依据：官方指南】citeturn6search3  

风险点：
- 内容结构未来要给 0 代码编辑，若现在把 rich content 写死在组件 JSX/Slot 中，会导致以后迁 CMS 很痛。  

回滚策略：
- 页面渲染一律走“数据 → 组件 props”，避免把内容写进组件内部；如果发现页面耦合太强，回滚到“纯 Markdown/纯 JSON + 简单模板组件”。

### Week4

目标：为“后续 0 代码编辑 / CMS 接入”预留接口，不做后端但把代码结构准备好。  
可验收产物：
- 形成 `content-model.md`：列出将来 CMS 需要的字段（成员、论文、项目、新闻），并标注哪些字段支持多语言。  
- 对富文本内容预留两条路径：Markdown/MDX（本地优先）与结构化 blocks（未来 CMS 输出），并做一个 demo：同一组件既能渲染 Markdown，也能渲染结构化 blocks。 【依据：Astro 对 MDX 的官方支持】citeturn5search4  
- 写一份 `MAINTAINER_GUIDE.md`：面向非资深维护者，列出“新增一个项目/论文/新闻”的步骤、常见坑以及如何本地预览。  

风险点：
- 过早引入复杂 CMS SDK 会让“先本地、无服务器”的目标失焦。  

回滚策略：
- Week4 不引入任何线上 CMS SDK，仅输出模型与抽象层；保持项目仍可完全离线开发预览。

---

## 迁移影响评估

你当前是 Astro 静态站，内容已逐步从代码中抽离（JSON/未来 Markdown）。因此迁移主要发生在“样式层、组件层、页面布局层”，数据层只需要做适配，不需要推倒重来。

### 需要改哪些层

- Layout 层：  
  - 需要建立统一的基础布局组件（Header/Nav/Footer/Container/Grid/Typography）；主推方案会把导航等交互点改为 React 岛屿。 【事实｜Astro 支持框架组件与 hydration】citeturn2search22turn4search2  

- Pages 层：  
  - 大多数内容页可以保持 `.astro`，只把小块交互替换为岛屿组件；  
  - 需要逐页把旧样式替换为 Tailwind/Token 的新体系。 【推测｜依据：Astro islands 的“静态为主”模式】citeturn0search0  

- Styles 层：  
  - 引入 Tailwind v4（推荐按 Tailwind 官方 Astro guide），并建立 Token（CSS variables）作为主题基础；  
  - 或选择纯 CSS Token 路线，重点是 Token 命名与组件样式规约。 【事实｜Tailwind guide + Token 输出】citeturn0search5turn3search0  

- Data schema 层：  
  - 你们现有 JSON 可先保留；更推荐逐步迁到 Astro Content Collections 以获得类型安全与结构化组织，并为后续 Markdown/MDX 做准备。 【事实｜官方文档】citeturn5search0turn5search4  

### 预计改动规模

- 主推方案（Tailwind + shadcn + 少量 React 岛屿）：**中**  
  - 原因：需要引入 React 集成与部分组件替换，但页面主体仍可保持静态 `.astro`。 【依据：Astro React 集成与 framework components】citeturn1search0turn2search22  

- Plan B1（Tailwind + daisyUI）：**小‑中**  
  - 原因：几乎不需要框架岛屿，仅替换样式与部分组件 class。 【依据：daisyUI 是 Tailwind plugin】citeturn4search10turn4search6  

- Plan B2（纯 CSS + Token）：**中‑大（前期）/ 小（后期）**  
  - 原因：前期要把组件体系化（立规范），后期维护最轻。 【推测｜依据：Token 跨平台 + 自建组件的前置投入】citeturn3search0turn3search4  

### 能否渐进迁移

可以，且建议必须渐进（边跑边换、不停机）：
- Astro 支持在同一页面混用原生组件与框架组件，只要你们把 hydration 指令控制住，并遵守“只对直接导入组件使用 client 指令”的规则。 【事实｜官方文档】citeturn4search1turn4search2turn2search22  
- 渐进策略建议：先迁“全局 Layout + 基础组件”，再迁“高访问页面”，最后迁“低频页面”；每一步都保留旧样式 fallback（通过 class 前缀或 scoped container）。【推测｜依据：Astro 的静态输出与岛屿隔离可并存】citeturn0search0  

---

## 最终建议与执行清单

### 一句话结论

**选“Tailwind v4 + shadcn/ui（Radix）+ 点状 React 岛屿 + CSS Token”，把交互关进岛屿，把样式抽成 Token，把页面保持静态。**【依据：Astro islands + shadcn Astro guide + Radix 可控样式】citeturn0search0turn6search0turn0search18  

### 三条关键理由

- 组件质量与现代感：shadcn 提供现代审美的组件起点，并且代码在你们仓库里；Radix 负责复杂交互与可访问性细节，同时不限制你们的样式控制。 【官方文档】citeturn5search1turn0search6turn0search18  
- 性能可控：Astro 的 islands/hydration 指令允许你们把 JS 限制在真正需要交互的局部，避免整站变成大 JS 包。 【官方文档】citeturn0search0turn4search2  
- 便于未来 0 代码内容维护：通过 Token + 数据驱动组件（Content Collections/Markdown/JSON），UI 层不会锁死内容来源；未来接 CMS 主要改“内容来源层”，不必推翻 UI 组件体系。 【官方文档】citeturn5search0turn3search0  

### 两条注意事项

- Tailwind v4 配置要走官方推荐路径：Astro 文档对 `@astrojs/tailwind` 标注 Deprecated，避免走旧集成造成后续升级成本。 【官方文档】citeturn0search1turn0search5  
- 严格治理“岛屿扩散”：一旦交互岛屿失控（例如列表页每个卡片都成 React 组件），再好的组件库也会让包体积反噬。建议用 code review 规约：每新增一个 `client:*` 必须写明原因与替代方案。 【推测｜依据：Astro islands 目标与 hydration 指令可控性】citeturn0search0turn4search2  

### 给开发同学的一页执行清单（Checklist）

基础设施
- [ ] 确认 Tailwind v4 用官方 Astro guide 接入；不使用已标注 Deprecated 的 `@astrojs/tailwind` 路径。citeturn0search5turn0search1  
- [ ] 建立 `tokens.css`（CSS 变量）作为主题基础；如要工程化输出，选 Style Dictionary（或先用 Open Props 再逐步替换为自有 Token）。citeturn3search0turn3search1  
- [ ] 定义 `UI_BOUNDARY.md`：哪些必须 `.astro` 静态，哪些允许岛屿；默认 hydration 策略（`client:idle/visible` 优先）。citeturn4search2turn0search0  

组件落地
- [ ] 按 shadcn 官方 Astro 指南初始化，并把生成组件集中放到 `src/components/ui/`。citeturn6search0turn5search1  
- [ ] 统一封装交互：在 `.astro` 中引入 React 组件并固定 hydration；不要在业务页面随意写 `client:*`。citeturn4search2turn4search1  
- [ ] 选定基础组件清单（建议 10–20 个）并冻结 API：Button/Card/Table/Form Controls/Alert/Badge/Nav/Modal/Tabs。  

内容与可维护性
- [ ] 为现有 JSON/未来 Markdown 建 schema：优先采用 Astro Content Collections 强类型管理，减少维护者犯错概率。citeturn5search0turn5search7  
- [ ] 所有页面都遵守“数据驱动渲染”：内容不写死在组件里，为未来 CMS/0 代码编辑留空间。citeturn5search0turn5search4  

性能与质量门槛
- [ ] 每个页面统计岛屿数量；任何新增岛屿必须说明原因与替代方案（静态 HTML、`<details>`、轻量脚本等）。citeturn0search0turn4search2  
- [ ] 避免引入 MUI/AntD 作为默认组件体系；若必须使用，明确仅用于极少数页面，并按其文档进行导入优化（MUI 避免 barrel imports；AntD 确保 tree shaking）。citeturn1search7turn4search11turn4search4  

成本与风险控制（可选但建议写进规范）
- [ ] 禁止同时混用两套以上“设计语言/组件体系”；如有例外必须写 ADR（Architecture Decision Record）并说明退出策略。