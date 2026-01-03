export type Source = "SKY_NOW" | "SKY_WIZ" | "BLOG";

export type Urgency = "urgent" | "normal";

export type Post = {
  id: string;
  title: string;
  body: string;
  source: Source;
  author: string;
  createdAt: string; // ISO
  tags: string[];
  url?: string; // 投稿元URL
  aiSummary?: string; // AI要約（200-300字）
  urgency: Urgency; // 緊急度
};

export type UserContext = {
  id: string;
  name: string;
  department: string;
  interests: string[];
};

export type ActionLabel = "REQUIRES_ACTION" | "SHARE_RECOMMENDED" | "FYI";

export type Relevance = {
  score: number;
  reasons: string[];
};

export type Topic = {
  title: string;
  bullets: string[];
  sourceIds: string[];
};

export type SummaryResult = {
  globalSummary: string; // 5〜7 lines
  topics: Topic[];
};
