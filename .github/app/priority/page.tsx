"use client";

import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { PostCard } from "../../components/PostCard";
import { useApp } from "../../lib/store";
import { calcRelevance, priorityBucket } from "../../lib/relevance";

export default function PriorityPage() {
  const { user } = useApp();

  const ranked = [...POSTS]
    .map(p => ({ p, rel: calcRelevance(p, user) }))
    .sort((a, b) => b.rel.score - a.rel.score);

  return (
    <>
      <TopBar
        title="ユーザ別・優先表示"
        description="部署・関心タグに基づき、把握すべき情報を優先度順に並べ替え（理由も表示）"
      />

      <div className="grid">
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
                  {rel.reasons.map((r, i) => <span key={i} className="badge">{r}</span>)}
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}
"use client";

import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { PostCard } from "../../components/PostCard";
import { useApp } from "../../lib/store";
import { calcRelevance, priorityBucket } from "../../lib/relevance";

export default function PriorityPage() {
  const { user } = useApp();

  const ranked = [...POSTS]
    .map(p => ({ p, rel: calcRelevance(p, user) }))
    .sort((a, b) => b.rel.score - a.rel.score);

  return (
    <>
      <TopBar
        title="ユーザ別・優先表示"
        description="部署・関心タグに基づき、把握すべき情報を優先度順に並べ替え（理由も表示）"
      />

      <div className="grid">
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
                  {rel.reasons.map((r, i) => <span key={i} className="badge">{r}</span>)}
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}
