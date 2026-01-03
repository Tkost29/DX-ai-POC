import { Post, UserContext, Relevance } from "./types";

/**
 * 投稿とユーザーの関連度を計算
 * 優先順位：
 * 1. 緊急度（urgent = +1000点）
 * 2. 関連タグの一致数
 * 3. その他の関連性
 */
export function calcRelevance(post: Post, user: UserContext): Relevance {
  let score = 0;
  const reasons: string[] = [];

  // 【最優先】緊急度
  if (post.urgency === "urgent") {
    score += 1000; // 緊急投稿は圧倒的に優先
    reasons.push("🚨 緊急対応");
  }

  // タグの一致度
  const matchingTags = post.tags.filter((tag) => user.interests.includes(tag));
  if (matchingTags.length > 0) {
    score += matchingTags.length * 3;
    reasons.push(`関心タグ一致: ${matchingTags.join(", ")}`);
  }

  // 部署関連性
  if (post.title.includes(user.department) || post.body.includes(user.department)) {
    score += 4;
    reasons.push("部署キーワード一致");
  }

  // BLOG（公式情報）バイアス
  if (post.source === "BLOG") {
    score += 1;
    reasons.push("公式情報(BLOG)");
  }

  // 新着度ボーナス
  const minutesAgo = Math.max(0, Math.floor((Date.now() - new Date(post.createdAt).getTime()) / 60_000));
  const recency = minutesAgo <= 30 ? 2 : minutesAgo <= 180 ? 1 : 0;
  if (recency > 0) {
    reasons.push(recency === 2 ? "新着(〜30分)" : "直近(〜3時間)");
  }
  score += recency;

  return { score, reasons };
}

/**
 * 優先度バケットを判定
 * 緊急投稿は必ずHighになる
 */
export function priorityBucket(score: number): "High" | "Medium" | "Low" {
  if (score >= 1000) return "High"; // 緊急投稿
  if (score >= 8) return "High";
  if (score >= 4) return "Medium";
  return "Low";
}
