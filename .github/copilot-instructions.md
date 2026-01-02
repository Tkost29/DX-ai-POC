# 社内DX AI推進PoC プロトタイプ

## プロジェクト概要
社内情報（Skyなう/ SKYWIZ/ 社内ブログ）を横断的に要約し、ユーザーごとに優先表示とアクション示唆を行うプロトタイプ

## 技術スタック
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## 主要機能
1. 情報取り込み（擬似データ）
2. ユーザー別優先表示
3. AI要約生成
4. ユーザ別ビュー（部署・関心タグでフィルタ）
5. アクション候補表示

## ルーティング構成
- /dashboard: 情報統合
- /priority: ユーザ別優先
- /summary: AI要約
- /actions: アクション示唆
