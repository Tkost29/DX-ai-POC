"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "情報統合" },
  { href: "/summary", label: "AI要約" },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">Sky DX PoC</div>
      <nav className="nav">
        {nav.map(n => (
          <Link key={n.href} href={n.href} className={path === n.href ? "active" : ""}>
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="small" style={{ padding: "10px 10px" }}>
        ※擬似データ／疑似AIでデモ可能なプロトタイプ
      </div>
    </aside>
  );
}
