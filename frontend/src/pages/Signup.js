import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/feed');
    } catch (e) {
      setErr(e.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h1 className="title">Create your account</h1>
      <form onSubmit={submit} className="card stack">
        <input
          className="input"
          placeholder="Full name"
          value={name}
          onChange={e=>setName(e.target.value)}
          required
        />
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
          placeholder="Password (6+ chars)"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        {err && <div className="helper" style={{ color: 'crimson' }}>{err}</div>}
        <button className="btn btn-primary" type="submit">Sign up</button>
        <div className="helper">Already have an account? <Link to="/login" className="btn-link">Log in</Link></div>
      </form>
    </div>
  );
}
