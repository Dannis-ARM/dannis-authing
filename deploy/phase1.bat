@echo off
echo ==============================================
echo Phase 1: 项目初始化脚本
echo ==============================================
echo.

echo 1. 初始化 Next.js + TypeScript + Tailwind 项目
echo ----------------------------------------------
pnpm create next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*" --experimental-app --yes
echo.

echo 2. 安装 Prisma ORM
echo ----------------------------------------------
pnpm add prisma --save-dev
pnpm add @prisma/client
echo.

echo 3. 初始化 Prisma 配置
echo ----------------------------------------------
pnpm prisma init
echo.

echo 4. 初始化 ShadCN UI 组件库
echo ----------------------------------------------
pnpm dlx shadcn@latest init
echo.

echo 5. 创建基础目录结构
echo ----------------------------------------------
mkdir components components\ui components\auth components\subscription components\layout lib lib\auth lib\db lib\payment types app\(auth) app\(auth)\login app\(auth)\callback app\(dashboard) app\(dashboard)\free app\(dashboard)\standard app\(dashboard)\premium app\(dashboard)\profile app\(dashboard)\subscription app\(marketing) app\(marketing)\pricing app\(marketing)\features app\api app\api\auth app\api\subscription app\api\webhook
echo.

echo 6. 复制环境变量模板
echo ----------------------------------------------
copy .env.example .env
echo.

echo ==============================================
echo Phase 1 初始化完成!
echo 下一步请配置 .env 文件中的相关参数
echo ==============================================
pause