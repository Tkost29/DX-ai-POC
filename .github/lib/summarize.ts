import { Post, SummaryResult, Topic, UserContext } from "./types";
import { calcRelevance } from "./relevance";

// 疑似要約：関連度上位の投稿からテンプレ生成
export function summarize(posts: Post[], user: UserContext): SummaryResult {
  const ranked = posts
    .map(p => ({ p, rel: calcRelevance(p, user) }))
    .sort((a, b) => b.rel.score - a.rel.score);

  const focus = ranked.slice(0, 6).map(x => x.p);

  // topic grouping by tags (simple)
  const tagCounts = new Map<string, { tag: string; posts: Post[] }>();
  for (const p of focus) {
    for (const t of p.tags) {
      if (!tagCounts.has(t)) tagCounts.set(t, { tag: t, posts: [] });
      tagCounts.get(t)!.posts.push(p);
    }
  }
  const topicsRaw = [...tagCounts.values()]
    .sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, 4);

  const topics: Topic[] = topicsRaw.map(g => ({
    title: `#${g.tag}（${g.posts.length}件）`,
    bullets: [
      `主な動き: ${g.posts[0]?.title ?? ""}`,
      g.posts[1] ? `関連: ${g.posts[1].title}` : "関連: 追加情報なし",
    ].filter(Boolean),
    sourceIds: g.posts.map(p => p.id),
  }));

  const lines: string[] = [];
  lines.push(`• ${user.department}向けには「${user.interests.join(" / ")}」が中心トピックです。`);
  if (focus[0]) lines.push(`• 直近の重要事項: ${focus[0].title}`);
  if (focus[1]) lines.push(`• 関連する動き: ${focus[1].title}`);
  if (focus.some(p => p.tags.includes("incident"))) lines.push("• 障害/インシデント系の注意喚起があります（早めの確認推奨）。");
  if (focus.some(p => p.tags.includes("security"))) lines.push("• セキュリティ/ポリシー関連の周知があります（期限確認推奨）。");
  lines.push("• 重要トピックは下部のトピック一覧から参照元を確認できます。");

  // ensure 5〜7 lines
  const globalSummary = lines.slice(0, 7).join("\n");

  return { globalSummary, topics };
}
