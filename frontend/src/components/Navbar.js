import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/feed" className="brand" aria-label="Home">
          <span className="brand-badge">in</span>
          <span style={{ color: '#0a66c2', fontWeight: 700 }}>LinkedIn</span>&nbsp;Mini
        </Link>

        <nav className="nav">
          {user && (
            <>
              <span className="helper">Hi, {user.name}</span>

              {location.pathname !== '/create' && (
                <Link className="btn" to="/create">Create Post</Link>
              )}

              <button className="btn" onClick={logout}>Logout</button>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/signup" className="btn btn-primary">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
