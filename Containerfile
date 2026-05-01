# 多阶段构建，减小最终镜像体积
# 阶段1：构建阶段
FROM node:20-alpine AS builder

# 安装pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖，冻结版本
RUN pnpm install --frozen-lockfile

# 复制所有代码
COPY . .

# 构建Next.js应用，启用standalone模式
RUN pnpm build

# 阶段2：运行阶段
FROM node:20-alpine AS runner

# 安装BWS CLI用于秘钥拉取，以及必要的依赖
# 添加libc6-compat兼容glibc动态链接，解决bws在alpine下运行127错误
RUN apk add --no-cache curl bash unzip libc6-compat && \
    BWS_VERSION="2.0.0" && \
    BWS_URL="https://github.com/bitwarden/sdk-sm/releases/download/bws-v${BWS_VERSION}/bws-x86_64-unknown-linux-gnu-${BWS_VERSION}.zip" && \
    curl -fSL "$BWS_URL" -o /tmp/bws.zip && \
    unzip -o /tmp/bws.zip -d /tmp && \
    mv -f /tmp/bws /usr/local/bin/ && \
    chmod +x /usr/local/bin/bws && \
    rm -f /tmp/bws.zip && \
    # 验证安装
    bws --version

# 设置工作目录
WORKDIR /app

# 从构建阶段复制standalone输出
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 环境变量设置
ENV NODE_ENV production
ENV PORT 3000

# 暴露端口
EXPOSE 3000

# 启动脚本：先通过BWS拉取环境变量，再启动应用
RUN echo '#!/bin/bash' > /app/start.sh && \
    echo 'if [ -n "$BWS_ACCESS_TOKEN" ] && [ -n "$BWS_PROJECT_ID" ]; then' >> /app/start.sh && \
    echo '  echo "正在从BWS拉取环境变量..."' >> /app/start.sh && \
    echo '  # 正确用法：直接输出env格式，project_id作为参数传入' >> /app/start.sh && \
    echo '  bws secret list -o env "$BWS_PROJECT_ID" > .env' >> /app/start.sh && \
    echo '  echo "环境变量拉取完成，共$(wc -l < .env)个配置项"' >> /app/start.sh && \
    echo 'fi' >> /app/start.sh && \
    echo 'node server.js' >> /app/start.sh && \
    chmod +x /app/start.sh

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# 启动命令
CMD ["/app/start.sh"]