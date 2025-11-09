import dayjs from 'dayjs';
import { useState } from 'react';

const initialsOf = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map(s => s[0]?.toUpperCase() ?? '');
  return letters.join('') || 'U';
};

export default function PostCard({ post, onLike, onComment, onDelete }) {
  const name = post?.author?.name || 'Unknown';
  const time = dayjs(post.createdAt).format('DD MMM, HH:mm');
  const loggedUser = JSON.parse(localStorage.getItem('user') || 'null');
  const isOwner = loggedUser && loggedUser.id === post?.author?._id;

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const handleComment = () => {
    if (!comment.trim()) return;
    onComment(post._id, comment);
    setComment('');
  };

  return (
    <article className="card post">
      <div className="avatar" title={name}>{initialsOf(name)}</div>

      <div className="post-body">
        <div className="post-head">
          <div className="post-author">{name}</div>
          <div className="post-time">{time}</div>
        </div>

        <div className="post-text">{post.text}</div>

        {post.imageUrl && (
          <img className="post-img" src={post.imageUrl} alt="post attachment" />
        )}

        <div className="post-actions">
          <button className="action" onClick={() => onLike?.(post._id)}>
            👍 Like ({post.likes?.length ?? 0})
          </button>

          <button className="action" onClick={() => setShowComments(!showComments)}>
            💬 Comment ({post.comments?.length ?? 0})
          </button>

          {isOwner && (
            <button
              className="action"
              style={{ color: 'crimson' }}
              onClick={() => window.confirm('Delete this post?') && onDelete(post._id)}
            >
              🗑 Delete
            </button>
          )}
        </div>

        {showComments && (
          <div style={{ marginTop: '12px' }}>
            <hr style={{ borderColor: '#e5e7eb' }} />

            {/* Existing comments (sorted oldest → newest) */}
            <div style={{ marginTop: '10px' }}>
              {post.comments?.length > 0 ? (
                post.comments.map((c, i) => (
                  <div key={i} style={{ marginBottom: '6px', fontSize: '.9rem' }}>
                    <strong>{c.user?.name || 'User'}:</strong> {c.text}
                  </div>
                ))
              ) : (
                <div className="helper">No comments yet</div>
              )}
            </div>

            {/* Add a comment */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <input
                className="input"
                style={{ flex: 1, fontSize: '.9rem', padding: '8px 10px' }}
                placeholder="Add a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleComment}>Post</button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
