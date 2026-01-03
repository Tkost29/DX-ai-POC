# 社内DX AI推進PoC プロトタイプ

社内情報（Skyなう/ SKYWIZ/ 社内ブログ）を横断的に要約し、ユーザーごとに優先表示とアクション示唆を行うプロトタイプアプリケーション

## 🎯 主要機能

1. **情報統合ダッシュボード**: 部署・関心タグに基づいて優先度順にソート、理由も表示。AIが「要対応/共有推奨/参考情報」を提案（最終判断は人。PoCの簡易ルール）
2. **AI要約生成**: 全体要約（5〜7行）+ 重要トピック箇条書き

## 🖥️ 画面構成

- **`/dashboard`** - 情報統合ダッシュボード（優先度順・理由表示・アクション提案）
- **`/summary`** - 投稿を一覧表示

右上の「設定」ボタンから部署と関心タグを変更可能

## 🛠️ 技術スタック

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## 📁 プロジェクト構造

```
DX/
├── app/
│   ├── _data/          # ダミーデータ
│   │   ├── types.ts
│   │   ├── mockData.ts
│   │   └── mockSummary.ts
│   ├── dashboard/      # 情報統合（優先表示・アクション提案統合）
│   ├── summary/        # AI要約画面
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/         # 再利用可能なコンポーネント
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── PostCard.tsx
│   ├── SettingsModal.tsx
│   └── Modal.tsx
├── lib/               # ユーティリティ関数
│   ├── AppContext.tsx  # グローバル状態管理
│   ├── relevance.ts    # 関連度計算
│   ├── actionLabel.ts  # アクションラベル判定
│   └── ...
└── package.json
```

## 🚀 セットアップと起動

### 依存関係のインストール
```bash
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### ビルド
```bash
npm run build
```

### 本番環境の起動
```bash
npm start
```

## 🎨 デザイン

ダークモードをベースとしたモダンなUI:
- カラースキーム: ネイビー系背景 + アクセントカラー
- レスポンシブデザイン
- CSS変数による統一されたスタイリング

## 📊 データ構造

### Post（投稿）
```typescript
{
  id: string;
  title: string;
  body: string;
  source: "skyなう" | "SKYWIZ" | "社内ブログ";
  author: string;
  createdAt: string;
  tags: string[];
}
```

### User（ユーザー）
```typescript
{
  id: string;
  name: string;
  department: string;
  interests: string[];
}
```

### PriorityPost（優先度付き投稿）
```typescript
{
  ...Post,
  relevanceScore: number;  // 0-100
  actionLabel: "要対応" | "共有推奨" | "参考情報";
}
```

## 🔧 カスタマイズ

### ダミーデータの変更
`app/_data/mockData.ts` を編集してダミーデータを追加・変更

### 関連度計算ロジックの調整
`lib/relevance.ts` の `calculateRelevance()` 関数を編集

### AI要約の変更
`app/_data/mockSummary.ts` を編集

## 📝 注意事項

- **プロトタイプ専用**: 本番環境では使用しないでください
- **擬似データ**: すべてのデータは固定のダミーデータです
- **固定AI出力**: AI要約は事前に定義された固定テキストです
- **認証なし**: ユーザー認証機能は実装されていません

## 🎓 学習ポイント

このプロジェクトで学べること:
- Next.js App Routerの使い方
- TypeScriptでの型安全な開発
- React Context APIによる状態管理
- Tailwind CSSでのスタイリング
- コンポーネント設計のベストプラクティス

## 📄 ライセンス

社内利用限定

---

**開発者**: GitHub Copilot  
**最終更新**: 2026年1月2日
