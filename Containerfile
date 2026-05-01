# 多阶段构建，减小最终镜像体积
# 阶段1：构建阶段
FROM node:20-alpine AS builder

# 安装pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 设置工作目录
WORKDIR /app

# 复制依赖文件（利用缓存）
COPY package.json pnpm-lock.yaml ./

# 安装依赖，冻结版本
RUN pnpm install --frozen-lockfile

# 复制所有代码
COPY . .

# 生成Prisma客户端
RUN pnpm prisma generate

# 构建Next.js应用，启用standalone模式
RUN pnpm build

# 阶段2：运行阶段（最小化依赖 + 安全加固）
FROM node:20-alpine AS runner

# 设置 BWS 版本
ARG BWS_VERSION="2.0.0"

# 安装最小依赖（移除无用包）
RUN apk add --no-cache curl bash unzip

# 自动识别架构并安装 BWS（musl 专为 Alpine 优化）
RUN set -ex; \
    ARCH=$(uname -m); \
    if [ "$ARCH" = "x86_64" ]; then \
        BWS_ARCH="x86_64-unknown-linux-musl"; \
    elif [ "$ARCH" = "aarch64" ]; then \
        BWS_ARCH="aarch64-unknown-linux-musl"; \
    else \
        echo "Unsupported architecture: $ARCH"; exit 1; \
    fi; \
    BWS_URL="https://github.com/bitwarden/sdk-sm/releases/download/bws-v${BWS_VERSION}/bws-${BWS_ARCH}-${BWS_VERSION}.zip"; \
    curl -fSL --retry 3 --max-time 30 "$BWS_URL" -o /tmp/bws.zip && \
    unzip -o /tmp/bws.zip -d /usr/local/bin && \
    chmod +x /usr/local/bin/bws && \
    rm -f /tmp/bws.zip && \
    bws --version

# 安全：使用非 root 用户运行（强烈推荐生产环境）
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# 设置工作目录
WORKDIR /app

# 从构建阶段复制 standalone 输出（只复制运行必需文件）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 环境变量
ENV NODE_ENV=production
ENV PORT=3000
# 禁止 Next.js 收集遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 暴露端口
EXPOSE 3000

# 启动脚本：BWS 拉取环境变量 + 启动应用（root用户创建，有权限）
RUN cat > /app/start.sh <<'EOF'
#!/bin/bash
set -eo pipefail

echo "=== 启动应用初始化 ==="

# 如果配置了 BWS，则自动拉取密钥
if [ -n "$BWS_ACCESS_TOKEN" ] && [ -n "$BWS_PROJECT_ID" ]; then
  echo "正在从 Bitwarden BWS 拉取环境变量..."
  bws secret list -o env "$BWS_PROJECT_ID" > .env
  echo "环境变量拉取完成：$(wc -l < .env) 个配置项"
else
  echo "未检测到 BWS 配置，使用本地环境变量"
fi

echo "启动 Next.js 服务..."
exec node server.js
EOF

RUN chmod +x /app/start.sh && \
    chown nextjs:nodejs /app/start.sh

# 健康检查（轻量）
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# 切换非 root 用户（最后切换，保证前面的文件操作都有权限）
USER nextjs

# 启动命令
CMD ["/app/start.sh"]
