import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineHeart, HiOutlineSearch, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={!scrolled ? { background: 'transparent' } : {}}>
        <div className="navbar-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">V</span>
            VERDE
          </Link>

          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/shop?category=men">Men</NavLink>
            <NavLink to="/shop?category=women">Women</NavLink>
            <NavLink to="/shop?category=accessories">Accessories</NavLink>
          </div>

          <div className="nav-actions">
            <button className="cart-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <HiOutlineSearch />
            </button>
            <button className="cart-btn" onClick={() => navigate('/wishlist')} aria-label="Wishlist">
              <HiOutlineHeart />
            </button>
            <button className="cart-btn" onClick={() => navigate('/cart')} aria-label="Cart">
              <HiOutlineShoppingBag />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </button>
            <button className="cart-btn" onClick={() => navigate(user ? '/profile' : '/login')} aria-label="Account">
              <HiOutlineUser />
            </button>
            {isAdmin && (
              <Link to="/admin" className="btn btn-sm btn-primary" style={{ marginLeft: '0.5rem' }}>
                Admin
              </Link>
            )}
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div style={{
          position: 'fixed', top: 'var(--navbar-height)', left: 0, right: 0, zIndex: 999,
          background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)',
          padding: '1rem', animation: 'slideDown 0.3s ease'
        }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
              <input
                className="input-field"
                placeholder="Search for products..."
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 998, background: 'var(--bg-primary)',
          paddingTop: 'var(--navbar-height)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '2rem'
        }}>
          <NavLink to="/" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Shop</NavLink>
          <NavLink to="/shop?category=men" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Men</NavLink>
          <NavLink to="/shop?category=women" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Women</NavLink>
          <NavLink to="/cart" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Cart ({itemCount})</NavLink>
          {user ? (
            <NavLink to="/profile" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Profile</NavLink>
          ) : (
            <NavLink to="/login" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Login</NavLink>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
