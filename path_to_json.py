from collections import defaultdict
from datetime import datetime
import json
import os
from pathlib import Path

def get_file_timestamp(path):
    timestamp = os.path.getmtime(path)
    # return datetime.now(ZoneInfo('Asia/Tokyo')).strftime('%Y-%m-%d %H:%M:%S') 
    return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')

def update(d:dict, u:dict):
    """再帰dictをupdateするヤツ"""
    for k, v in u.items():
        if isinstance(v, dict):
            d[k] = update(d.get(k, {}), v)
        else:
            d[k] = v
    return d

def set_recursive_dir(dirs:list[str], value:dict):
    """再帰dictにvalue入れるヤツ"""
    structure=defaultdict(dict)
    _structure = structure
    for dir in dirs:
        _structure[dir] = _structure.get(dir, defaultdict(dict))
        _structure = _structure[dir]
    _structure.update(value)
    return structure

def top_dict(d:dict):
    """dictを上にもってくヤツ"""
    result={}
    queue = {}
    for k, v in d.items():
        if isinstance(v, dict):
            result[k] = top_dict(v)
        else:
            queue[k] = v
    result.update(queue)
    return result


directory_to_scan = "./public/md/"
output_json_file = "./public/file_path.json"

root = Path(directory_to_scan)
directory_structure = {}

md_files = sorted(root.glob('**/*.md'), key=lambda e: os.path.getmtime(e), reverse=True)

for file in md_files:
    parts = file.relative_to(root).parts[:-1]
    structure_dict=set_recursive_dir(parts, {file.stem:get_file_timestamp(file)})
    directory_structure=update(directory_structure, structure_dict)
directory_structure = top_dict(directory_structure)

with open('public/file_path.json', 'w') as f:
    json.dump(directory_structure, f, ensure_ascii=False, indent=4)
