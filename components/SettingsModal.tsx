"use client";

import { Modal } from "./Modal";
import { useApp } from "../lib/store";

export function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, setDepartment, toggleInterest, departments, allTags, allUsers, setUserById } = useApp();

  return (
    <Modal open={open} onClose={onClose} title="ユーザー設定（部署・関心タグ）">
      <div className="grid">
        <div className="card">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <div className="small">デモ用ユーザー</div>
              <div style={{ fontWeight: 800, marginTop: 4 }}>{user.name}</div>
            </div>
            <select
              value={user.id}
              onChange={(e) => setUserById(e.target.value)}
              style={{ padding: 8, borderRadius: 10, border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text)" }}
            >
              {allUsers.map(u => <option key={u.id} value={u.id}>{u.name}（{u.department}）</option>)}
            </select>
          </div>
        </div>

        <div className="card">
          <div className="small">部署</div>
          <div style={{ marginTop: 6 }}>
            <select
              value={user.department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ padding: 8, borderRadius: 10, border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text)" }}
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="card">
          <div className="small">関心タグ（複数選択）</div>
          <div className="row" style={{ marginTop: 8 }}>
            {allTags.map(t => (
              <label key={t} className="pill" style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={user.interests.includes(t)}
                  onChange={() => toggleInterest(t)}
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="small">
          ※この設定はPoCの擬似ロジック（関連度スコア）に使われます。
        </div>
      </div>
    </Modal>
  );
}
