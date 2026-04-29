# dannis-authing

面向客户的付费订阅服务平台，采用现代对冲基金风格设计，支持多等级用户权限管理、微信扫码登录、订阅支付等核心功能。

## 🎯 项目概述
- 面向客户提供分级付费服务（免费版/普通版/高级版）
- 集成Authing实现微信扫码登录
- 支持多种存储方案切换（SQLite/PostgreSQL）
- 现代化高雅UI设计，对冲基金风格
- 完整的订阅支付流程

## 🛠️ 技术栈选型
| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 15.x | App Router 模式，服务端渲染 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 3.x | 原子化CSS，实现对冲基金风格UI |
| Prisma | 5.x | ORM层，天然支持SQLite/PostgreSQL切换 |
| Authing SDK | 最新 | 微信扫码登录集成 |
| Stripe / 微信支付 | 最新 | 订阅支付系统 |
| ShadCN UI | 最新 | 高品质UI组件库 |
| Zod | 3.x | 数据校验 |
| NextAuth.js | 最新 | 会话管理 |
| pnpm | 9.x | 包管理工具 |

## 📁 项目目录结构
```
.
├── app/                    # Next.js App Router
│   ├── (auth)/            # 认证相关路由
│   │   ├── login/         # 登录页（微信扫码）
│   │   └── callback/      # 登录回调
│   ├── (dashboard)/       # 用户后台路由
│   │   ├── layout.tsx     # 后台布局
│   │   ├── free/          # 免费用户专属页面
│   │   ├── standard/      # 普通用户专属页面
│   │   ├── premium/       # 高级用户专属页面
│   │   ├── profile/       # 用户个人中心
│   │   └── subscription/  # 订阅管理页
│   ├── (marketing)/       # 营销页面路由
│   │   ├── page.tsx       # 首页
│   │   ├── pricing/       # 定价页
│   │   └── features/      # 功能介绍页
│   ├── api/               # API路由
│   │   ├── auth/          # 认证相关API
│   │   ├── subscription/  # 订阅相关API
│   │   └── webhook/       # 支付回调Webhook
│   └── layout.tsx         # 全局布局
├── components/            # 通用组件
│   ├── ui/                # ShadCN UI组件
│   ├── auth/              # 认证相关组件
│   ├── subscription/      # 订阅相关组件
│   └── layout/            # 布局组件
├── lib/                   # 工具库
│   ├── auth/              # Authing认证封装
│   ├── db/                # Prisma数据库封装
│   ├── payment/           # 支付SDK封装
│   └── utils.ts           # 通用工具函数
├── prisma/                # 数据库层
│   ├── schema.prisma      # Prisma Schema（兼容SQLite/PostgreSQL）
│   └── migrations/        # 数据库迁移文件
├── public/                # 静态资源
├── styles/                # 全局样式
│   └── globals.css        # Tailwind全局样式+自定义主题
├── types/                 # TypeScript类型定义
├── .env.example           # 环境变量示例
└── package.json
```

## 🔌 核心功能模块
### 1. 用户认证模块
- 微信扫码登录（Authing集成）
- 会话管理与权限校验
- 自动用户等级识别与路由拦截
- 多端登录状态同步

### 2. 用户等级权限体系
| 等级 | 权限 | 路由前缀 |
|------|------|----------|
| 免费版 | 基础功能访问 | /dashboard/free |
| 普通版 | 基础功能+进阶功能 | /dashboard/standard |
| 高级版 | 全部功能+专属服务 | /dashboard/premium |
- 路由中间件自动权限校验
- 未授权用户自动跳转至定价页
- 升级引导弹窗

### 3. 订阅支付模块
- 定价展示页（三档套餐对比）
- 多种支付方式支持（微信支付/支付宝/Stripe）
- 订阅生命周期管理（开通/续费/升级/取消）
- 支付状态Webhook回调处理
- 订阅到期提醒

### 4. 数据库抽象层
- 使用Prisma作为ORM，无缝支持SQLite和PostgreSQL切换
- 环境变量配置数据库类型与连接地址
- 统一Repository模式封装数据操作
- 迁移脚本兼容两种数据库

## 🗄️ 数据库设计（兼容多存储）
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // 可切换为 "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String    @id @default(uuid())
  authingId    String    @unique
  openid       String?   @unique
  nickname     String?
  avatar       String?
  email        String?
  phone        String?
  tier         UserTier  @default(FREE)
  subscription Subscription?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

enum UserTier {
  FREE
  STANDARD
  PREMIUM
}

model Subscription {
  id           String     @id @default(uuid())
  userId       String     @unique
  plan         UserTier
  status       SubscriptionStatus
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAt     DateTime?
  paymentMethod String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  user         User       @relation(fields: [userId], references: [id])
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  UNPAID
}
```

## 🎨 UI/UX设计规范（对冲基金风格）
### 配色方案
- 主色调：深蓝系 (#0F172A → 深邃专业)
- 辅助色：金/铜色 (#CA8A04 → 高端质感)
- 中性色：高级灰阶 (#F8FAFC, #E2E8F0, #64748B, #1E293B)
- 强调色：低饱和蓝 (#1E40AF → 信任专业)
- 无鲜艳跳脱色彩，整体低饱和度、高对比度

### 排版
- 字体：Inter + 思源黑体
- 字重：轻量正文，粗体标题
- 字间距：宽松舒适，提升高级感
- 排版层级清晰，留白充足

### 交互
- 极简动效，低延迟反馈
- 无冗余动画，专业稳重
- 卡片式布局，阴影柔和有层次
- 圆角适度，兼具现代感与专业感

## 🚀 开发阶段里程碑
### Phase 1: 项目初始化 (1-2天)
- [ ] Next.js + TypeScript + Tailwind 项目搭建
- [ ] Prisma ORM 配置与多数据库兼容设置
- [ ] ShadCN UI 组件库集成
- [ ] 对冲基金风格主题配置
- [ ] 基础目录结构搭建
- [ ] 环境变量配置模板

### Phase 2: 认证体系集成 (2-3天)
- [ ] Authing 应用创建与配置
- [ ] 微信扫码登录功能实现
- [ ] 登录回调与用户信息同步
- [ ] 会话管理与Auth中间件实现
- [ ] 路由权限拦截功能
- [ ] 用户等级识别与路由分发

### Phase 3: 数据库与用户体系 (1-2天)
- [ ] Prisma Schema 设计与实现
- [ ] 多数据库迁移脚本测试（SQLite/PostgreSQL）
- [ ] 用户CRUD操作封装
- [ ] 订阅数据模型实现

### Phase 4: 页面与功能实现 (3-4天)
- [ ] 营销页面（首页/定价页/功能页）实现
- [ ] 三档用户专属Dummy页面实现
- [ ] 用户个人中心页面
- [ ] 订阅管理页面
- [ ] 支付流程实现
- [ ] Webhook回调处理

### Phase 5: 测试与优化 (2-3天)
- [ ] 全流程功能测试
- [ ] 数据库切换测试
- [ ] UI细节优化
- [ ] 性能优化
- [ ] 部署配置

## 🔧 配置说明
### 数据库切换方法
1. 修改 `prisma/schema.prisma` 中的 `datasource db.provider` 为 `sqlite` 或 `postgresql`
2. 修改 `.env` 中的 `DATABASE_URL` 为对应数据库连接地址
3. 执行 `npx prisma migrate dev` 生成对应数据库迁移文件

### 环境变量配置
```env
# 应用配置
NEXT_PUBLIC_APP_URL=
NEXTAUTH_SECRET=

# Authing配置
AUTHING_APP_ID=
AUTHING_APP_SECRET=
AUTHING_DOMAIN=

# 数据库配置
DATABASE_URL=

# 支付配置
WECHAT_PAY_MCH_ID=
WECHAT_PAY_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## 📦 开发命令
使用pnpm作为包管理工具：
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 数据库迁移
pnpm prisma migrate dev

# 打开Prisma Studio
pnpm prisma studio

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 运行测试
pnpm test
```

## 🔄 GitHub CI/CD 流程设计
基于GitHub Actions实现全自动化CI/CD流水线，包含以下工作流：

### 1. 主工作流 (main.yml)
**触发条件**: 推送到main分支 / PR合并到main分支
**执行步骤**:
```yaml
1. 代码检出
2. 配置Node.js环境 + pnpm缓存
3. 安装依赖 (pnpm install --frozen-lockfile)
4. 代码质量检查 (pnpm lint)
5. TypeScript类型检查 (pnpm type-check)
6. 自动化测试 (pnpm test)
7. 构建生产版本 (pnpm build)
8. 数据库迁移执行 (自动应用到生产数据库)
9. 自动部署到Vercel / 服务器
10. 部署成功通知 (企业微信/邮件)
```

### 2. PR检查工作流 (pr-check.yml)
**触发条件**: 新建PR / PR更新
**执行步骤**:
```yaml
1. 代码检出
2. 环境配置 + 依赖安装
3. 代码检查 + 类型检查 + 单元测试
4. 构建验证
5. 预览环境自动部署
6. 生成测试报告 + 代码覆盖率报告
7. PR评论反馈检查结果
```

### 3. 安全扫描工作流 (security.yml)
**触发条件**: 定时每日执行 / 依赖变更PR
**执行步骤**:
```yaml
1. 依赖漏洞扫描 (pnpm audit)
2. 代码安全扫描 (CodeQL)
3. 敏感信息泄露检查
4. 镜像漏洞扫描 (Docker构建时)
5. 安全告警通知
```

### 4. 部署工作流支持
- **Vercel自动部署**: 直接关联GitHub仓库，main分支推送自动部署，PR自动生成预览环境
- **Docker部署**: 自动构建Docker镜像，推送到容器镜像仓库，SSH到服务器执行部署脚本
- **灰度发布**: 支持按流量比例灰度发布新版本
- **回滚机制**: 一键回滚到上一个稳定版本

### 必备GitHub Secrets配置
```
# 部署配置
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID

# 服务器配置
SSH_HOST
SSH_USER
SSH_KEY
DOCKER_REGISTRY_TOKEN

# 生产环境变量
PROD_DATABASE_URL
PROD_AUTHING_APP_SECRET
PROD_WECHAT_PAY_SECRET
PROD_STRIPE_SECRET_KEY
```

## 📦 部署方案
- Vercel / Docker 部署
- 数据库支持SQLite（轻量部署）或PostgreSQL（生产环境）
- 支持CDN加速静态资源
- 自动化CI/CD流程

## 📎 相关文档
- [风险点与错误规避指南](./RISKS.md)：包含Agent开发常见坑点、上线Checklist和优化建议
