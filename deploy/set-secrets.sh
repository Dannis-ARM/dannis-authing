#!/bin/bash

# GitHub Secrets批量设置脚本（使用gh cli）
# 使用方法：./set-secrets.sh

set -e

echo "=================================================="
echo "GitHub Secrets 批量设置工具"
echo "=================================================="
echo ""

# 检查gh cli是否安装
if ! command -v gh &> /dev/null; then
    echo "❌ gh cli未安装，请先安装："
    echo "   官方安装指南：https://cli.github.com/manual/installation"
    echo "   快速安装（Linux）：curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && echo \"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main\" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null && sudo apt update && sudo apt install gh -y"
    exit 1
fi

# 检查是否已经登录GitHub
if ! gh auth status &> /dev/null; then
    echo "⚠️  未登录GitHub，请先登录："
    gh auth login --scopes "admin:repo_secrets, write:packages"
fi

# 获取当前仓库信息
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "✅ 当前仓库：$REPO"
echo ""

# 需要设置的Secrets列表
SECRETS=(
    "BWS_ACCESS_TOKEN:BWS项目访问令牌"
    "BWS_PROJECT_ID:BWS项目ID"
)

echo "📋 需要设置的Secrets列表："
for secret in "${SECRETS[@]}"; do
    key=${secret%%:*}
    desc=${secret#*:}
    echo "  - $key : $desc"
done
echo ""

# 确认是否继续
read -p "是否开始设置Secrets？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 操作已取消"
    exit 0
fi
echo ""

# 逐个设置Secrets
for secret in "${SECRETS[@]}"; do
    key=${secret%%:*}
    desc=${secret#*:}
    
    echo "--------------------------------------------------"
    echo "正在设置 $key ($desc)"
    
    # 提示用户输入值
    read -p "请输入 $key 的值: " value
    
    if [ -z "$value" ]; then
        echo "⚠️  值为空，跳过设置 $key"
        continue
    fi
    
    # 使用gh cli设置Secret
    if echo "$value" | gh secret set "$key" --repo "$REPO"; then
        echo "✅ $key 设置成功"
    else
        echo "❌ $key 设置失败，请检查权限"
        exit 1
    fi
    echo ""
done

echo "=================================================="
echo "✅ 所有Secrets设置完成！"
echo "现在可以推送代码到main分支，触发自动构建镜像流程"
echo "镜像地址：ghcr.io/$REPO:latest"
echo "=================================================="