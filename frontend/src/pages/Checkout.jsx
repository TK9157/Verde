import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../data/products';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: user?.email || '',
    phone: '', address: '', city: '', state: '', pincode: '', notes: ''
  });

  const shipping = subtotal >= 1999 ? 0 : 199;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    // ─── Razorpay Integration Placeholder ───
    // When Razorpay is connected, this will:
    // 1. POST to /api/create-order with cart items and total
    // 2. Receive razorpay_order_id from backend
    // 3. Open Razorpay checkout popup
    // 4. On success, verify payment with backend
    // 5. Create order in Supabase
    //
    // For now, we simulate a successful order:
    setTimeout(() => {
      toast.success('Order placed successfully! 🎉', { duration: 4000 });
      clearCart();
      navigate('/order-success');
      setLoading(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>No items to checkout</h2>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '2rem', marginBottom: 'var(--space-xl)' }}>
          Checkout
        </motion.h1>

        <form onSubmit={handlePayment}>
          <div className="checkout-layout">
            <motion.div className="checkout-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {!user && (
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem' }}>Already have an account?</span>
                  <Link to="/login" className="btn btn-sm btn-secondary">Log In</Link>
                </div>
              )}

              <h2>Shipping Information</h2>
              <div className="checkout-form">
                <div className="form-grid">
                  <div className="input-group">
                    <label>First Name *</label>
                    <input className="input-field" name="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Last Name *</label>
                    <input className="input-field" name="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-grid" style={{ marginTop: 'var(--space-md)' }}>
                  <div className="input-group">
                    <label>Email *</label>
                    <input className="input-field" type="email" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Phone *</label>
                    <input className="input-field" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="input-group" style={{ marginTop: 'var(--space-md)' }}>
                  <label>Address *</label>
                  <input className="input-field" name="address" value={form.address} onChange={handleChange} placeholder="House no., Street, Area" required />
                </div>
                <div className="form-grid" style={{ marginTop: 'var(--space-md)' }}>
                  <div className="input-group">
                    <label>City *</label>
                    <input className="input-field" name="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>State *</label>
                    <input className="input-field" name="state" value={form.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-grid" style={{ marginTop: 'var(--space-md)' }}>
                  <div className="input-group">
                    <label>PIN Code *</label>
                    <input className="input-field" name="pincode" value={form.pincode} onChange={handleChange} required />
                  </div>
                  <div></div>
                </div>
                <div className="input-group" style={{ marginTop: 'var(--space-md)' }}>
                  <label>Order Notes (optional)</label>
                  <textarea className="input-field" name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any special instructions..." />
                </div>
              </div>

              {/* Payment Section Placeholder */}
              <h2 style={{ marginTop: 'var(--space-2xl)' }}>Payment Method</h2>
              <div style={{
                border: '2px dashed var(--primary)', borderRadius: 'var(--radius-lg)',
                padding: '2rem', textAlign: 'center', background: 'var(--bg-tertiary)'
              }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</p>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Razorpay Payment Gateway</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Razorpay will be integrated here. Supports UPI, Cards, Net Banking, Wallets, and more.
                </p>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="cart-summary">
              <h2>Order Summary</h2>
              {items.map(item => (
                <div key={`${item.id}-${item.size}-${item.color}`} style={{
                  display: 'flex', gap: '0.75rem', padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border-light)'
                }}>
                  <img src={item.image} alt={item.name} style={{ width: 56, height: 64, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{item.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.size} • {item.color} × {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              <div className="summary-row" style={{ marginTop: '1rem' }}>
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--primary)' : 'inherit' }}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (GST 18%)</span><span>{formatPrice(tax)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ marginTop: '1.5rem' }} disabled={loading}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Processing...
                  </span>
                ) : (
                  <><HiOutlineLockClosed /> Place Order — {formatPrice(total)}</>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '1rem' }}>
                🔒 Your payment information is secure and encrypted
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
