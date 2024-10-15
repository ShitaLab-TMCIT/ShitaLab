import os
import json
from datetime import datetime

def get_file_timestamp(path):
    timestamp = os.path.getmtime(path)
    return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')

def remove_extension(file_name):
    return os.path.splitext(file_name)[0]

def dir_to_dict(path):
    dir_dict = {}
    dirs = []
    files = []
    
    with os.scandir(path) as it:
        for entry in it:
            if entry.is_dir():
                # ディレクトリ名が 'assets' の場合はスキップ
                if entry.name != 'assets':
                    dirs.append(entry)
            else:
                # ファイルの拡張子が .md の場合のみリストに追加
                if entry.name.endswith('.md'):
                    files.append(entry) 

    for directory in sorted(dirs, key=lambda e: os.path.getmtime(e.path), reverse=True):
        dir_dict[directory.name] = dir_to_dict(directory.path)

    for file in sorted(files, key=lambda e: os.path.getmtime(e.path), reverse=True):
        file_name_without_extension = remove_extension(file.name)
        dir_dict[file_name_without_extension] = get_file_timestamp(file.path)

    return dir_dict

def save_structure_to_json(structure, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(structure, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    directory_to_scan = "./public/md/"
    output_json_file = "./public/file_path.json"
    
    directory_structure = dir_to_dict(directory_to_scan)
    
    save_structure_to_json(directory_structure, output_json_file)
    
    print(f"saved '{output_json_file}'")
