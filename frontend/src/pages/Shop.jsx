import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye, HiOutlineAdjustments } from 'react-icons/hi';
import { formatPrice, getDiscount } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

/* ── Gender mapping for existing products (no product data changes) ── */
const genderMap = {
  'oversized-jeans': 'men',
  'oversized-shirts': 'men',
  'oversized-tshirts': 'unisex',
  'regular-jeans': 'men',
  'regular-shirts': 'men',
  'regular-tshirts': 'unisex',
  'shoes': 'accessories',
  'watches': 'accessories',
  'bags': 'accessories',
  'sunglasses': 'accessories',
};

function getProductGender(product) {
  return genderMap[product.category_id] || 'unisex';
}

const genderFilters = [
  { value: 'all', label: 'All' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'accessories', label: 'Accessories' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const { products, categories } = useProducts();
  const [sortBy, setSortBy] = useState('featured');

  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const activeTag = searchParams.get('tag') || '';
  const activeGender = searchParams.get('gender') || 'all';

  const filtered = useMemo(() => {
    let result = [...products];

    // Gender filter
    if (activeGender !== 'all') {
      result = result.filter(p => getProductGender(p) === activeGender);
    }

    if (activeCategory !== 'all') result = result.filter(p => p.category_id === activeCategory);
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTag) result = result.filter(p => p.tags.includes(activeTag));

    switch (sortBy) {
      case 'price-low': return result.sort((a, b) => a.price - b.price);
      case 'price-high': return result.sort((a, b) => b.price - a.price);
      case 'newest': return result.sort((a, b) => b.id.localeCompare(a.id));
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      default: return result;
    }
  }, [activeCategory, searchQuery, activeTag, activeGender, sortBy, products]);

  const handleAddToCart = (product) => {
    addItem(product, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart!`);
  };

  const pageTitle = useMemo(() => {
    if (activeGender !== 'all') {
      const genderLabel = genderFilters.find(g => g.value === activeGender)?.label || 'Shop';
      return `${genderLabel}'s Collection`;
    }
    if (activeCategory !== 'all') {
      return categories.find(c => c.slug === activeCategory)?.name || 'Shop';
    }
    if (searchQuery) return `Results for "${searchQuery}"`;
    return 'All Products';
  }, [activeGender, activeCategory, searchQuery, categories]);

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {pageTitle}
          </motion.h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Gender Filters */}
        <div className="shop-controls" style={{ marginBottom: '0.75rem' }}>
          <div className="filter-tags">
            {genderFilters.map(g => (
              <Link
                key={g.value}
                to={g.value === 'all' ? '/shop' : `/shop?gender=${g.value}`}
                className={`filter-tag ${activeGender === g.value || (g.value === 'all' && activeGender === 'all' && !activeCategory && !activeTag) ? 'active' : ''}`}
                style={{ fontWeight: 700 }}
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="shop-controls">
          <div className="filter-tags">
            <Link to="/shop" className={`filter-tag ${activeCategory === 'all' && !activeTag && activeGender === 'all' ? 'active' : ''}`}>All</Link>
            {categories.map(cat => (
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
              style={{ padding: '0.5rem 1rem', minWidth: '160px', fontSize: '0.75rem' }}
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
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <div className="product-card">
                    <div className="product-image">
                      {discount > 0 && <span className="product-badge">-{discount}%</span>}
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
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>No products found</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.875rem' }}>Try adjusting your filters</p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>View All Products</Link>
          </div>
        )}
      </div>
    </div>
  );
}
