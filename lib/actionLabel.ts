import { ActionLabel, Post, UserContext } from "./types";
import { calcRelevance } from "./relevance";

export function labelAction(post: Post, user: UserContext): { label: ActionLabel; reason: string } {
  const { score } = calcRelevance(post, user);

  const hasCritical = post.tags.includes("security") || post.tags.includes("incident");
  if (score >= 8 && hasCritical) {
    return { label: "REQUIRES_ACTION", reason: "高関連度かつセキュリティ/障害系。早めの確認・対応が必要そうです。" };
  }

  if (score >= 4 && post.source === "BLOG") {
    return { label: "SHARE_RECOMMENDED", reason: "公式情報で影響範囲が広そう。チーム共有を推奨します。" };
  }

  return { label: "FYI", reason: "参考情報。必要に応じて確認してください。" };
}
