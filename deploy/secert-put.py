import os
import subprocess
import logging
import json
import argparse
import sys

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(message)s'
)
logger = logging.getLogger(__name__)

def get_existing_secrets(project_id: str) -> dict:
    """获取云端已存在的 secrets，返回 {key: id} 映射"""
    try:
        logger.info(f"🔍 Fetching secrets for project: {project_id}")
        # 根据帮助文档，使用 -o json
        result = subprocess.run(
            ["bws", "secret", "list", project_id, "-o", "json"],
            capture_output=True, text=True, check=True
        )
        secrets_data = json.loads(result.stdout)
        return {s['key']: s['id'] for s in secrets_data}
    except subprocess.CalledProcessError as e:
        logger.error(f"❌ BWS CLI Error: {e.stderr.strip()}")
        return {}
    except Exception as e:
        logger.exception(f"🔥 Unexpected error: {e}")
        return {}

def delete_all_secrets(project_id: str, force: bool = False):
    """删除指定项目下的所有 secret"""
    existing_map = get_existing_secrets(project_id)
    if not existing_map:
        logger.info("ℹ️ No secrets found to delete.")
        return

    secret_ids = list(existing_map.values())

    if not force:
        confirm = input(f"⚠️  DANGER: Delete ALL {len(secret_ids)} secrets? (y/N): ")
        if confirm.lower() != 'y':
            logger.info("🚫 Operation cancelled.")
            return

    try:
        logger.info(f"🗑️  Deleting {len(secret_ids)} secrets in bulk...")
        # bws secret delete [SECRET_IDS]... 支持传入多个 ID
        subprocess.run(["bws", "secret", "delete"] + secret_ids, check=True, capture_output=True)
        logger.info("✅ Bulk deletion completed.")
    except subprocess.CalledProcessError as e:
        logger.error(f"❌ Delete failed: {e.stderr.strip()}")

def upload_env(env_path: str, project_id: str):
    """从 .env 上传至 BWS"""
    if not os.path.exists(env_path):
        logger.error(f"❌ File not found: {env_path}")
        return

    existing_map = get_existing_secrets(project_id)

    try:
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue

                key, value = line.split("=", 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")

                secret_id = existing_map.get(key)
                if secret_id:
                    logger.info(f"🔄 Updating: {key}")
                    cmd = ["bws", "secret", "edit", secret_id, "--value", value]
                else:
                    logger.info(f"✨ Creating: {key}")
                    cmd = ["bws", "secret", "create", key, value, project_id]

                subprocess.run(cmd, check=True, capture_output=True)
                logger.info(f"✅ Uploaded: {key}")
    except Exception as e:
        logger.exception(f"🔥 Upload error: {e}")

def main():
    parser = argparse.ArgumentParser(description="BWS CLI Tool")
    subparsers = parser.add_subparsers(dest="command", required=True)

    up_parser = subparsers.add_parser("upload")
    up_parser.add_argument("-f", "--file", required=True)
    up_parser.add_argument("-p", "--project", required=True)

    clear_parser = subparsers.add_parser("clear")
    clear_parser.add_argument("-p", "--project", required=True)
    clear_parser.add_argument("--force", action="store_true")

    args = parser.parse_args()

    if not os.getenv("BWS_ACCESS_TOKEN"):
        logger.error("🚫 BWS_ACCESS_TOKEN not found in environment.")
        sys.exit(1)

    if args.command == "upload":
        upload_env(args.file, args.project)
    elif args.command == "clear":
        delete_all_secrets(args.project, args.force)

if __name__ == "__main__":
    main()