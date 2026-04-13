import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <motion.div className="auth-form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="AMHAN" style={{ height: '28px', objectFit: 'contain' }} />
          </Link>
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to continue shopping</p>

          <button className="google-btn" onClick={handleGoogle} type="button">
            <FcGoogle size={20} /> Continue with Google
          </button>

          <div className="divider">or sign in with email</div>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="input-group">
                <label>Email</label>
                <div style={{ position: 'relative' }}>
                  <HiOutlineMail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" style={{ paddingLeft: '2.5rem' }} required />
                </div>
              </div>
              <div className="input-group">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <HiOutlineLockClosed style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input className="input-field" type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-tertiary)' }}>
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/forgot-password" style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 500 }}>Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up</Link>
          </p>
        </motion.div>
      </div>

      <div className="auth-right">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', color: 'white', maxWidth: 400 }}>
          <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Style Meets Substance</h2>
          <p style={{ fontSize: '1rem', opacity: 0.7, lineHeight: 1.7 }}>
            Premium men's fashion for those who appreciate quality and bold design.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
