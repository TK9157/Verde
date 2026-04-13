import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiOutlineArrowRight } from 'react-icons/hi';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../data/products';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</p>
            <h2>Your cart is empty</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '2rem' }}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg">Start Shopping <HiOutlineArrowRight /></Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const shipping = subtotal >= 1999 ? 0 : 199;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ fontSize: '2rem' }}>Shopping Cart <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>({itemCount} items)</span></h1>
            <button className="btn btn-ghost" style={{ color: 'var(--error)' }} onClick={clearCart}>Clear Cart</button>
          </div>
        </motion.div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item, i) => (
              <motion.div key={`${item.id}-${item.size}-${item.color}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="cart-item">
                <Link to={`/product/${item.slug}`}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                  <div>
                    <Link to={`/product/${item.slug}`}><h3>{item.name}</h3></Link>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      {item.size && `Size: ${item.size}`} {item.color && `• Color: ${item.color}`}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem' }}>{formatPrice(item.price * item.quantity)}</span>
                      <button onClick={() => removeItem(item.id, item.size, item.color)}
                        style={{ color: 'var(--error)', background: 'transparent', fontSize: '1.25rem', padding: '0.25rem' }}>
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? 'var(--primary)' : 'inherit' }}>
                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax (GST 18%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            {shipping > 0 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.75rem', textAlign: 'center' }}>
                Add {formatPrice(1999 - subtotal)} more for free shipping!
              </p>
            )}
            <Link to="/checkout" className="btn btn-primary btn-lg w-full" style={{ marginTop: '1.5rem' }}>
              Proceed to Checkout <HiOutlineArrowRight />
            </Link>
            <Link to="/shop" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
