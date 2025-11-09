import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await api.post('/posts', { text, imageUrl: imageUrl || undefined });
      navigate('/feed');
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <h1 className="title">Create a post</h1>
      <form onSubmit={submit} className="card stack">
        <textarea
          className="textarea"
          placeholder="What do you want to talk about?"
          value={text}
          onChange={e=>setText(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Optional image URL"
          value={imageUrl}
          onChange={e=>setImageUrl(e.target.value)}
        />
        {err && <div className="helper" style={{ color: 'crimson' }}>{err}</div>}
        <div style={{ display:'flex', gap:12 }}>
          <button className="btn btn-primary" type="submit">Post</button>
          <button type="button" className="btn" onClick={()=>navigate('/feed')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
