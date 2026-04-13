import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaFacebookF, FaPinterest } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1rem' }}>
              <span style={{
                width: 32, height: 32, background: 'var(--primary)', borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.875rem'
              }}>V</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-light)' }}>
                VERDE
              </span>
            </Link>
            <p style={{ maxWidth: 300, marginBottom: '1.5rem' }}>
              Premium clothing that blends sustainability with style. Crafted for the modern wardrobe.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                className="input-field"
                placeholder="Enter your email"
                style={{ flex: 1, background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }}
              />
              <button className="btn btn-primary btn-sm">
                <HiOutlineMail />
              </button>
            </div>
          </div>

          <div>
            <h3>Shop</h3>
            <Link to="/shop?category=men">Men's Collection</Link>
            <Link to="/shop?category=women">Women's Collection</Link>
            <Link to="/shop?category=accessories">Accessories</Link>
            <Link to="/shop?tag=new">New Arrivals</Link>
            <Link to="/shop?tag=sale">Sale</Link>
          </div>

          <div>
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/sustainability">Sustainability</Link>
          </div>

          <div>
            <h3>Help</h3>
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping">Shipping Info</Link>
            <Link to="/returns">Returns</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} VERDE. All rights reserved.</p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest"><FaPinterest /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
