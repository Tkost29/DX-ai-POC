"use client";

import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { useApp } from "../../lib/store";
import { labelAction } from "../../lib/actionLabel";
import { PostCard } from "../../components/PostCard";

function labelUI(label: string) {
  if (label === "REQUIRES_ACTION") return { text: "要対応", cls: "danger" };
  if (label === "SHARE_RECOMMENDED") return { text: "共有推奨", cls: "warn" };
  return { text: "参考情報", cls: "ok" };
}

export default function ActionsPage() {
  const { user } = useApp();

  const rows = [...POSTS].map(p => {
    const r = labelAction(p, user);
    return { p, ...r };
  });

  // “要対応”を上に出す
  const order = { REQUIRES_ACTION: 0, SHARE_RECOMMENDED: 1, FYI: 2 } as const;
  rows.sort((a, b) => order[a.label] - order[b.label]);

  return (
    <>
      <TopBar
        title="アクション示唆（意思決定支援）"
        description="AIが「要対応／共有推奨／参考情報」を提案（最終判断は人。PoCの簡易ルール）"
      />

      <div className="grid">
        {rows.map(({ p, label, reason }) => {
          const ui = labelUI(label);
          return (
            <PostCard
              key={p.id}
              post={p}
              extra={
                <div className="grid">
                  <div className={`badge label ${ui.cls}`}>{ui.text}</div>
                  <div className="small">{reason}</div>
                </div>
              }
            />
          );
        })}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="small">
          注意：AIは判断を補助します。最終判断は利用者が行います（PoC）。
        </div>
      </div>
    </>
  );
}
