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
    url: "https://skywiz.example.com/posts/vpn-incident-2026",
    aiSummary: "社内VPNの接続不安定が発生し、一部拠点で社内システムへのアクセス遅延が確認されています。暫定対応として再接続や有線接続の優先利用を推奨しています。情シス部門が原因調査を進めており、追加の対応が必要な場合は随時連絡される予定です。業務への影響を最小限に抑えるため、各自で対応をお願いします。",
  },
  {
    id: "p2",
    title: "Skyなう：新入社員向けオンボーディング資料更新",
    body: "オンボーディングの手順を更新しました。アカウント申請フローと研修リンクを追記。該当者は確認お願いします。",
    source: src("SKY_NOW"),
    author: "人事・小林",
    createdAt: iso(90),
    tags: ["process", "productivity"],
    url: "https://skynow.example.com/announcements/onboarding-update",
    aiSummary: "新入社員向けのオンボーディング資料が更新されました。主な変更点は、アカウント申請フローの明確化と研修資料へのリンク追加です。新入社員の受け入れを担当する部署や、入社予定者がいるチームは必ず最新資料を確認し、スムーズな受け入れ体制を整えてください。",
  },
  {
    id: "p3",
    title: "社内ブログ：SKYAI利用ガイド（社内専用・安全な使い方）",
    body: "社内専用AIの利用における注意点、機密情報の扱い、推奨プロンプト例をまとめました。チーム内展開にご活用ください。",
    source: src("BLOG"),
    author: "AI推進・森",
    createdAt: iso(240),
    tags: ["ai", "policy", "security"],
    url: "https://blog.sky.example.com/2026/skyai-usage-guide",
    aiSummary: "社内専用AI「SKYAI」の安全な利用方法をまとめたガイドが公開されました。機密情報の取り扱いルール、セキュリティ上の注意事項、効果的なプロンプトの書き方などが詳しく解説されています。AI活用を進める各チームは、このガイドをチーム内で共有し、安全かつ効果的なAI活用を推進してください。",
  },
  {
    id: "p4",
    title: "【リリース】申請ポータルのUI改善（検索/フィルタ追加）",
    body: "申請ポータルに検索とフィルタを追加しました。よく使う申請の導線が短くなります。使い方はFAQ参照。",
    source: src("BLOG"),
    author: "Skyスタイル部・中村",
    createdAt: iso(420),
    tags: ["release", "productivity", "process"],
    url: "https://blog.sky.example.com/2026/portal-ui-improvement",
    aiSummary: "社内申請ポータルのUI改善が実施されました。新たに検索機能とフィルタ機能が追加され、頻繁に使用する申請へのアクセスが大幅に改善されています。詳しい使い方はFAQページに掲載されているため、申請業務を効率化したい方は確認してください。業務の生産性向上が期待できます。",
  },
  {
    id: "p5",
    title: "Skyなう：営業向け・提案資料テンプレ更新",
    body: "提案資料テンプレを更新しました。顧客セグメント別の事例を追加。営業部は次回提案から使用してください。",
    source: src("SKY_NOW"),
    author: "営業企画・伊藤",
    createdAt: iso(55),
    tags: ["customer", "productivity"],
    url: "https://skynow.example.com/sales/template-update-2026",
    aiSummary: "営業部門向けの提案資料テンプレートが更新され、顧客セグメント別の導入事例が新たに追加されました。より説得力のある提案が可能になり、商談の成約率向上が期待されます。営業部の方は次回の提案活動から新しいテンプレートを使用し、顧客に合わせた効果的な提案を行ってください。",
  },
  {
    id: "p6",
    title: "【コスト】クラウド利用料の月次速報（削減余地あり）",
    body: "今月のクラウド費用速報です。開発環境の夜間停止で削減余地があります。各チームは稼働時間を見直してください。",
    source: src("BLOG"),
    author: "情シス・財務連携",
    createdAt: iso(600),
    tags: ["cost", "infra", "process"],
    url: "https://blog.sky.example.com/2026/cloud-cost-report",
    aiSummary: "今月のクラウド利用料の速報が公開されました。分析の結果、開発環境の夜間停止によるコスト削減の余地が見つかっています。各開発チームは自チームの環境稼働時間を見直し、不要な時間帯のリソース停止を検討してください。全社的なコスト最適化に協力をお願いします。",
  },
  {
    id: "p7",
    title: "【セキュリティ】MFA未設定ユーザへのリマインド",
    body: "MFA未設定の方へ。期限までに設定をお願いします。手順は社内ブログのガイド参照。未対応はアクセス制限の可能性。",
    source: src("SKY_WIZ"),
    author: "セキュリティ室",
    createdAt: iso(15),
    tags: ["security", "policy"],
    url: "https://skywiz.example.com/security/mfa-reminder",
    aiSummary: "多要素認証（MFA）の設定がまだ完了していないユーザーへの最終リマインドです。設定期限が迫っており、未対応の場合は社内システムへのアクセスが制限される可能性があります。設定手順は社内ブログのガイドに詳しく記載されているため、必ず期限内に対応してください。セキュリティ強化への協力をお願いします。",
  },
  {
    id: "p8",
    title: "Skyなう：開発部の勉強会（Observability入門）",
    body: "来週Observability入門をやります。メトリクス／ログ／トレースの基本と運用への落とし込み。参加歓迎。",
    source: src("SKY_NOW"),
    author: "開発部・鈴木",
    createdAt: iso(180),
    tags: ["infra", "productivity"],
    url: "https://skynow.example.com/events/observability-workshop",
    aiSummary: "開発部主催のObservability入門勉強会が来週開催されます。メトリクス、ログ、トレースの基礎知識から実際の運用への適用方法まで幅広く学べる内容です。システムの可観測性を高めたい方、運用品質を向上させたい方は是非参加してください。他部署の方も歓迎です。",
  },
  {
    id: "p9",
    title: "【運用】定例メンテナンスのお知らせ（今週末）",
    body: "今週末に社内基盤のメンテナンスを実施します。対象サービスと影響時間帯を確認してください。必要なら事前周知を。",
    source: src("BLOG"),
    author: "情シス・運用",
    createdAt: iso(300),
    tags: ["infra", "process"],
    url: "https://blog.sky.example.com/2026/maintenance-notice",
    aiSummary: "今週末に社内ITインフラの定例メンテナンスが実施されます。メンテナンス対象のサービスと影響を受ける時間帯を必ず確認してください。業務への影響が予想される場合は、関係者への事前周知をお願いします。メンテナンス中は一部サービスが利用できない可能性があります。",
  },
  {
    id: "p10",
    title: "【問い合わせ】申請の承認が進まないケースの共有",
    body: "承認が滞留するケースが散見。理由：差戻しコメント不足・カテゴリ誤り。改善案：テンプレ利用と教育。共有お願いします。",
    source: src("SKY_WIZ"),
    author: "総務・高橋",
    createdAt: iso(75),
    tags: ["process", "productivity"],
    url: "https://skywiz.example.com/qa/approval-delays",
    aiSummary: "社内申請の承認が遅延するケースが増加しています。主な原因は差戻し時のコメント不足や申請カテゴリの誤りです。改善策として、申請テンプレートの積極的な活用と、申請者・承認者双方への教育強化が提案されています。各部署で情報を共有し、スムーズな承認フローの実現にご協力ください。",
  },
];
