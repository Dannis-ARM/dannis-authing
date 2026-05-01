# 多阶段构建，减小最终镜像体积
# 阶段1：构建阶段（升级到Node 24 LTS，自带OpenSSL 3，不需要兼容包）
FROM node:24-alpine AS builder

# 安装pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 设置工作目录
WORKDIR /app

# 让Prisma生成适配OpenSSL 3的客户端，不需要依赖系统旧版OpenSSL
ENV PRISMA_OPENSSL_VERSION=3

# 复制依赖文件（利用缓存）
COPY package.json pnpm-lock.yaml ./

# 安装依赖，冻结版本
RUN pnpm install --frozen-lockfile

# 复制所有代码
COPY . .

# 生成Prisma客户端（适配OpenSSL 3）
RUN pnpm prisma generate

# 构建Next.js应用，启用standalone模式
RUN pnpm build

# 阶段2：运行阶段（最小化依赖 + 安全加固，使用Node 24 LTS，最小化root使用）
FROM node:24-alpine AS runner

# 设置 BWS 版本（完整版本号，匹配GitHub release标签）
ARG BWS_VERSION="2.0.0"

# ========== 仅此处使用root操作（系统级必要操作） ==========
# 安装最小依赖，不需要旧版OpenSSL兼容包，Node 24自带OpenSSL 3，Prisma已适配
RUN apk add --no-cache curl bash unzip

# 自动识别架构并安装 BWS（musl 专为 Alpine 优化，系统级安装必须root）
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

# 创建非root用户（必须root）
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs && \
    mkdir -p /app && \
    chown -R nextjs:nodejs /app

# 提前切换到非root用户，后续所有操作都使用普通用户权限，彻底避免root滥用
USER nextjs
# ==========================================================

# 设置工作目录（普通用户有权限）
WORKDIR /app

# 从构建阶段复制 standalone 输出（直接指定用户，不需要后续chown）
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

# 启动脚本（普通用户创建，无需root权限）
RUN cat > start.sh <<'EOF'
#!/bin/bash
set -eo pipefail

echo "=== 启动应用初始化 ==="

# 如果配置了 BWS，则自动拉取密钥
if [ -n "$BWS_ACCESS_TOKEN" ] && [ -n "$BWS_PROJECT_ID" ]; then
  echo "正在从 Bitwarden BWS 拉取环境变量..."
  # 直接导出环境变量到当前会话，不需要写入文件，彻底避免权限问题
  ENV_CONTENT=$(bws secret list -o env "$BWS_PROJECT_ID")
  eval "$ENV_CONTENT"
  echo "环境变量拉取完成：$(echo "$ENV_CONTENT" | wc -l) 个配置项"
else
  echo "未检测到 BWS 配置，使用本地环境变量"
fi

echo "启动 Next.js 服务..."
exec node server.js
EOF

RUN chmod +x start.sh

# 健康检查（轻量）
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# 启动命令（已在非root用户下运行）
CMD ["./start.sh"]
