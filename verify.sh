#!/bin/bash

echo "================================"
echo "Auto Translator 项目验证"
echo "================================"
echo ""

# 检查关键文件
echo "1. 检查关键文件..."
files=(
  "package.json"
  "tsconfig.json"
  "wxt.config.ts"
  "src/services/cache.ts"
  "src/services/openai.ts"
  "src/services/language-detector.ts"
  "src/services/translation-manager.ts"
  "src/types/index.ts"
  "src/utils/helpers.ts"
  "entrypoints/popup/App.vue"
  "entrypoints/options/App.vue"
  "entrypoints/background/index.ts"
  "entrypoints/content/index.ts"
)

all_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (缺失)"
    all_exist=false
  fi
done

# 检查构建输出
echo ""
echo "2. 检查构建输出..."
if [ -d ".output/chrome-mv3" ]; then
  echo "  ✓ 构建目录存在"
  if [ -f ".output/chrome-mv3/manifest.json" ]; then
    echo "  ✓ manifest.json 已生成"
  fi
  if [ -f ".output/chrome-mv3/background.js" ]; then
    echo "  ✓ background.js 已生成"
  fi
  if [ -f ".output/chrome-mv3/popup.html" ]; then
    echo "  ✓ popup.html 已生成"
  fi
  if [ -f ".output/chrome-mv3/options.html" ]; then
    echo "  ✓ options.html 已生成"
  fi
else
  echo "  ✗ 构建目录不存在"
  all_exist=false
fi

# 检查图标
echo ""
echo "3. 检查图标资源..."
for size in 16 48 128; do
  if [ -f "public/icon/${size}.png" ]; then
    echo "  ✓ icon/${size}.png"
  else
    echo "  ✗ icon/${size}.png (缺失)"
    all_exist=false
  fi
done

# 检查文档
echo ""
echo "4. 检查文档文件..."
docs=(
  "README.md"
  "INSTALL.md"
  "CONFIG_EXAMPLES.md"
  "PROJECT_SUMMARY.md"
)
for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "  ✓ $doc"
  else
    echo "  ✗ $doc (缺失)"
    all_exist=false
  fi
done

echo ""
echo "================================"
if [ "$all_exist" = true ]; then
  echo "✓ 验证通过！项目完整。"
  echo ""
  echo "快速开始："
  echo "  npm run dev          # 开发模式"
  echo "  npm run build        # 构建项目"
  echo "  npm run zip          # 打包插件"
else
  echo "✗ 验证失败！部分文件缺失。"
fi
echo "================================"
