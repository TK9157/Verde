import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye } from 'react-icons/hi';
import { formatPrice, getDiscount } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const { addItem } = useCart();
  const { products, categories } = useProducts();
  const featured = products.filter(p => p.is_featured).slice(0, 8);
  const newArrivals = products.filter(p => p.tags?.includes('new')).slice(0, 4);

  return (
    <div>
      {/* Hero — Full-screen centered like stagmenfashion */}
      <section className="hero">
        {/* Background watermark text */}
        <div className="hero-bg-text">AMHAN</div>

        {/* Side text */}
        <div className="hero-side-text left">
          <div>"Style to Statement"</div>
        </div>
        <div className="hero-side-text right">
          <div>New Collection</div>
          <div style={{ marginTop: '0.25rem' }}>2025</div>
        </div>

        {/* Model Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=900&fit=crop"
          alt="AMHAN Fashion"
          className="hero-model-img"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

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

      {/* Categories — Grid */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our men's fashion collections</p>
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

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked styles for the modern man</p>
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

      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        padding: 'var(--space-3xl) 0', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              New Season Drop
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 2rem', fontSize: '0.9375rem' }}>
              Discover our latest collection with up to 40% off on selected items
            </p>
            <Link to="/shop?tag=sale" className="btn btn-lg" style={{ background: 'white', color: 'black' }}>Shop Sale <HiOutlineArrowRight /></Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
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

      {/* Trust Badges */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
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
