# dannis-authing 企业服务订阅平台

[Github](https://github.com/Dannis-ARM?tab=repositories)

专业级多等级订阅服务平台，采用对冲基金风格设计，支持微信扫码登录，提供三级订阅服务，为不同规模企业提供全方位的服务支持。

## ✨ 功能特性

### 🎯 核心功能
- **三级订阅体系**：免费版、标准版、高级版，满足不同用户需求
- **微信扫码登录**：集成 Authing 身份认证，支持微信快速登录
- **权限控制系统**：不同等级用户只能访问对应权限的功能页面
- **订阅管理系统**：支持订阅升级、自动续费管理、支付历史查询
- **个人中心**：用户信息管理、安全设置、使用统计展示

### 🎨 设计特色
- 高端对冲基金风格设计，深蓝+金色专业配色体系
- 响应式布局，完美适配桌面端、平板、移动端
- 现代化UI设计，流畅的交互体验
- 专业级视觉层次，突出核心功能

### 🔧 技术特性
- 支持 SQLite / PostgreSQL 数据库无缝切换
- 模块化代码结构，易于扩展和维护
- TypeScript 全栈类型支持，类型安全
- Prisma ORM 数据库操作，易于迁移

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.x | React 全栈框架 |
| TypeScript | 5.x | 类型安全的 JavaScript |
| Tailwind CSS | 4.x | 原子化 CSS 框架 |
| Prisma | 7.x | 下一代 ORM 框架 |
| Authing | 最新 | 身份认证服务 |
| SQLite | 默认 | 轻量级数据库 |
| PostgreSQL | 可选 | 企业级数据库 |

## 📚 文档导航

| 文档 | 说明 |
|------|------|
| [安装部署教程](./docs/installation.md) | 详细的安装步骤、环境变量配置、数据库切换说明 |
| [Authing 配置教程](./docs/authing-config.md) | 微信扫码登录的完整配置流程、参数获取方法、常见问题排查 |
| [Authing 验证教程](./docs/authing-verify.md) | 配置完成后的验证步骤、成功标志、快速排查方法 |
| [部署上线教程](./docs/deployment.md) | 多种部署方式说明（Vercel/Docker/传统服务器）、生产环境注意事项、上线检查清单 |
| [开发指南](#🧑‍💻-开发指南) | 项目结构说明、常用命令、权限体系介绍 |

## 🚀 快速启动

### 1. 环境准备
- Node.js >= 18.x
- pnpm >= 8.x

### 2. 一键初始化（Windows）
```bash
git clone https://github.com/Dannis-ARM/dannis-authing.git
cd dannis-authing/deploy
./phase1.bat
```

### 3. 手动启动
```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填写 Authing 相关参数

# 3. 数据库初始化
pnpm prisma generate
pnpm prisma migrate dev --name init

# 4. 启动开发服务器
pnpm dev
```

启动成功后访问 http://localhost:3000

## 📁 目录结构

```
├── app/                    # Next.js App Router
│   ├── (auth)/             # 认证相关页面
│   │   ├── login/          # 微信扫码登录页
│   │   └── callback/       # 登录回调处理页
│   ├── (dashboard)/        # 用户后台
│   │   ├── free/           # 免费版用户后台
│   │   ├── standard/       # 标准版用户后台
│   │   ├── premium/        # 高级版用户后台
│   │   ├── profile/        # 个人中心
│   │   └── subscription/   # 订阅管理
│   ├── (marketing)/        # 营销页面
│   │   ├── pricing/        # 定价页面
│   │   └── page.tsx        # 首页
│   └── api/                # API 接口
│       ├── auth/           # 认证相关接口
│       ├── subscription/   # 订阅相关接口
│       └── webhook/        # Webhook 回调
├── components/             # React 组件
│   ├── ui/                 # 通用 UI 组件
│   ├── auth/               # 认证相关组件
│   ├── subscription/       # 订阅相关组件
│   └── layout/             # 布局组件
├── lib/                    # 工具库
│   ├── auth/               # 认证相关工具
│   ├── db/                 # 数据库操作
│   └── payment/            # 支付相关工具
├── types/                  # TypeScript 类型定义
├── prisma/                 # Prisma ORM 配置
│   ├── schema.prisma       # 数据库 Schema
│   └── migrations/         # 数据库迁移文件
├── deploy/                 # 部署相关脚本
│   └── phase1.bat          # Windows 初始化脚本
├── .env.example            # 环境变量模板
├── package.json            # 项目依赖配置
└── README.md               # 项目说明文档
```

## 🧑‍💻 开发指南

### 常用命令

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器
pnpm lint             # 代码检查
pnpm prisma studio    # 打开 Prisma 数据库可视化工具
pnpm prisma migrate dev # 创建并执行新的数据库迁移
pnpm prisma generate  # 重新生成 Prisma 客户端
```

### 用户等级说明

| 等级 | 权限范围 |
|------|----------|
| FREE | 仅可访问免费版后台 |
| STANDARD | 可访问免费版和标准版后台 |
| PREMIUM | 可访问所有等级后台功能 |

### 权限控制

权限控制通过 `middleware.ts` 实现，会自动验证用户权限，无权限访问会自动跳转到定价页面引导升级。

## 🚢 部署上线

### Vercel 部署（推荐）
1. Fork 项目到你的 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署，无需额外配置

### Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### 传统服务器部署
1. 构建项目：`pnpm build`
2. 安装生产依赖：`pnpm install --prod`
3. 启动服务：`pnpm start`
4. 配置 Nginx 反向代理到 3000 端口

## 📝 注意事项

1. 首次部署必须配置 Authing 相关参数，否则登录功能无法使用
2. 生产环境建议使用 PostgreSQL 数据库，性能和稳定性更好
3. 部署前请修改 `NEXTAUTH_SECRET` 为随机安全字符串
4. 支付功能需要额外配置微信支付或 Stripe 相关参数

## 🤝 技术支持

如有问题，请提交 Issue 或联系开发团队。

---

**dannis-authing - 让企业服务更简单高效**
