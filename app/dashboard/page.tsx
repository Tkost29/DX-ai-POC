"use client";

import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { PostCard } from "../../components/PostCard";
import { useApp } from "../../lib/store";
import { calcRelevance, priorityBucket } from "../../lib/relevance";
import { labelAction } from "../../lib/actionLabel";

export default function DashboardPage() {
  const { user } = useApp();

  // 関連度計算と優先度順ソート
  const ranked = [...POSTS]
    .map(p => {
      const rel = calcRelevance(p, user);
      const action = labelAction(p, user);
      return { p, rel, action };
    })
    .sort((a, b) => b.rel.score - a.rel.score);

  // アクションラベルの日本語変換とスタイル
  const actionLabelMap = {
    REQUIRES_ACTION: { text: "要対応", cls: "danger" },
    SHARE_RECOMMENDED: { text: "共有推奨", cls: "warn" },
    FYI: { text: "参考情報", cls: "ok" },
  };

  return (
    <>
      <TopBar
        title="情報統合ダッシュボード"
        description="部署・関心タグに基づき優先度順に表示。AIがアクション（要対応/共有推奨/参考情報）を提案（最終判断は人）"
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
        {ranked.map(({ p, rel, action }) => {
          const bucket = priorityBucket(rel.score);
          const priorityCls = bucket === "High" ? "danger" : bucket === "Medium" ? "warn" : "ok";
          const actionInfo = actionLabelMap[action.label];
          
          return (
            <PostCard
              key={p.id}
              post={p}
              extra={
                <div style={{ marginTop: 10 }}>
                  <div className="row" style={{ marginBottom: 8 }}>
                    <span className={`badge label ${priorityCls}`}>
                      優先度: {bucket}（score={rel.score}）
                    </span>
                    <span className={`badge label ${actionInfo.cls}`}>
                      AI提案: {actionInfo.text}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
                    💡 {action.reason}
                  </div>
                  <div className="row">
                    {rel.reasons.map((r: string, i: number) => (
                      <span key={i} className="badge">{r}</span>
                    ))}
                  </div>
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}
