import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookSquare, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 style={{ fontSize: '1.5rem', letterSpacing: '0.15em', marginBottom: '0.75rem', color: 'var(--text-light)', fontWeight: 700, fontFamily: 'var(--font-body)' }}>AMHAN</h3>
              <p style={{ maxWidth: 280, marginBottom: '1rem', fontSize: '0.8125rem', lineHeight: 1.8 }}>
                AMHAN, a premium men's fashion brand, emerged as a manifestation of our founder's unwavering principles. Infused with an innate love for streetwear, we persistently redefine the boundaries of exploration and style.
              </p>
              <p style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-light-secondary)', marginBottom: '1rem' }}>
                AMHAN FASHION
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
                  style={{ width: 36, height: 36, borderRadius: 'var(--radius-full)', background: 'var(--bg-dark-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light-secondary)', transition: 'all 0.2s ease' }}>
                  <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
                  style={{ width: 36, height: 36, borderRadius: 'var(--radius-full)', background: 'var(--bg-dark-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light-secondary)', transition: 'all 0.2s ease' }}>
                  <FaFacebookSquare />
                </a>
              </div>
            </div>

            <div>
              <h3>The Company</h3>
              <Link to="/">Home</Link>
              <Link to="/shop">Products</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div>
              <h3>Pages</h3>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
              <Link to="/cookies">Cookies Policy</Link>
              <Link to="/refund">Refund Policy</Link>
            </div>

            <div>
              <h3>Nearby Store</h3>
              <a href="#">Location 1</a>
              <a href="#">Location 2</a>
              <a href="#">Location 3</a>
            </div>

            <div>
              <h3>Orders</h3>
              <Link to="/cart">View Cart</Link>
              <Link to="/orders">Track Orders</Link>
            </div>
          </div>

          <div className="footer-bottom">
            {/* Payment Icons */}
            <div className="payment-icons">
              {['AMEX', 'APPLE', 'DINER', 'DISC', 'GPAY', 'MSTRO', 'MC', 'PPAY', 'DPAY', 'UPAY', 'VISA'].map(icon => (
                <div key={icon} className="pay-icon">{icon}</div>
              ))}
            </div>
            <p>Copyright Reserved by AMHAN.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        <FaWhatsapp />
      </a>
    </>
  );
}
