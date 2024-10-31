import requests
from bs4 import BeautifulSoup
import json

def get_metadata(url):
    """
    URLからタイトル、説明、キーワード、代表画像URL、faviconのURLを取得する関数
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        title = soup.title.string if soup.title else "No Title"
        description = ""
        keywords = ""
        image_url = ""
        favicon_url = ""
        
        # メタデータの取得
        for meta in soup.find_all("meta"):
            if meta.get("name") == "description":
                description = meta.get("content", "")
            elif meta.get("name") == "keywords":
                keywords = meta.get("content", "")
            elif meta.get("property") == "og:image":
                image_url = meta.get("content", "")
        
        # faviconの取得（優先順位: icon, shortcut icon）
        icon_link = soup.find("link", rel="icon") or soup.find("link", rel="shortcut icon")
        if icon_link:
            favicon_url = icon_link.get("href", "")
        
        # URLを絶対パスに変換
        if image_url and not image_url.startswith("http"):
            image_url = requests.compat.urljoin(url, image_url)
        
        if favicon_url and not favicon_url.startswith("http"):
            favicon_url = requests.compat.urljoin(url, favicon_url)
        
        # faviconがまだ見つからない場合、デフォルトでfavicon.icoを使用
        if not favicon_url:
            favicon_url = requests.compat.urljoin(url, "/favicon.ico")
        
        # imageが取得できなかった場合、faviconを代わりに設定
        if not image_url:
            image_url = favicon_url

        return {
            "title": title,
            "description": description,
            "keywords": keywords,
            "image": image_url,
            "favicon": favicon_url
        }
    except requests.RequestException as e:
        print(f"Failed to retrieve metadata for URL {url}: {e}")
        return {"title": "Error", "description": "Error", "keywords": "Error", "image": "Error", "favicon": "Error"}

def load_metadata_from_json(input_path, output_path):
    """
    指定されたファイルパスからJSONデータを読み込み、各URLのメタデータを取得して指定された出力パスに保存する関数
    """
    # 入力JSONを読み込む
    with open(input_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # メタデータの取得
    output = {}
    for category, urls in data.items():
        output[category] = {}
        for url in urls:
            metadata = get_metadata(url)
            output[category][url] = metadata  # URLをキーとして保存
    
    # 取得したメタデータを出力JSONに保存
    with open(output_path, 'w', encoding='utf-8') as outfile:
        json.dump(output, outfile, ensure_ascii=False, indent=4)
    
    print(f"メタデータを{output_path}に保存しました。")

# 入力ファイルパスと出力ファイルパスを指定
input_filepath = "./public/md_links.json"  # 入力ファイルのパス
output_filepath = "./public/metadata.json"  # 出力ファイルのパス

# メタデータの取得と出力
load_metadata_from_json(input_filepath, output_filepath)
