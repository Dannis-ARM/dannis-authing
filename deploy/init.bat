@echo off
echo ==============================================
echo FinSuite 企业服务平台 - 项目初始化脚本
echo ==============================================
echo.

echo 1. 安装项目依赖
echo ----------------------------------------------
pnpm install
echo.

echo 2. 配置数据库
echo ----------------------------------------------
echo 默认使用 SQLite，如需切换到 PostgreSQL 请修改 prisma/schema.prisma
pnpm prisma generate
pnpm prisma migrate dev --name init
echo.

echo 3. 复制环境变量配置
echo ----------------------------------------------
if not exist .env (
  copy .env.example .env
  echo 已创建 .env 文件，请配置相关参数
) else (
  echo .env 文件已存在，跳过复制
)
echo.

echo 4. 启动开发服务器
echo ----------------------------------------------
echo 初始化完成，执行 pnpm dev 启动开发服务器
echo 访问 http://localhost:3000 查看项目
echo.

echo ==============================================
echo 初始化完成!
echo 请先配置 .env 文件中的 Authing、数据库等参数
echo ==============================================
pause