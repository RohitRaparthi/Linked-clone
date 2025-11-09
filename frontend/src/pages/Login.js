import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/feed');
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h1 className="title">Welcome back</h1>
      <form onSubmit={submit} className="card stack">
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        {err && <div className="helper" style={{ color: 'crimson' }}>{err}</div>}
        <button className="btn btn-primary" type="submit">Log in</button>
        <div className="helper">No account? <Link to="/signup" className="btn-link">Create one</Link></div>
      </form>
    </div>
  );
}
