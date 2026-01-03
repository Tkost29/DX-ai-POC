"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { PostCard } from "../../components/PostCard";
import { useApp } from "../../lib/store";
import { calcRelevance, priorityBucket } from "../../lib/relevance";
import { labelAction } from "../../lib/actionLabel";
import { Modal } from "../../components/Modal";

export default function DashboardPage() {
  const { user } = useApp();
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

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

  // 選択された投稿を取得
  const selectedPost = selectedPostId ? POSTS.find(p => p.id === selectedPostId) : null;

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
                      {actionInfo.text}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
                    💡 {action.reason}
                  </div>
                  <div className="row" style={{ marginBottom: 10 }}>
                    {rel.reasons.map((r: string, i: number) => (
                      <span key={i} className="badge">{r}</span>
                    ))}
                  </div>
                  {/* ボタン群 */}
                  <div className="row" style={{ gap: 8 }}>
                    <button 
                      className="btn" 
                      onClick={() => setSelectedPostId(p.id)}
                      style={{ fontSize: 13, padding: "6px 12px" }}
                    >
                      📄 AI要約を見る
                    </button>
                    {p.url && (
                      <button 
                        className="btn" 
                        onClick={() => router.push(p.url!)}
                        style={{ fontSize: 13, padding: "6px 12px" }}
                      >
                        🔗 元投稿を開く
                      </button>
                    )}
                  </div>
                </div>
              }
            />
          );
        })}
      </div>

      {/* AI要約モーダル */}
      <Modal 
        open={!!selectedPost} 
        onClose={() => setSelectedPostId(null)}
        title="AI要約（200-300字）"
      >
        {selectedPost && (
          <div className="card">
            <h3 style={{ marginBottom: 10 }}>{selectedPost.title}</h3>
            <div style={{ 
              padding: 14, 
              background: "rgba(255,255,255,0.02)", 
              borderRadius: 8,
              lineHeight: 1.8,
              color: "var(--text)"
            }}>
              {selectedPost.aiSummary || "AI要約がまだ生成されていません。"}
            </div>
            {selectedPost.url && (
              <div style={{ marginTop: 12 }}>
                <button 
                  className="btn" 
                  onClick={() => window.open(selectedPost.url, '_blank')}
                  style={{ fontSize: 13 }}
                >
                  🔗 元投稿を開く
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
