実装されていないものもあるが、以下の記事を参考にすると良い

[Qiita](https://qiita.com/Qiita/items/c686397e4a0f4f11683d)

# 1. 見出し

---

書き方

```markdown:書き方.md
# これは H1 タグです

## これは H2 タグです

### これは H3 タグです
```

結果

# これは H1 タグです

## これは H2 タグです

### これは H3 タグです

# 2. コードの挿入

---

### Code blocks - コードブロック

書き方

````python
```python:test.py
print('Hello')
print('World')
```
````

結果

```python
print('Hello')
print('World')
```

### Code spans - コードスパン

書き方

```markdown
`puts 'ShitaLab'`と書くことでインライン表示することが可能
```

結果
`puts 'ShitaLab'`と書くことでインライン表示することが可能

# Format Text - テキストの装飾

---

### Emphasis / Strong Emphasis - 強調・強勢

書き方

```markdown
\ か * で囲むと HTML の em タグになります。Qiita では *italic type* になります。
\\ か ** で囲むと HTML の strong タグになります。Qiita では **太字** になります。
```

結果

\ か * で囲むと HTML の em タグになります。ShitaLab HPでは *italic type* になります。
\\ か ** で囲むと HTML の strong タグになります。ShitaLab HP では **太字** になります。
