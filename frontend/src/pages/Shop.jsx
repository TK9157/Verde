import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye, HiOutlineAdjustments } from 'react-icons/hi';
import { demoProducts, demoCategories, formatPrice, getDiscount } from '../data/products';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 99999]);

  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const activeTag = searchParams.get('tag') || '';

  const filtered = useMemo(() => {
    let result = [...demoProducts];
    if (activeCategory !== 'all') result = result.filter(p => p.category_id === activeCategory);
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTag) result = result.filter(p => p.tags.includes(activeTag));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': return result.sort((a, b) => a.price - b.price);
      case 'price-high': return result.sort((a, b) => b.price - a.price);
      case 'newest': return result.sort((a, b) => b.id.localeCompare(a.id));
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      default: return result;
    }
  }, [activeCategory, searchQuery, activeTag, sortBy, priceRange]);

  const handleAddToCart = (product) => {
    addItem(product, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart!`, { style: { borderRadius: '10px', background: '#0A0A0A', color: '#fff' } });
  };

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {activeCategory !== 'all'
              ? demoCategories.find(c => c.slug === activeCategory)?.name || 'Shop'
              : searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          </motion.h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Category Filters */}
        <div className="shop-controls">
          <div className="filter-tags">
            <Link to="/shop" className={`filter-tag ${activeCategory === 'all' && !activeTag ? 'active' : ''}`}>All</Link>
            {demoCategories.map(cat => (
              <Link key={cat.id} to={`/shop?category=${cat.slug}`} className={`filter-tag ${activeCategory === cat.slug ? 'active' : ''}`}>
                {cat.name}
              </Link>
            ))}
            <Link to="/shop?tag=new" className={`filter-tag ${activeTag === 'new' ? 'active' : ''}`}>🔥 New</Link>
            <Link to="/shop?tag=sale" className={`filter-tag ${activeTag === 'sale' ? 'active' : ''}`}>💰 Sale</Link>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <HiOutlineAdjustments style={{ color: 'var(--text-secondary)' }} />
            <select
              className="input-field"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '0.5rem 1rem', minWidth: '160px' }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid-4">
            {filtered.map((product, i) => {
              const discount = getDiscount(product.price, product.compare_price);
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="product-card">
                    <div className="product-image">
                      {discount > 0 && <span className="product-badge badge badge-green">-{discount}%</span>}
                      <Link to={`/product/${product.slug}`}>
                        <img src={product.images[0]} alt={product.name} loading="lazy" />
                      </Link>
                      <div className="product-actions">
                        <button onClick={() => handleAddToCart(product)} title="Add to cart"><HiOutlineShoppingBag /></button>
                        <button title="Wishlist"><HiOutlineHeart /></button>
                        <Link to={`/product/${product.slug}`}><button title="View"><HiOutlineEye /></button></Link>
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
                        {discount > 0 && <span className="discount">-{discount}%</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
            <h3>No products found</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Try adjusting your filters</p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>View All Products</Link>
          </div>
        )}
      </div>
    </div>
  );
}
