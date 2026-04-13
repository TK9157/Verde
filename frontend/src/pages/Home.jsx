import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye } from 'react-icons/hi';
import { demoProducts, demoCategories, formatPrice, getDiscount } from '../data/products';
import { useCart } from '../contexts/CartContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const { addItem } = useCart();
  const featured = demoProducts.filter(p => p.is_featured).slice(0, 4);
  const newArrivals = demoProducts.filter(p => p.tags.includes('new')).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="container">
          <div className="hero-content">
            <motion.div className="hero-text" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <h1>
                Redefine Your<br />
                <span>Style</span> With<br />
                Purpose
              </h1>
              <p>
                Premium sustainable clothing crafted for the conscious modern wardrobe.
                Where ethical fashion meets timeless design.
              </p>
              <div className="hero-actions">
                <Link to="/shop" className="btn btn-primary btn-lg">
                  Shop Collection <HiOutlineArrowRight />
                </Link>
                <Link to="/shop?tag=new" className="btn btn-secondary btn-lg">
                  New Arrivals
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <h3>200+</h3>
                  <p>Premium Products</p>
                </div>
                <div className="stat">
                  <h3>15K+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat">
                  <h3>4.9★</h3>
                  <p>Average Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="hero-image" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="hero-img-wrapper">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=750&fit=crop" alt="Verde Fashion" />
              </div>
              <motion.div className="hero-floating-card top-left" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🌿</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Eco Friendly</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>100% Sustainable</div>
                  </div>
                </div>
              </motion.div>
              <motion.div className="hero-floating-card bottom-right" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>⭐</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Premium Quality</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Handcrafted Details</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our curated collections designed for every style</p>
            <div className="accent-line" />
          </div>
          <div className="grid-3">
            {demoCategories.map((cat, i) => (
              <motion.div key={cat.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.15 }}>
                <Link to={`/shop?category=${cat.slug}`} style={{ display: 'block' }}>
                  <div style={{
                    position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                    aspectRatio: '3/2', cursor: 'pointer'
                  }}>
                    <img src={cat.image_url} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7))',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                    }}>
                      <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.25rem' }}>{cat.name}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{cat.description}</p>
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
            <p>Handpicked essentials for your modern wardrobe</p>
            <div className="accent-line" />
          </div>
          <div className="grid-4">
            {featured.map((product, i) => (
              <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
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
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--primary-darker) 100%)',
        padding: 'var(--space-3xl) 0', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>
              New Season, New <span style={{ color: 'var(--primary-lighter)' }}>Style</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 2rem', fontSize: '1.125rem' }}>
              Discover our latest collection with up to 40% off on selected items
            </p>
            <Link to="/shop?tag=sale" className="btn btn-primary btn-lg">Shop Sale <HiOutlineArrowRight /></Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>New Arrivals</h2>
            <p>Fresh styles just dropped — be the first to wear them</p>
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
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over ₹1,999' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '🛡️', title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: '💬', title: '24/7 Support', desc: 'Dedicated help center' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{ padding: '2rem 1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.375rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{item.desc}</p>
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
        {discount > 0 && <span className="product-badge badge badge-green">-{discount}%</span>}
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
