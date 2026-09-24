import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);

    try {
      // Ningalude Backend API URL (Eg: http://localhost:5000/api/admin/login or /api/auth/login)
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Backend-il ninnu kittunna JWT token-um user details-um save cheyyunnu
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || { email: form.email.trim() }));
        
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(data.message || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Server connection failed. Please check if your backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-soft p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-gray-900 text-lg leading-none">Martvexa</p>
              <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
            </div>
          </div>

          <h2 className="font-display font-bold text-gray-900 text-xl mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your admin account</p>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                           text-sm text-gray-900 placeholder:text-gray-400
                           focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white
                           transition-all duration-150"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="login-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 bg-gray-50
                             text-sm text-gray-900 placeholder:text-gray-400
                             focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white
                             transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              id="login-submit"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800
                         text-white text-sm font-semibold rounded-xl py-2.5 mt-2
                         transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              ) : null}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Hint */}
          <p className="text-xs text-gray-400 text-center mt-6">
            Use <span className="font-mono text-gray-600">admin@gmail.com</span> / <span className="font-mono text-gray-600">12345678</span>
          </p>
        </div>
      </div>
    </div>
  );
}