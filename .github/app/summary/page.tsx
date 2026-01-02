"use client";

import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { useApp } from "../../lib/store";
import { summarize } from "../../lib/summarize";
import { PostCard } from "../../components/PostCard";
import { useMemo, useState } from "react";

export default function SummaryPage() {
  const { user } = useApp();
  const res = useMemo(() => summarize(POSTS, user), [user]);

  const [openTopic, setOpenTopic] = useState<string | null>(null);

  return (
    <>
      <TopBar
        title="AI要約・重要トピック"
        description="Skyなう / SKYWIZ / 社内ブログを横断して要約（PoCでは疑似要約）"
      />

      <div className="grid">
        <div className="card">
          <div className="small">今日の全社AIサマリー（擬似）</div>
          <pre style={{ whiteSpace: "pre-wrap", color: "var(--text)", margin: "10px 0 0", lineHeight: 1.6 }}>
            {res.globalSummary}
          </pre>
        </div>

        <div className="card">
          <div className="small">重要トピック</div>
          <div className="grid" style={{ marginTop: 10 }}>
            {res.topics.map(t => (
              <div key={t.title} className="card" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 800 }}>{t.title}</div>
                  <button className="btn" onClick={() => setOpenTopic(openTopic === t.title ? null : t.title)}>
                    参照元を見る
                  </button>
                </div>
                <ul style={{ margin: "8px 0 0 18px", color: "var(--muted)" }}>
                  {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>

                {openTopic === t.title ? (
                  <div className="grid" style={{ marginTop: 10 }}>
                    {POSTS.filter(p => t.sourceIds.includes(p.id)).map(p => (
                      <PostCard key={p.id} post={p} />
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
