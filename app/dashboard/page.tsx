"use client";

import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { PostCard } from "../../components/PostCard";
import { Modal } from "../../components/Modal";
import { useMemo, useState } from "react";
import { Post } from "../../lib/types";

export default function DashboardPage() {
  const sorted = useMemo(() => [...POSTS].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), []);
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <>
      <TopBar
        title="情報統合ダッシュボード"
        description="複数ツール（Skyなう / SKYWIZ / 社内ブログ）に分散した情報を1画面に集約（PoCは擬似データ）"
      />

      <div className="kpi">
        <div className="card">
          <div className="small">投稿数</div>
          <div className="value">{sorted.length}</div>
        </div>
        <div className="card">
          <div className="small">情報ソース</div>
          <div className="value">3</div>
        </div>
        <div className="card">
          <div className="small">目的</div>
          <div className="value" style={{ fontSize: 16, marginTop: 10 }}>
            「全体像」をすぐ把握
          </div>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 12 }}>
        {sorted.map(p => (
          <PostCard key={p.id} post={p} onClick={() => setSelected(p)} />
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="投稿詳細（擬似）">
        {selected ? (
          <div className="grid">
            <div className="card">
              <h3>{selected.title}</h3>
              <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{selected.body}</p>
              <div className="row" style={{ marginTop: 10 }}>
                <span className="badge">{selected.author}</span>
                <span className="badge">{new Date(selected.createdAt).toLocaleString()}</span>
                {selected.tags.map(t => <span key={t} className="badge">#{t}</span>)}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
