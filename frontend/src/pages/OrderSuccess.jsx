import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi';

export default function OrderSuccess() {
  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + var(--space-3xl))', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }} style={{ textAlign: 'center', maxWidth: 500 }}>
        <div style={{ color: 'var(--primary)', fontSize: '5rem', marginBottom: '1rem' }}>
          <HiOutlineCheckCircle />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Order Placed! 🎉</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Thank you for your order! You'll receive a confirmation email shortly with your order details and tracking information.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/shop" className="btn btn-primary btn-lg">Continue Shopping</Link>
          <Link to="/orders" className="btn btn-secondary btn-lg">View Orders</Link>
        </div>
      </motion.div>
    </div>
  );
}
