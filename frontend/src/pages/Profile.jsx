import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLogout, HiOutlineShoppingBag } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, profile, signOut, updateProfile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(form);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + var(--space-2xl))', minHeight: '100vh', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-xl)' }}>My Profile</h1>

          <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', border: '1px solid var(--border-light)' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', borderBottom: '1px solid var(--border)' }}>
              <div style={{
                width: 72, height: 72, borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-heading)'
              }}>
                {(profile?.full_name || user?.email || '?')[0].toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem' }}>{profile?.full_name || 'User'}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user?.email}</p>
                {isAdmin && <span className="badge badge-green" style={{ marginTop: '0.5rem' }}>Admin</span>}
              </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div className="input-group">
                <label><HiOutlineUser style={{ verticalAlign: 'middle', marginRight: 6 }} />Full Name</label>
                {editing ? (
                  <input className="input-field" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                ) : (
                  <p style={{ padding: '0.75rem 1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    {profile?.full_name || 'Not set'}
                  </p>
                )}
              </div>
              <div className="input-group">
                <label><HiOutlineMail style={{ verticalAlign: 'middle', marginRight: 6 }} />Email</label>
                <p style={{ padding: '0.75rem 1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
                  {user?.email}
                </p>
              </div>
              <div className="input-group">
                <label><HiOutlinePhone style={{ verticalAlign: 'middle', marginRight: 6 }} />Phone</label>
                {editing ? (
                  <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                ) : (
                  <p style={{ padding: '0.75rem 1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    {profile?.phone || 'Not set'}
                  </p>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'var(--space-xl)' }}>
              {editing ? (
                <>
                  <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                  <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-secondary" onClick={() => setEditing(true)}>Edit Profile</button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
            <button className="btn btn-ghost" onClick={() => navigate('/orders')} style={{ justifyContent: 'flex-start', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
              <HiOutlineShoppingBag style={{ fontSize: '1.25rem' }} /> Order History
            </button>
            <button className="btn btn-ghost" onClick={handleLogout} style={{ justifyContent: 'flex-start', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--error)' }}>
              <HiOutlineLogout style={{ fontSize: '1.25rem' }} /> Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
