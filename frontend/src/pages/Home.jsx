import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye } from 'react-icons/hi';
import { formatPrice, getDiscount } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';
import Hero3D from '../components/Hero3D';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

/* ─── Gender Section Images (Unsplash) ─── */
const sectionImages = {
  men: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop',
  women: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1000&fit=crop',
  unisex: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop',
};

const accessoryCards = [
  { label: 'Shoes', to: '/shop?category=shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop', icon: '👟' },
  { label: 'Watches', to: '/shop?category=watches', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop', icon: '⌚' },
  { label: 'Bags', to: '/shop?category=bags', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=400&fit=crop', icon: '👜' },
  { label: 'Sunglasses', to: '/shop?category=sunglasses', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop', icon: '🕶️' },
];

export default function Home() {
  const { addItem } = useCart();
  const { products, categories } = useProducts();
  const featured = products.filter(p => p.is_featured).slice(0, 8);
  const newArrivals = products.filter(p => p.tags?.includes('new')).slice(0, 4);

  return (
    <div>
      {/* ═══ HERO ━ 3D Interactive ═══ */}
      <section className="hero">
        <div className="hero-bg-text">AMHAN</div>

        <div className="hero-side-text left">
          <div>"Style to Statement"</div>
        </div>
        <div className="hero-side-text right">
          <div>New Collection</div>
          <div style={{ marginTop: '0.25rem' }}>2026</div>
        </div>

        {/* 3D Canvas behind text */}
        {/* Interactive parallax hero */}
        <Hero3D />

        {/* Center content */}
        <div className="hero-content">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '0.75rem' }}>
            <motion.div
              className="hero-brand-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <img src="/logo.png" alt="AMHAN" style={{ height: 'clamp(50px, 12vw, 120px)', objectFit: 'contain' }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/shop" className="hero-shop-btn">
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ GENDER SECTIONS ═══ */}

      {/* ── MEN ── */}
      <section className="gender-section">
        <motion.div className="gender-section-inner" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="gender-img-wrap">
            <img src={sectionImages.men} alt="Men's Collection" />
            <div className="gender-img-overlay" />
          </div>
          <div className="gender-text">
            <span className="gender-label">Collection</span>
            <h2 className="gender-title">Men</h2>
            <p className="gender-desc">Bold silhouettes & street-ready fits. Oversized denim, graphic tees, and signature styles crafted for the modern man.</p>
            <Link to="/shop?gender=men" className="btn btn-secondary btn-lg">Explore Men <HiOutlineArrowRight /></Link>
          </div>
        </motion.div>
      </section>

      {/* ── WOMEN ── */}
      <section className="gender-section gender-section--alt">
        <motion.div className="gender-section-inner" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="gender-text">
            <span className="gender-label">Collection</span>
            <h2 className="gender-title">Women</h2>
            <p className="gender-desc">Effortless elegance meets contemporary edge. Statement pieces, flowing fabrics, and curated essentials for her.</p>
            <Link to="/shop?gender=women" className="btn btn-secondary btn-lg">Explore Women <HiOutlineArrowRight /></Link>
          </div>
          <div className="gender-img-wrap">
            <img src={sectionImages.women} alt="Women's Collection" />
            <div className="gender-img-overlay" />
          </div>
        </motion.div>
      </section>

      {/* ── UNISEX ── */}
      <section className="gender-section gender-section--full" style={{ background: 'var(--bg-secondary)' }}>
        <motion.div className="gender-full-inner" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="gender-full-img">
            <img src={sectionImages.unisex} alt="Unisex Collection" />
            <div className="gender-full-content">
              <span className="gender-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Gender Neutral</span>
              <h2 className="gender-title" style={{ color: 'white' }}>Unisex</h2>
              <p className="gender-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Designed without boundaries. Timeless pieces made for everyone.</p>
              <Link to="/shop?gender=unisex" className="btn btn-lg" style={{ background: 'white', color: 'black' }}>Shop Unisex <HiOutlineArrowRight /></Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── ACCESSORIES ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Accessories</h2>
            <p>Complete your look with curated essentials</p>
            <div className="accent-line" />
          </div>
          <div className="accessories-grid">
            {accessoryCards.map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to={item.to} className="accessory-card">
                  <div className="accessory-card-img">
                    <img src={item.img} alt={item.label} />
                  </div>
                  <div className="accessory-card-info">
                    <span className="accessory-icon">{item.icon}</span>
                    <h3>{item.label}</h3>
                    <span className="accessory-cta">Shop Now <HiOutlineArrowRight /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our fashion collections</p>
            <div className="accent-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to={`/shop?category=${cat.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                    aspectRatio: '3/4', cursor: 'pointer', background: 'var(--bg-tertiary)'
                  }}>
                    <img
                      src={cat.image_url} alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.7))',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem',
                    }}>
                      <h3 style={{ color: 'white', fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked styles for you</p>
            <div className="accent-line" />
          </div>
          <div className="grid-4">
            {featured.map((product, i) => (
              <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}>
                <ProductCard product={product} onAddToCart={() => addItem(product, product.sizes[0], product.colors[0])} />
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/shop" className="btn btn-secondary btn-lg">View All Products <HiOutlineArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ═══ NEW ARRIVALS ═══ */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>New Arrivals</h2>
            <p>Fresh drops — be the first to wear them</p>
            <div className="accent-line" />
          </div>
          <div className="grid-4">
            {newArrivals.map((product, i) => (
              <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <ProductCard product={product} onAddToCart={() => addItem(product, product.sizes[0], product.colors[0])} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BADGES ═══ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over ₹999' },
              { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
              { icon: '🛡️', title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: '💬', title: 'WhatsApp Support', desc: 'Chat with us anytime' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{ padding: '2rem 1rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.375rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const discount = getDiscount(product.price, product.compare_price);
  return (
    <div className="product-card">
      <div className="product-image">
        {discount > 0 && <span className="product-badge">-{discount}%</span>}
        <Link to={`/product/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
        </Link>
        <div className="product-actions">
          <button onClick={onAddToCart} title="Add to cart"><HiOutlineShoppingBag /></button>
          <button title="Wishlist"><HiOutlineHeart /></button>
          <Link to={`/product/${product.slug}`}><button title="Quick view"><HiOutlineEye /></button></Link>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category_name}</div>
        <Link to={`/product/${product.slug}`}>
          <div className="product-name">{product.name}</div>
        </Link>
        <div className="product-price">
          <span className="current">{formatPrice(product.price)}</span>
          {discount > 0 && <span className="original">{formatPrice(product.compare_price)}</span>}
        </div>
      </div>
    </div>
  );
}
