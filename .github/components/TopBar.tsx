"use client";

import { useState } from "react";
import { useApp } from "../lib/store";
import { SettingsModal } from "./SettingsModal";

export function TopBar({ title, description }: { title: string; description: string }) {
  const { user } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div>
          <div style={{ fontWeight: 900, fontSize: 18 }}>{title}</div>
          <div className="small">{description}</div>
        </div>

        <div className="row">
          <span className="pill">ユーザー: <b style={{ color: "var(--text)" }}>{user.name}</b></span>
          <span className="pill">部署: <b style={{ color: "var(--text)" }}>{user.department}</b></span>
          <span className="pill">関心: <b style={{ color: "var(--text)" }}>{user.interests.join(", ")}</b></span>
          <button className="btn" onClick={() => setOpen(true)}>設定</button>
        </div>
      </div>

      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
