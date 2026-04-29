# 部署上线教程

本文档详细介绍 FinSuite 平台在不同环境下的部署方法。

## 🚢 部署方式

### 方式一：Vercel 部署（推荐）
Vercel 是 Next.js 官方推荐的部署平台，支持一键部署，自动适配 Next.js 项目。

#### 部署步骤：
1. Fork 项目到你的 GitHub 账号
2. 访问 Vercel 控制台 https://vercel.com/
3. 点击 "Add New Project"，选择你 Fork 的仓库
4. 配置环境变量：
   - 复制 `.env.example` 中的所有参数到 Vercel 环境变量配置页
   - 修改 `NEXT_PUBLIC_APP_URL` 为你的 Vercel 分配的域名或自定义域名
5. 点击 "Deploy"，等待部署完成
6. 部署完成后，在 Vercel 后台配置自定义域名（可选）

#### 优点：
- 自动构建和部署，推送代码自动更新
- 全球 CDN 加速，访问速度快
- 免费 SSL 证书，自动续期
- 支持自动扩容，无需担心服务器压力

---

### 方式二：Docker 部署
适合需要在自有服务器上部署的场景。

#### Dockerfile 示例：
```dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 构建项目
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm
RUN pnpm build

# 生产镜像
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### 部署步骤：
1. 在项目根目录创建 `Dockerfile`，复制上面的内容
2. 构建 Docker 镜像：
```bash
docker build -t finsuite:latest .
```
3. 运行容器：
```bash
docker run -d -p 3000:3000 --env-file .env finsuite:latest
```
4. 配置 Nginx 反向代理（可选）

---

### 方式三：传统服务器部署
适合在 Linux 服务器上直接部署。

#### 系统要求：
- Node.js >= 18.x
- pnpm >= 8.x
- （可选）PostgreSQL >= 14.x

#### 部署步骤：
1. 克隆项目到服务器：
```bash
git clone https://github.com/Dannis-ARM/dannis-authing.git
cd dannis-authing
```

2. 安装依赖：
```bash
pnpm install --prod
```

3. 配置环境变量：
```bash
cp .env.example .env
# 编辑 .env 文件，配置生产环境参数
```

4. 构建项目：
```bash
pnpm build
```

5. 启动服务：
```bash
# 直接启动（不推荐生产环境）
pnpm start

# 使用 pm2 管理进程（推荐）
npm install -g pm2
pm2 start "pnpm start" --name finsuite
```

6. 配置 Nginx 反向代理：
```nginx
server {
    listen 80;
    server_name 你的域名;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. 配置 SSL 证书（推荐）：
```bash
# 使用 Let's Encrypt 免费证书
certbot --nginx -d 你的域名
```

---

## 生产环境注意事项

### 1. 安全配置
- 修改 `NEXTAUTH_SECRET` 为随机安全字符串（使用 `openssl rand -hex 32` 生成）
- 确保 `.env` 文件权限设置为 600，避免泄露敏感信息
- 数据库使用强密码，不要使用默认密码
- 生产环境关闭 Prisma 的 query 日志

### 2. 数据库配置
- 生产环境推荐使用 PostgreSQL 数据库，性能和稳定性更好
- 配置数据库定期备份，避免数据丢失
- 数据库不要对外网暴露，只允许服务器内部访问

### 3. 性能优化
- 开启 gzip 压缩（Nginx 或 Vercel 自动支持）
- 配置 CDN 加速静态资源
- 开启浏览器缓存策略
- 定期清理日志文件，避免磁盘占满

### 4. 监控告警
- 配置服务监控，异常时自动告警
- 监控服务器 CPU、内存、磁盘使用情况
- 监控数据库连接数和查询性能
- 配置访问日志和错误日志，便于排查问题

---

## 上线检查清单

✅ 所有环境变量配置正确，生产环境参数已更新
✅ Authing 后台已配置生产环境回调地址和 CORS
✅ 微信支付/Stripe 等支付参数已配置（如使用支付功能）
✅ 数据库迁移已执行，表结构正确
✅ SSL 证书已配置，支持 HTTPS 访问
✅ 静态资源已配置 CDN 加速
✅ 监控告警已配置
✅ 已进行功能测试，所有功能正常运行
✅ 已备份数据库和配置文件