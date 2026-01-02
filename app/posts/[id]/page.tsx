'use client';
import { useParams, useRouter } from 'next/navigation';
import { POSTS } from '@/lib/data';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const post = POSTS.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="mb-4 px-4 py-2 bg-[var(--panel)] rounded hover:bg-[var(--accent)] transition-colors"
          >
            ← 戻る
          </button>
          <h1 className="text-2xl font-bold">投稿が見つかりません</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-[var(--panel)] rounded hover:bg-[var(--accent)] transition-colors"
        >
          ← ダッシュボードに戻る
        </button>
        
        <div className="bg-[var(--panel)] rounded-lg p-8 shadow-lg">
          {/* ヘッダー情報 */}
          <div className="mb-6 pb-4 border-b border-[var(--text)]/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-[var(--accent)] text-white text-sm rounded">
                {post.source}
              </span>
              <span className="text-sm text-[var(--text)]/60">
                {post.createdAt}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-[var(--text)]/80">投稿者: {post.author}</p>
          </div>

          {/* 本文 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">本文</h2>
            <div className="bg-[var(--bg)] p-4 rounded whitespace-pre-wrap">
              {post.body}
            </div>
          </div>

          {/* タグ */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">タグ</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-[var(--bg)] rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI要約 */}
          {post.aiSummary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">🤖 AI要約</h2>
              <div className="bg-[var(--accent)]/10 border-l-4 border-[var(--accent)] p-4 rounded">
                {post.aiSummary}
              </div>
            </div>
          )}

          {/* メタ情報 */}
          <div className="pt-4 border-t border-[var(--text)]/20 text-sm text-[var(--text)]/60">
            <p>投稿ID: {post.id}</p>
            <p>作成日時: {post.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
