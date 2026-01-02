import { Post, Relevance, UserContext } from "./types";

function minutesAgo(iso: string): number {
  const d = new Date(iso).getTime();
  return Math.max(0, Math.floor((Date.now() - d) / 60_000));
}

export function calcRelevance(post: Post, user: UserContext): Relevance {
  let score = 0;
  const reasons: string[] = [];

  // 1) interests match
  const common = post.tags.filter(t => user.interests.includes(t));
  if (common.length > 0) {
    score += common.length * 3;
    reasons.push(`関心タグ一致: ${common.join(", ")}`);
  }

  // 2) department keyword in title/body (simple contains)
  if (post.title.includes(user.department) || post.body.includes(user.department)) {
    score += 4;
    reasons.push("部署キーワード一致");
  }

  // 3) BLOG official bias
  if (post.source === "BLOG") {
    score += 1;
    reasons.push("公式情報(BLOG)");
  }

  // 4) recency bonus 0..2
  const m = minutesAgo(post.createdAt);
  const recency = m <= 30 ? 2 : m <= 180 ? 1 : 0;
  if (recency > 0) reasons.push(recency === 2 ? "新着(〜30分)" : "直近(〜3時間)");
  score += recency;

  return { score, reasons };
}

export function priorityBucket(score: number): "High" | "Medium" | "Low" {
  if (score >= 8) return "High";
  if (score >= 4) return "Medium";
  return "Low";
}
