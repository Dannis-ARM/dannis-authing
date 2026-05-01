# GitHub Secrets批量设置工具（使用gh cli）
# 使用方法：python deploy/set-secrets.py

import subprocess
import sys
import json
import getpass

import os

def run_cmd(cmd, shell=True, check=True, capture_output=True, text=True):
    """执行shell命令"""
    env = os.environ.copy()
    # 强制使用UTF-8编码，避免Windows下gbk解码错误
    env['PYTHONIOENCODING'] = 'utf-8'
    if os.name == 'nt':
        # Windows下设置控制台编码为UTF-8
        cmd = f'chcp 65001 > nul && {cmd}'
    
    try:
        return subprocess.run(
            cmd, 
            shell=shell, 
            check=check, 
            capture_output=capture_output, 
            text=text,
            encoding='utf-8',
            errors='replace',
            env=env
        )
    except subprocess.CalledProcessError as e:
        if capture_output and e.stderr:
            print(f"命令执行失败: {e.stderr}")
        raise

def check_gh_installed():
    """检查gh cli是否安装"""
    try:
        run_cmd("gh --version")
        return True
    except:
        print("❌ gh cli未安装，请先安装：")
        print("   官方安装指南：https://cli.github.com/manual/installation")
        print("   快速安装：")
        print("   - Linux: curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && echo \"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main\" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null && sudo apt update && sudo apt install gh -y")
        print("   - Windows: winget install GitHub.cli")
        print("   - Mac: brew install gh")
        return False

def check_gh_login():
    """检查是否已经登录GitHub"""
    try:
        run_cmd("gh auth status")
        return True
    except:
        print("⚠️  未登录GitHub，请先登录：")
        try:
            run_cmd("gh auth login --scopes \"admin:repo_secrets, write:packages\"", check=True, capture_output=False)
            return True
        except:
            print("❌ 登录失败")
            return False

def get_current_repo():
    """获取当前仓库信息"""
    result = run_cmd("gh repo view --json nameWithOwner -q .nameWithOwner")
    return result.stdout.strip()

def get_secret(secret_name, repo=None):
    """获取已存在的Secret值（仅验证是否存在，不获取实际值）"""
    try:
        cmd = f"gh secret list --json name"
        if repo:
            cmd += f" --repo {repo}"
        result = run_cmd(cmd)
        secrets = json.loads(result.stdout)
        return any(s['name'] == secret_name for s in secrets)
    except:
        return False

def set_secret(secret_name, secret_value, repo=None):
    """设置GitHub Secret"""
    cmd = f"gh secret set {secret_name}"
    if repo:
        cmd += f" --repo {repo}"
    
    proc = subprocess.Popen(
        cmd,
        shell=True,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    stdout, stderr = proc.communicate(input=secret_value)
    
    if proc.returncode == 0:
        return True, stdout
    else:
        return False, stderr

def main():
    print("=" * 50)
    print("GitHub Secrets 批量设置工具")
    print("=" * 50)
    print()

    # 检查gh cli
    if not check_gh_installed():
        sys.exit(1)
    
    # 检查登录状态
    if not check_gh_login():
        sys.exit(1)
    
    # 获取当前仓库
    repo = get_current_repo()
    print(f"✅ 当前仓库：{repo}")
    print()

    # 需要设置的Secrets列表
    SECRETS = [
        ("BWS_ACCESS_TOKEN", "BWS项目访问令牌"),
        ("BWS_PROJECT_ID", "BWS项目ID"),
        ("ALIYUN_SSH_PRIVATE_KEY", "阿里云服务器SSH私钥（完整内容）"),
        ("ALIYUN_SSH_HOST", "阿里云服务器IP地址/域名"),
        ("ALIYUN_SSH_USER", "阿里云服务器SSH用户名"),
    ]

    print("📋 需要设置的Secrets列表：")
    for key, desc in SECRETS:
        exists = get_secret(key, repo)
        status = "✅ 已存在" if exists else "⚠️  未设置"
        print(f"  - {key:25} : {desc} ({status})")
    print()

    # 确认是否继续
    confirm = input("是否开始设置Secrets？(y/n) ").strip().lower()
    if confirm not in ['y', 'yes', '是']:
        print("❌ 操作已取消")
        sys.exit(0)
    print()

    # 逐个设置Secrets
    for key, desc in SECRETS:
        print("-" * 50)
        print(f"正在设置 {key} ({desc})")
        
        exists = get_secret(key, repo)
        if exists:
            overwrite = input(f"{key} 已存在，是否覆盖？(y/n) ").strip().lower()
            if overwrite not in ['y', 'yes', '是']:
                print(f"⏭️  跳过设置 {key}")
                print()
                continue
        
        # 提示用户输入值
        if key == "ALIYUN_SSH_PRIVATE_KEY":
            file_path = input(f"请输入 {key} 的私钥文件路径（直接回车则手动输入）: ").strip()
            if file_path:
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        value = f.read().strip()
                    print(f"✅ 已从文件 {file_path} 读取私钥内容")
                except Exception as e:
                    print(f"❌ 读取文件失败: {e}")
                    value = getpass.getpass(f"请手动输入 {key} 的值（输入不会显示）: ")
            else:
                value = getpass.getpass(f"请手动输入 {key} 的值（输入不会显示）: ")
        elif "PRIVATE_KEY" in key:
            value = getpass.getpass(f"请输入 {key} 的值（输入不会显示）: ")
        else:
            value = input(f"请输入 {key} 的值: ").strip()
        
        if not value:
            print(f"⚠️  值为空，跳过设置 {key}")
            print()
            continue
        
        # 设置Secret
        success, err = set_secret(key, value, repo)
        if success:
            print(f"✅ {key} 设置成功")
        else:
            print(f"❌ {key} 设置失败: {err}")
            sys.exit(1)
        print()

    print("=" * 50)
    print("✅ 所有Secrets设置完成！")
    print("现在可以推送代码到main分支，触发自动构建镜像流程")
    print(f"镜像地址：ghcr.io/{repo}:latest")
    print("=" * 50)

if __name__ == "__main__":
    main()