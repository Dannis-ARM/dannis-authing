# 镜像构建指南（Podman + GitHub CI/CD + BWS）

## 📋 前期准备
1. GitHub账号，项目已经推送到GitHub
2. BWS（Bitwarden Secrets Manager）账号和项目创建完成
3. GitHub CLI (gh) 已安装（用于批量设置Secrets）

---

## 🔧 步骤1：配置GitHub Secrets
### 方法1：使用脚本自动设置（推荐）
```bash
# 给脚本添加执行权限
chmod +x deploy/set-secrets.sh

# 运行脚本，按照提示输入即可
./deploy/set-secrets.sh
```

脚本会自动：
- 检查gh cli是否安装
- 引导你登录GitHub（如果未登录）
- 自动识别当前仓库
- 交互式提示你输入BWS相关的秘钥
- 自动设置到GitHub Secrets

### 方法2：手动设置
在GitHub项目页面 → Settings → Secrets and variables → Actions → New repository secret，添加以下Secrets：

| 秘钥名称 | 说明 |
|---------|------|
| `BWS_ACCESS_TOKEN` | BWS项目访问令牌 |
| `BWS_PROJECT_ID` | BWS项目ID |

### 1.2 开启GitHub Container Registry权限
默认情况下GitHub Actions自动拥有推送权限，如果遇到权限问题：
1. 进入你的GitHub个人Settings → Packages → Package settings
2. 找到你的项目包，给你的账号分配写入权限

---

## 🚀 步骤2：触发构建
将代码推送到main分支，GitHub Actions会自动触发构建流程：
```bash
git add .
git commit -m "feat: 初始化构建配置"
git push origin main
```

### 查看构建状态
在GitHub项目页面 → Actions → 找到「构建并推送镜像到GitHub Container Registry」工作流，查看构建进度。

构建成功后，会输出镜像地址：`ghcr.io/你的用户名/dannis-authing:latest`

---

## 📝 本地开发测试
### 本地构建镜像
```bash
podman build -t dannis-authing:test .
```

### 本地启动测试
```bash
podman run -p 3000:3000 -e BWS_ACCESS_TOKEN=你的BWS令牌 -e BWS_PROJECT_ID=你的BWS项目ID dannis-authing:test
```

访问 http://localhost:3000 验证功能正常。

### 健康检查
```bash
curl http://localhost:3000/api/health
# 正常返回：{"status":"ok","timestamp":"...","service":"dannis-authing"}
```

---

## 🔍 常见问题排查
### 1. 构建失败，提示镜像推送权限不足
- 检查GitHub Secrets中的`GITHUB_TOKEN`是否有packages:write权限
- 检查你的GitHub账号是否有权限向该仓库的Packages推送镜像
- 手动登录测试：`echo "你的GitHub Token" | podman login ghcr.io -u 你的GitHub用户名 --password-stdin`

### 2. 镜像启动失败，提示环境变量缺失
- 检查BWS_ACCESS_TOKEN和BWS_PROJECT_ID是否正确
- 检查BWS项目中是否配置了所有应用需要的环境变量
- 查看容器日志看BWS拉取配置是否报错

### 3. 构建速度慢
- 已配置GitHub Actions缓存，第二次及以后构建会自动复用缓存层，速度会快很多
- 本地构建也可以通过复用缓存加快速度

---

## 🔐 安全建议
1. 不要在代码中硬编码任何敏感信息，所有配置都存储在BWS中
2. BWS访问令牌只分配最小必要权限
3. GitHub Token只分配必要的权限，不要过度授权
4. 镜像仓库设置为私有，避免敏感信息泄露
