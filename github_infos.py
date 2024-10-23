import requests
import json
import os
from dotenv import load_dotenv

# .envファイルのパス
env_path = "./.env"

# .envファイルが存在すれば読み込む
if os.path.exists(env_path):
    load_dotenv(env_path)
    print("Loaded .env")
else:
    print("Not found .env, load GitHub Secrets")

# GitHubトークンを環境変数から取得
token = os.environ.get("VITE_GITHUB_TOKEN")

print(token)

if token is None:
    raise ValueError("GitHubトークンが設定されていません。")

# 対象リポジトリのオーナーとリポジトリ名のリスト
repos = [
    {"owner": "hamuchan214", "repo": "IEEE802.11simulator"},
    {"owner": "ryoww", "repo": "ShitaLab"},
]

# 全リポジトリのデータを保存するリスト
all_repo_data = []

# 各リポジトリの情報を取得
for repo_info in repos:
    owner = repo_info["owner"]
    repo = repo_info["repo"]

    url = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {"Authorization": f"token {token}"}

    response = requests.get(url, headers=headers)
    repo_data = response.json()

    print(repo_data)

    # 必要なデータを抽出
    data = {
        "name": repo_data.get("name"),
        "description": repo_data.get("description"),
        "stargazers_count": repo_data.get("stargazers_count"),
        "forks_count": repo_data.get("forks_count"),
        "html_url": repo_data.get("html_url"),
        "owner": {
            "login": repo_data["owner"].get("login"),
            "avatar_url": repo_data["owner"].get("avatar_url")
        }
    }

    # リポジトリデータをリストに追加
    all_repo_data.append(data)

# リスト全体をJSONファイルに保存
with open("public/GitHubInfos.json", "w") as f:
    json.dump(all_repo_data, f, indent=4)

print("All repository data saved to GitHubInfos.json")
