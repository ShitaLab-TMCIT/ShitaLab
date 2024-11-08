from collections import defaultdict
from datetime import datetime
import json
import os
from pathlib import Path

def update(d: dict, u: dict):
    """再帰的に辞書を更新する関数"""
    for k, v in u.items():
        if isinstance(v, dict):
            d[k] = update(d.get(k, {}), v)
        else:
            d[k] = v
    return d

def set_recursive_dir(dirs: list[str], value: dict):
    """ディレクトリパスに沿って再帰的に辞書を作成する関数"""
    structure = defaultdict(dict)
    _structure = structure
    for dir in dirs:
        _structure = _structure.setdefault(dir, {})
    _structure.update(value)
    return structure

def top_dict(d: dict):
    """ネストされた辞書をフラットにする関数"""
    result = {}
    queue = {}
    for k, v in d.items():
        if isinstance(v, dict):
            result[k] = top_dict(v)
        else:
            queue[k] = v
    result.update(queue)
    return result

def get_nested_value(d, keys):
    """ネストされた辞書から値を取得する関数"""
    for key in keys:
        if isinstance(d, dict) and key in d:
            d = d[key]
        else:
            return None
    return d

directory_to_scan = "./public/md/"
output_json_file = "./public/file_path.json"

root = Path(directory_to_scan)
directory_structure = {}

# 既存の構造を読み込む
if os.path.exists(output_json_file):
    with open(output_json_file, 'r', encoding='utf-8') as f:
        existing_structure = json.load(f)
else:
    existing_structure = {}

# ソートをタイムスタンプとファイル名で行う
md_files = sorted(
    root.glob('**/*.md'),
    key=lambda e: (-os.path.getmtime(e), e.name)
)

for file in md_files:
    parts = file.relative_to(root).parts[:-1]  # ディレクトリ部分
    filename = file.stem  # 拡張子を除いたファイル名
    path_list = list(parts) + [filename]
    existing_value = get_nested_value(existing_structure, path_list)
    if existing_value is not None:
        timestamp = existing_value
    else:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    structure_dict = set_recursive_dir(parts, {filename: timestamp})
    directory_structure = update(directory_structure, structure_dict)

directory_structure = top_dict(directory_structure)

with open(output_json_file, 'w', encoding='utf-8') as f:
    json.dump(directory_structure, f, ensure_ascii=False, indent=4)
