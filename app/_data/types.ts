/**
 * データ型定義
 * プロトタイプで使用する全ての型を定義
 */

/** 情報ソース */
export type Source = "skyなう" | "SKYWIZ" | "社内ブログ";

/** 投稿データ */
export interface Post {
  id: string;
  title: string;
  body: string;
  source: Source;
  author: string;
  createdAt: string; // ISO形式
  tags: string[];
}

/** ユーザー情報 */
export interface User {
  id: string;
  name: string;
  department: string;
  interests: string[];
}

/** アクションラベル */
export type ActionLabel = "要対応" | "共有推奨" | "参考情報";

/** 優先度付き投稿 */
export interface PriorityPost extends Post {
  relevanceScore: number;
  actionLabel: ActionLabel;
}

/** AI要約データ */
export interface Summary {
  overall: string; // 全体要約 5〜7行
  topics: string[]; // 重要トピック
}
