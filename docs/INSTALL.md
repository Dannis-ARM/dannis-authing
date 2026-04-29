# 安装部署教程

本文档详细介绍 FinSuite 平台的安装部署步骤。

## 🚀 快速开始

### 方式一：使用初始化脚本（推荐 Windows 用户）

1. 克隆项目到本地
```bash
git clone https://github.com/Dannis-ARM/dannis-authing.git
cd dannis-authing
```

2. 运行初始化脚本
```bash
cd deploy
./phase1.bat
```

3. 配置环境变量
   - 打开项目根目录下的 `.env` 文件
   - 配置 Authing 相关参数（参考 [AUTHING_CONFIG.md](./AUTHING_CONFIG.md)）
   - 配置数据库连接（默认 SQLite 无需修改）

4. 启动开发服务器
```bash
pnpm dev
```

5. 访问项目
   - 打开浏览器访问 http://localhost:3000

### 方式二：手动部署

1. 安装依赖
```bash
pnpm install
```

2. 配置数据库
```bash
# 生成 Prisma 客户端
pnpm prisma generate

# 执行数据库迁移
pnpm prisma migrate dev --name init
```

3. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，配置相关参数
```

4. 启动开发服务器
```bash
pnpm dev
```

## ⚙️ 环境变量配置说明

复制 `.env.example` 到 `.env`，配置以下参数：

```env
# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000  # 应用访问地址
NEXTAUTH_SECRET=your-secret-key-here       # NextAuth 加密密钥（可使用 openssl rand -hex 32 生成）

# Authing 配置（必需）
AUTHING_APP_ID=your-authing-app-id         # Authing 应用 ID
AUTHING_APP_SECRET=your-authing-app-secret # Authing 应用密钥
AUTHING_DOMAIN=your-authing-domain.authing.cn # Authing 应用域名

# 数据库配置
DATABASE_URL="file:./dev.db"               # 默认 SQLite，PostgreSQL 格式: postgresql://user:pass@host:port/db

# 支付配置（可选）
WECHAT_PAY_MCH_ID=your-wechat-pay-mch-id   # 微信支付商户号
WECHAT_PAY_SECRET=your-wechat-pay-secret   # 微信支付密钥
STRIPE_SECRET_KEY=your-stripe-secret-key   # Stripe 密钥
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret # Stripe Webhook 密钥
```

## 🗄️ 数据库切换配置

### 默认使用 SQLite（无需额外配置）
默认配置使用 SQLite，适合开发环境和小型应用，无需安装额外数据库服务。

### 切换到 PostgreSQL
1. 修改 `prisma/schema.prisma`：
```prisma
datasource db {
  provider = "postgresql" # 改为 postgresql
  url      = env("DATABASE_URL")
}
```

2. 修改 `.env` 中的 DATABASE_URL：
```env
DATABASE_URL="postgresql://用户名:密码@localhost:5432/数据库名?schema=public"
```

3. 重新执行迁移：
```bash
pnpm prisma migrate dev --name init