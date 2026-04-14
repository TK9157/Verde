import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineSearch, HiOutlineMenu, HiOutlineX, HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useProducts } from '../../contexts/ProductsContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isSuperAdmin } = useAuth();
  const { itemCount } = useCart();
  const { categories } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const mainSections = [
    { label: 'Home', to: '/' },
    { label: 'Shop All', to: '/shop' },
    { label: 'Men', to: '/shop?gender=men' },
    { label: 'Women', to: '/shop?gender=women' },
    { label: 'Unisex', to: '/shop?gender=unisex' },
    { label: 'Accessories', to: '/shop?gender=accessories' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="nav-left">
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <HiOutlineMenu />
            </button>
          </div>

          <Link to="/" className="logo">
            <img src="/logo.png" alt="AMHAN" style={{ height: '32px', objectFit: 'contain' }} />
          </Link>

          <div className="nav-actions">
            <button className="cart-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <HiOutlineSearch />
            </button>
            <button className="cart-btn" onClick={() => navigate('/cart')} aria-label="Cart">
              <HiOutlineShoppingBag />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div style={{
          position: 'fixed', top: 'var(--navbar-height)', left: 0, right: 0, zIndex: 999,
          background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)',
          padding: '1rem', animation: 'slideDown 0.3s ease'
        }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
              <input
                className="input-field"
                placeholder="Search products..."
                style={{ flex: 1 }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/shop?search=${e.target.value}`);
                    setSearchOpen(false);
                  }
                }}
              />
              <button className="btn btn-primary" onClick={() => setSearchOpen(false)}>Search</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Sidebar Menu */}
      <div className={`sidebar-menu ${menuOpen ? 'open' : ''}`}>
        <button className="menu-close" onClick={() => setMenuOpen(false)}>
          <HiOutlineX />
        </button>

        {/* Search in menu */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>Search Products</h4>
          <input
            className="input-field"
            placeholder="Search..."
            style={{ width: '100%', background: 'white', fontSize: '0.8125rem' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/shop?search=${e.target.value}`);
                setMenuOpen(false);
              }
            }}
          />
        </div>

        {/* Main Sections */}
        <h4 style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>Menu</h4>

        {mainSections.map((item, i) => (
          <Link key={i} to={item.to} className="menu-item" onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}

        {/* Category Tags */}
        <h4 style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', marginTop: '1.5rem', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>Categories</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {categories.map(cat => (
            <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.375rem 0.75rem', background: 'white', borderRadius: 'var(--radius-sm)',
                fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
                color: 'var(--text-primary)', transition: 'all 0.2s ease', border: '1px solid var(--border-light)'
              }}>
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Bottom links */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          {[
            { label: 'About AMHAN', to: '/about' },
            { label: 'Contact Us', to: '/contact' },
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Use', to: '/terms' },
            { label: 'Refund Policy', to: '/refund' },
          ].map((item, i) => (
            <Link key={i} to={item.to} onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '0.5rem 0', fontSize: '0.75rem', fontWeight: 500,
                color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em'
              }}>
              {item.label}
            </Link>
          ))}

          {/* Admin Panel — only for super admin */}
          {isSuperAdmin && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: 700,
                color: '#D4A945', textTransform: 'uppercase', letterSpacing: '0.06em',
                marginTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1rem'
              }}>
              ⚙ Admin Panel
            </Link>
          )}
        </div>

        {/* Account */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          {user ? (
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="menu-item">My Account</Link>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="menu-item">Login / Register</Link>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
