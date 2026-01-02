"use client";

import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { PostCard } from "../../components/PostCard";
import { useApp } from "../../lib/store";
import { calcRelevance, priorityBucket } from "../../lib/relevance";

export default function DashboardPage() {
  const { user } = useApp();

  // 関連度計算と優先度順ソート
  const ranked = [...POSTS]
    .map(p => ({ p, rel: calcRelevance(p, user) }))
    .sort((a, b) => b.rel.score - a.rel.score);

  return (
    <>
      <TopBar
        title="情報統合ダッシュボード"
        description="部署・関心タグに基づき、把握すべき情報を優先度順に並べ替え（理由も表示）"
      />

      <div className="kpi">
        <div className="card">
          <div className="small">投稿数</div>
          <div className="value">{POSTS.length}</div>
        </div>
        <div className="card">
          <div className="small">情報ソース</div>
          <div className="value">3</div>
        </div>
        <div className="card">
          <div className="small">ユーザー</div>
          <div className="value" style={{ fontSize: 16, marginTop: 10 }}>
            {user.name}
          </div>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 12 }}>
        {ranked.map(({ p, rel }) => {
          const bucket = priorityBucket(rel.score);
          const labelCls = bucket === "High" ? "danger" : bucket === "Medium" ? "warn" : "ok";
          return (
            <PostCard
              key={p.id}
              post={p}
              extra={
                <div className="row">
                  <span className={`badge label ${labelCls}`}>
                    優先度: {bucket}（score={rel.score}）
                  </span>
                  {rel.reasons.map((r: string, i: number) => <span key={i} className="badge">{r}</span>)}
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}
