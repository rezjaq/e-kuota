import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Service/api';
import '../style/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const users = await login();
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem(
          'token',
          JSON.stringify({ userId: user.id, username: user.username, role: user.role })
        );
        navigate(user.role === 'admin' ? '/dashboardadmin' : '/dashboard');
      } else {
        alert('Username atau password salah!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-form p-4">
        <div className="text-center mb-4">
          <h1 className="app-title">KuotaKita</h1>
          <p className="tagline">Solusi Cepat untuk Pembelian Paket Data Internet</p>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-lock"></i></span>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <span><i className="fas fa-spinner fa-spin"></i> Loading...</span> : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
