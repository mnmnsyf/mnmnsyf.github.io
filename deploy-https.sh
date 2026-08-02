#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

# 初始化Git仓库
git init
git add -A
git commit -m 'deploy'

# 部署到GitHub Pages
# 请根据你的实际情况修改以下配置

# 部署到 https://mnmnsyf.github.io
git push -f https://github.com/mnmnsyf/mnmnsyf.github.io.git main:main

# 返回上一级目录
cd -

echo "部署完成，请访问 https://mnmnsyf.github.io/"