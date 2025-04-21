ターミナルから実行

デフォルトディストリビューションを起動

```powershell
wsl
```

インストール済みディストリビューション一覧

```powershell
wsl -l -v
```

インストール可能なディストリビューションの一覧を表示する

```powershell
wsl --list --online
```

ディストリビューションをインストール

```powershell
wsl --install -d Debian
```

インストール済みのディストリビューションをアンインストール

```powershell
wsl --unregister Debian
```

インストール済みのディストリビューションを起動

```powershell
wsl -d Debian
```

起動中のすべてのディストリビューションを終了

```powershell
wsl --shutdown
```

起動中のディストリビューションの停止

```powershell
wsl -t Debian
```

インストールできなかったら以下を試す

```bash
wsl --install --web-download Debian
```