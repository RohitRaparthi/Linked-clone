import { useEffect, useState } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleLike = async (id) => {
    await api.post(`/posts/${id}/like`);
    load();
  };

  const addComment = async (id, text) => {
    await api.post(`/posts/${id}/comment`, { text });
    load();
  };

  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    load();
  };

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="feed-title">Your Feed</div>

      {loading && <div className="card center">Loading posts…</div>}

      {!loading && posts.length === 0 && (
        <div className="card center">No posts yet. Be the first to share something!</div>
      )}

      {!loading && posts.map(p => (
        <div key={p._id} className="mt-3">
          <PostCard
            post={p}
            onLike={toggleLike}
            onComment={addComment}
            onDelete={deletePost}
          />
        </div>
      ))}
    </div>
  );
}
