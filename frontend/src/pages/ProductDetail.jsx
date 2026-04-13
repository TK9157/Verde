import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineHeart, HiStar, HiOutlineTruck, HiOutlineRefresh, HiOutlineShieldCheck } from 'react-icons/hi';
import { formatPrice, getDiscount } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const { products } = useProducts();
  const product = products.find(p => p.slug === slug);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div style={{ paddingTop: 'calc(var(--navbar-height) + 4rem)', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const discount = getDiscount(product.price, product.compare_price);
  const related = products.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a color'); return; }
    addItem(product, selectedSize, selectedColor, quantity);
    toast.success('Added to cart!', { style: { borderRadius: '10px', background: '#0A0A0A', color: '#fff' } });
  };

  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--text-secondary)' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3xl)', alignItems: 'start' }}>
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div style={{
              borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/4',
              background: 'var(--bg-secondary)', position: 'relative'
            }}>
              {discount > 0 && (
                <span className="badge badge-green" style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                  -{discount}% OFF
                </span>
              )}
              <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>{product.category_name}</span>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>{product.name}</h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', color: 'var(--warning)' }}>
                {[...Array(5)].map((_, i) => <HiStar key={i} style={{ opacity: i < Math.floor(product.rating) ? 1 : 0.3 }} />)}
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{product.rating} (24 reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700 }}>{formatPrice(product.price)}</span>
              {discount > 0 && (
                <>
                  <span style={{ fontSize: '1.125rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{formatPrice(product.compare_price)}</span>
                  <span className="badge badge-green">Save {discount}%</span>
                </>
              )}
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>{product.description}</p>

            {/* Size Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.75rem' }}>
                Size: {selectedSize && <span style={{ color: 'var(--primary)' }}>{selectedSize}</span>}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)',
                      border: `2px solid ${selectedSize === size ? 'var(--primary)' : 'var(--border)'}`,
                      background: selectedSize === size ? 'var(--bg-tertiary)' : 'transparent',
                      fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                      color: selectedSize === size ? 'var(--primary)' : 'var(--text-primary)',
                      transition: 'all 0.2s ease'
                    }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.75rem' }}>
                Color: {selectedColor && <span style={{ color: 'var(--primary)' }}>{selectedColor}</span>}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)',
                      border: `2px solid ${selectedColor === color ? 'var(--primary)' : 'var(--border)'}`,
                      background: selectedColor === color ? 'var(--bg-tertiary)' : 'transparent',
                      fontWeight: 500, fontSize: '0.8125rem', cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={handleAddToCart}>
                <HiOutlineShoppingBag /> Add to Cart
              </button>
              <button className="btn btn-icon btn-secondary" style={{ width: 52, height: 52 }}><HiOutlineHeart /></button>
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', gap: '1.5rem', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              {[
                { icon: <HiOutlineTruck />, text: 'Free Delivery' },
                { icon: <HiOutlineRefresh />, text: '30 Day Returns' },
                { icon: <HiOutlineShieldCheck />, text: 'Secure Payment' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 'var(--space-3xl)' }}>
          <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--border)', marginBottom: 'var(--space-xl)' }}>
            {['description', 'reviews', 'shipping'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 2rem', fontWeight: 600, fontSize: '0.9375rem', background: 'transparent',
                  borderBottom: `2px solid ${activeTab === tab ? 'var(--primary)' : 'transparent'}`,
                  color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease', textTransform: 'capitalize', marginBottom: '-2px'
                }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ maxWidth: 700 }}>
            {activeTab === 'description' && <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{product.description} Crafted with attention to every detail, this piece represents our commitment to quality and sustainability. Ethically sourced materials meet expert craftsmanship.</p>}
            {activeTab === 'reviews' && <p style={{ color: 'var(--text-secondary)' }}>Reviews will be loaded from Supabase when connected. Average rating: {product.rating}/5</p>}
            {activeTab === 'shipping' && <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Free shipping on orders over ₹1,999. Standard delivery takes 3-5 business days. Express delivery available at checkout. 30-day hassle-free returns.</p>}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-xl)' }}>You May Also Like</h2>
            <div className="grid-4">
              {related.map(p => {
                const d = getDiscount(p.price, p.compare_price);
                return (
                  <div key={p.id} className="product-card">
                    <div className="product-image">
                      {d > 0 && <span className="product-badge badge badge-green">-{d}%</span>}
                      <Link to={`/product/${p.slug}`}><img src={p.images[0]} alt={p.name} loading="lazy" /></Link>
                    </div>
                    <div className="product-info">
                      <div className="product-category">{p.category_name}</div>
                      <Link to={`/product/${p.slug}`}><div className="product-name">{p.name}</div></Link>
                      <div className="product-price">
                        <span className="current">{formatPrice(p.price)}</span>
                        {d > 0 && <span className="original">{formatPrice(p.compare_price)}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
