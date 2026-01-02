"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { POSTS } from "../../lib/data";
import { TopBar } from "../../components/TopBar";
import { PostCard } from "../../components/PostCard";
import { Modal } from "../../components/Modal";

export default function SummaryPage() {
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 直近1ヶ月の投稿をフィルタ（擬似データなので全て表示）
  const recentPosts = useMemo(() => {
    const now = Date.now();
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
    
    return POSTS
      .filter(p => new Date(p.createdAt).getTime() > oneMonthAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, []);

  // カテゴリー（タグ）ごとに投稿をグループ化
  const postsByCategory = useMemo(() => {
    const categoryMap = new Map<string, typeof POSTS>();
    
    recentPosts.forEach(post => {
      post.tags.forEach(tag => {
        if (!categoryMap.has(tag)) {
          categoryMap.set(tag, []);
        }
        categoryMap.get(tag)!.push(post);
      });
    });
    
    return Array.from(categoryMap.entries()).map(([category, posts]) => ({
      category,
      posts,
      count: posts.length
    })).sort((a, b) => b.count - a.count); // 投稿数の多い順
  }, [recentPosts]);

  const selectedPost = selectedPostId ? POSTS.find(p => p.id === selectedPostId) : null;

  return (
    <>
      <TopBar
        title="投稿一覧"
        description="直近1ヶ月の投稿をカテゴリーごとに分類（投稿日時順）"
      />

      <div className="grid">
        <div className="card">
          <div className="small" style={{ marginBottom: 10 }}>
            📊 カテゴリー別投稿数（直近1ヶ月）
          </div>
          <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
            <button
              className={`badge ${selectedCategory === null ? 'label' : ''}`}
              onClick={() => setSelectedCategory(null)}
              style={{ 
                cursor: "pointer",
                background: selectedCategory === null ? "var(--accent)" : "var(--panel)",
                padding: "6px 12px"
              }}
            >
              すべて ({recentPosts.length})
            </button>
            {postsByCategory.map(({ category, count }) => (
              <button
                key={category}
                className={`badge ${selectedCategory === category ? 'label' : ''}`}
                onClick={() => setSelectedCategory(category)}
                style={{ 
                  cursor: "pointer",
                  background: selectedCategory === category ? "var(--accent)" : "var(--panel)",
                  padding: "6px 12px"
                }}
              >
                #{category} ({count})
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === null ? (
          // すべての投稿を表示
          <div className="card">
            <div className="small" style={{ marginBottom: 10 }}>
              📝 すべての投稿（{recentPosts.length}件）
            </div>
            <div className="grid">
              {recentPosts.map(p => (
                <PostCard
                  key={p.id}
                  post={p}
                  extra={
                    <div style={{ marginTop: 10 }}>
                      <div className="row" style={{ gap: 8 }}>
                        <button 
                          className="btn" 
                          onClick={() => setSelectedPostId(p.id)}
                          style={{ fontSize: 13, padding: "6px 12px" }}
                        >
                          📄 AI要約を見る
                        </button>
                        {p.url && (
                          <button 
                            className="btn" 
                            onClick={() => router.push(p.url!)}
                            style={{ fontSize: 13, padding: "6px 12px" }}
                          >
                            🔗 元投稿を開く
                          </button>
                        )}
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        ) : (
          // 選択されたカテゴリーの投稿を表示
          <div className="card">
            <div className="small" style={{ marginBottom: 10 }}>
              📝 カテゴリー: #{selectedCategory}（{postsByCategory.find(c => c.category === selectedCategory)?.count || 0}件）
            </div>
            <div className="grid">
              {postsByCategory
                .find(c => c.category === selectedCategory)
                ?.posts.map(p => (
                  <PostCard
                    key={p.id}
                    post={p}
                    extra={
                      <div style={{ marginTop: 10 }}>
                        <div className="row" style={{ gap: 8 }}>
                          <button 
                            className="btn" 
                            onClick={() => setSelectedPostId(p.id)}
                            style={{ fontSize: 13, padding: "6px 12px" }}
                          >
                            📄 AI要約を見る
                          </button>
                          {p.url && (
                            <button 
                              className="btn" 
                              onClick={() => router.push(p.url!)}
                              style={{ fontSize: 13, padding: "6px 12px" }}
                            >
                              🔗 元投稿を開く
                            </button>
                          )}
                        </div>
                      </div>
                    }
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* AI要約モーダル */}
      <Modal 
        open={selectedPostId !== null}
        onClose={() => setSelectedPostId(null)}
        title="🤖 AI要約"
      >
        {selectedPost && (
          <>
            <h3 style={{ fontSize: 18, marginBottom: 12, color: "var(--accent)" }}>
              {selectedPost.title}
            </h3>
            <p style={{ lineHeight: 1.8, color: "var(--text)" }}>
              {selectedPost.aiSummary || "AI要約が設定されていません。"}
            </p>
          </>
        )}
      </Modal>
    </>
  );
}
