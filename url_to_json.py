import os
import json
import re

# リンクを抽出するための正規表現
link_pattern = re.compile(r'\[(.*?)\]\((https?://[^\s]+)\)')

# .mdファイルからリンクを抽出
def get_file_links(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # リンクをリスト形式で収集
    links = [match.group(2) for match in link_pattern.finditer(content)]
    return links

# ディレクトリ内の.mdファイルを再帰的に検索し、リンクを収集
def collect_links_from_md_files(directory):
    link_dict = {}
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):  # .mdファイルのみ対象
                file_path = os.path.join(root, file)
                links = get_file_links(file_path)
                
                # リンクがある場合のみ辞書に追加
                if links:
                    # 拡張子を除いた相対パスのファイル名を記録
                    relative_path = os.path.relpath(file_path, directory)
                    file_name = os.path.splitext(relative_path)[0]
                    link_dict[file_name] = links
    
    return link_dict

# JSONファイルとして保存
def save_links_to_json(directory, output_json="./public/md_links.json"):
    link_dict = collect_links_from_md_files(directory)
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(link_dict, f, ensure_ascii=False, indent=4)

# 使用例: 'your_directory_path'にディレクトリパスを指定
save_links_to_json('./public/md/')
