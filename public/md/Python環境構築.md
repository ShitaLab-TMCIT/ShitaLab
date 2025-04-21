# WSL内で実行

pyenvを用いてPythonのバージョン管理を行う．

Linuxディストリビューション内でビルドが行われてパスを通してくれるため安全に使える．

```shell:update
sudo apt update
```

必要なパッケージをインストール

```shell
sudo apt install build-essential libffi-dev libssl-dev zlib1g-dev liblzma-dev libbz2-dev \
  libreadline-dev libsqlite3-dev libopencv-dev tk-dev git
```

Git Hubよりクローン(事前にGitのインストールの必要がある)

```shell
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

`.bashrc`にpyenvの情報を追記

```shell
echo '' >> ~/.bashrc
```

```shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
```

```shell
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
```

```shell
echo 'eval "$(pyenv init --path)"' >> ~/.bashrc
```

```shell
source ~/.bashrc
```

もろもろ確認&インストール


```shell
pyenv -v
```

```shell
pyenv install 3.11
```

```shell
pyenv global 3.11
```

```shell
pyenv versions
```

