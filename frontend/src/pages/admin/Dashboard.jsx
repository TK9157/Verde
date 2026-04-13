import { motion } from 'framer-motion';
import { HiOutlineCurrencyRupee, HiOutlineShoppingCart, HiOutlineUsers, HiOutlineCube, HiOutlineTrendingUp } from 'react-icons/hi';
import { formatPrice } from '../../data/products';
import { useProducts } from '../../contexts/ProductsContext';

export default function Dashboard() {
  const { products } = useProducts();
  // Demo stats — will come from Supabase in production
  const stats = [
    { icon: <HiOutlineCurrencyRupee />, label: 'Total Revenue', value: '₹4,85,230', change: '+12.5%', color: 'green' },
    { icon: <HiOutlineShoppingCart />, label: 'Total Orders', value: '1,247', change: '+8.2%', color: 'blue' },
    { icon: <HiOutlineUsers />, label: 'Customers', value: '3,891', change: '+15.3%', color: 'yellow' },
    { icon: <HiOutlineCube />, label: 'Products', value: products.length.toString(), change: '+2', color: 'red' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Roshan Kumar', total: 4999, status: 'Paid', date: '2026-04-13' },
    { id: 'ORD-002', customer: 'Arjun Sharma', total: 7499, status: 'Processing', date: '2026-04-12' },
    { id: 'ORD-003', customer: 'Vikram Patel', total: 2299, status: 'Shipped', date: '2026-04-12' },
    { id: 'ORD-004', customer: 'Rahul Reddy', total: 5699, status: 'Delivered', date: '2026-04-11' },
    { id: 'ORD-005', customer: 'Karan Singh', total: 3199, status: 'Paid', date: '2026-04-11' },
  ];

  const statusColors = {
    'Paid': 'badge-green', 'Processing': 'badge-yellow',
    'Shipped': 'badge-blue', 'Delivered': 'badge-green', 'Cancelled': 'badge-red'
  };

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.8125rem', fontFamily: 'var(--font-body)' }}>Welcome back! Here's what's happening.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-green"><HiOutlineTrendingUp /> Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">{stat.label}</span>
              <span style={{ fontSize: '0.6875rem', color: '#22C55E', fontWeight: 600 }}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders + Top Products */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-lg)' }}>
        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="admin-table-wrapper">
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--admin-text)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Recent Orders</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td style={{ fontWeight: 600 }}>{formatPrice(order.total)}</td>
                  <td><span className={`badge ${statusColors[order.status]}`}>{order.status}</span></td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Top Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <h3 style={{ color: 'var(--admin-text)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1rem' }}>Top Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {products.slice(0, 5).map((product, i) => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: i < 4 ? '1px solid var(--admin-border)' : 'none' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--admin-accent)', width: 20 }}>#{i + 1}</span>
                <img src={product.images[0]} alt="" style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--admin-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                  <div style={{ fontSize: '0.625rem', color: 'var(--admin-text-secondary)' }}>{formatPrice(product.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Payment Integration Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ marginTop: 'var(--space-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
        <div style={{ background: 'var(--admin-card)', border: '2px dashed var(--admin-accent)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</p>
          <h4 style={{ color: 'var(--admin-text)', marginBottom: '0.25rem', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem' }}>Razorpay</h4>
          <p style={{ fontSize: '0.6875rem', color: 'var(--admin-text-secondary)' }}>Payment gateway — ready to connect</p>
          <span className="badge badge-yellow" style={{ marginTop: '0.5rem' }}>Pending Setup</span>
        </div>
        <div style={{ background: 'var(--admin-card)', border: '2px dashed var(--admin-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛍️</p>
          <h4 style={{ color: 'var(--admin-text)', marginBottom: '0.25rem', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem' }}>Shopify</h4>
          <p style={{ fontSize: '0.6875rem', color: 'var(--admin-text-secondary)' }}>Sales channel — ready to connect</p>
          <span className="badge badge-yellow" style={{ marginTop: '0.5rem' }}>Pending Setup</span>
        </div>
      </motion.div>
    </div>
  );
}
