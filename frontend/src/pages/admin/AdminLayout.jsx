import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { HiOutlineChartBar, HiOutlineCube, HiOutlineShoppingCart, HiOutlineUsers, HiOutlineCog, HiOutlineTag, HiOutlineUserGroup, HiOutlineLogout, HiOutlineMenu, HiOutlineExternalLink } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/admin', icon: <HiOutlineChartBar />, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: <HiOutlineCube />, label: 'Products' },
  { to: '/admin/orders', icon: <HiOutlineShoppingCart />, label: 'Orders' },
  { to: '/admin/customers', icon: <HiOutlineUsers />, label: 'Customers' },
  { to: '/admin/categories', icon: <HiOutlineTag />, label: 'Categories' },
  { to: '/admin/admins', icon: <HiOutlineUserGroup />, label: 'Admin Management' },
  { to: '/admin/settings', icon: <HiOutlineCog />, label: 'Settings' },
];

export default function AdminLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo">
          <span className="logo-dot">A</span>
          AMHAN Admin
        </div>

        <nav>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
          <NavLink to="/" className="nav-item" style={{ color: 'var(--primary-light)' }}>
            <span className="nav-icon"><HiOutlineExternalLink /></span>
            View Store
          </NavLink>
          <button onClick={handleLogout} className="nav-item" style={{ width: '100%', color: 'var(--error)', background: 'transparent' }}>
            <span className="nav-icon"><HiOutlineLogout /></span>
            Logout
          </button>
        </div>

        {/* User Info */}
        <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', background: 'var(--bg-dark-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-full)',
            background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '0.875rem'
          }}>
            {(profile?.full_name || 'A')[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-light)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {profile?.full_name || 'Admin'}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-light-secondary)' }}>{profile?.role || 'admin'}</div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="admin-content">
        {/* Mobile Toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          display: 'none', position: 'fixed', top: 16, left: 16, zIndex: 101,
          width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--bg-dark-secondary)',
          border: '1px solid var(--border-dark)', color: 'var(--text-light)', fontSize: '1.25rem',
          alignItems: 'center', justifyContent: 'center'
        }} className="admin-mobile-toggle">
          <HiOutlineMenu />
        </button>

        <Outlet />
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
