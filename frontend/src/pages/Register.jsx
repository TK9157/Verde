import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, fullName);
      toast.success('Account created! Check your email to verify.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <motion.div className="auth-form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="AMHAN" style={{ height: '28px', objectFit: 'contain' }} />
          </Link>
          <h1>Create Account</h1>
          <p className="subtitle">Join AMHAN for exclusive men's fashion</p>

          <button className="google-btn" onClick={signInWithGoogle} type="button">
            <FcGoogle size={20} /> Continue with Google
          </button>

          <div className="divider">or sign up with email</div>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="input-group">
                <label>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <HiOutlineUser style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe" style={{ paddingLeft: '2.5rem' }} required />
                </div>
              </div>
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
                    onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-tertiary)' }}>
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <HiOutlineLockClosed style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input className="input-field" type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password"
                    style={{ paddingLeft: '2.5rem' }} required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
          </p>
        </motion.div>
      </div>

      <div className="auth-right">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', color: 'white', maxWidth: 400 }}>
          <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Join the Movement</h2>
          <p style={{ fontSize: '1rem', opacity: 0.7, lineHeight: 1.7 }}>
            Be part of a community that values bold fashion and premium quality menswear.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
