"use client";

import { Post } from "../lib/types";

function sourceLabel(s: Post["source"]) {
  if (s === "SKY_NOW") return { text: "Skyなう", cls: "now" };
  if (s === "SKY_WIZ") return { text: "SKYWIZ", cls: "wiz" };
  return { text: "社内ブログ", cls: "blog" };
}

export function PostCard({
  post,
  onClick,
  extra,
}: {
  post: Post;
  onClick?: () => void;
  extra?: React.ReactNode;
}) {
  const src = sourceLabel(post.source);
  const excerpt = post.body.length > 140 ? post.body.slice(0, 140) + "…" : post.body;

  return (
    <div className="card" style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ marginRight: 10 }}>{post.title}</h3>
        <span className={`badge source ${src.cls}`}>{src.text}</span>
      </div>
      <p style={{ marginTop: 4 }}>{excerpt}</p>
      <div className="row" style={{ marginTop: 10 }}>
        <span className="badge">{post.author}</span>
        <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
        {post.tags.map(t => <span key={t} className="badge">#{t}</span>)}
      </div>
      {extra ? <div style={{ marginTop: 10 }}>{extra}</div> : null}
    </div>
  );
}

