import { Post, Source, UserContext } from "./types";

const iso = (minsAgo: number) => new Date(Date.now() - minsAgo * 60_000).toISOString();

const src = (s: Source) => s;

export const USERS: UserContext[] = [
  { id: "u1", name: "山田", department: "開発", interests: ["ai", "infra", "security"] },
  { id: "u2", name: "佐藤", department: "営業", interests: ["process", "productivity", "customer"] },
  { id: "u3", name: "陳", department: "情シス", interests: ["infra", "security", "cost"] },
];

export const ALL_TAGS = [
  "ai", "infra", "security", "process", "productivity",
  "incident", "release", "policy", "customer", "cost",
];

export const DEPARTMENTS = ["開発", "営業", "情シス", "人事", "総務"];

export const POSTS: Post[] = [
  {
    id: "p1",
    title: "【障害】社内VPNが一部不安定（暫定対応あり）",
    body: "本日夕方より一部拠点でVPNが不安定です。影響：社内システム接続遅延。暫定対応：再接続／有線優先。原因調査中。",
    source: src("SKY_WIZ"),
    author: "情シス・田中",
    createdAt: iso(35),
    tags: ["incident", "infra", "security"],
  },
  {
    id: "p2",
    title: "Skyなう：新入社員向けオンボーディング資料更新",
    body: "オンボーディングの手順を更新しました。アカウント申請フローと研修リンクを追記。該当者は確認お願いします。",
    source: src("SKY_NOW"),
    author: "人事・小林",
    createdAt: iso(90),
    tags: ["process", "productivity"],
  },
  {
    id: "p3",
    title: "社内ブログ：SKYAI利用ガイド（社内専用・安全な使い方）",
    body: "社内専用AIの利用における注意点、機密情報の扱い、推奨プロンプト例をまとめました。チーム内展開にご活用ください。",
    source: src("BLOG"),
    author: "AI推進・森",
    createdAt: iso(240),
    tags: ["ai", "policy", "security"],
  },
  {
    id: "p4",
    title: "【リリース】申請ポータルのUI改善（検索/フィルタ追加）",
    body: "申請ポータルに検索とフィルタを追加しました。よく使う申請の導線が短くなります。使い方はFAQ参照。",
    source: src("BLOG"),
    author: "Skyスタイル部・中村",
    createdAt: iso(420),
    tags: ["release", "productivity", "process"],
  },
  {
    id: "p5",
    title: "Skyなう：営業向け・提案資料テンプレ更新",
    body: "提案資料テンプレを更新しました。顧客セグメント別の事例を追加。営業部は次回提案から使用してください。",
    source: src("SKY_NOW"),
    author: "営業企画・伊藤",
    createdAt: iso(55),
    tags: ["customer", "productivity"],
  },
  {
    id: "p6",
    title: "【コスト】クラウド利用料の月次速報（削減余地あり）",
    body: "今月のクラウド費用速報です。開発環境の夜間停止で削減余地があります。各チームは稼働時間を見直してください。",
    source: src("BLOG"),
    author: "情シス・財務連携",
    createdAt: iso(600),
    tags: ["cost", "infra", "process"],
  },
  {
    id: "p7",
    title: "【セキュリティ】MFA未設定ユーザへのリマインド",
    body: "MFA未設定の方へ。期限までに設定をお願いします。手順は社内ブログのガイド参照。未対応はアクセス制限の可能性。",
    source: src("SKY_WIZ"),
    author: "セキュリティ室",
    createdAt: iso(15),
    tags: ["security", "policy"],
  },
  {
    id: "p8",
    title: "Skyなう：開発部の勉強会（Observability入門）",
    body: "来週Observability入門をやります。メトリクス／ログ／トレースの基本と運用への落とし込み。参加歓迎。",
    source: src("SKY_NOW"),
    author: "開発部・鈴木",
    createdAt: iso(180),
    tags: ["infra", "productivity"],
  },
  {
    id: "p9",
    title: "【運用】定例メンテナンスのお知らせ（今週末）",
    body: "今週末に社内基盤のメンテナンスを実施します。対象サービスと影響時間帯を確認してください。必要なら事前周知を。",
    source: src("BLOG"),
    author: "情シス・運用",
    createdAt: iso(300),
    tags: ["infra", "process"],
  },
  {
    id: "p10",
    title: "【問い合わせ】申請の承認が進まないケースの共有",
    body: "承認が滞留するケースが散見。理由：差戻しコメント不足・カテゴリ誤り。改善案：テンプレ利用と教育。共有お願いします。",
    source: src("SKY_WIZ"),
    author: "総務・高橋",
    createdAt: iso(75),
    tags: ["process", "productivity"],
  },
];
