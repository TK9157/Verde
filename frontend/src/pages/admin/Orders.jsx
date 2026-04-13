import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../data/products';

export default function AdminOrders() {
  const [filter, setFilter] = useState('all');

  const orders = [
    { id: 'ORD-001', customer: 'Roshan Kumar', email: 'roshan@email.com', items: 3, total: 4999, status: 'paid', date: '2026-04-13' },
    { id: 'ORD-002', customer: 'Arjun Sharma', email: 'arjun@email.com', items: 2, total: 7499, status: 'processing', date: '2026-04-12' },
    { id: 'ORD-003', customer: 'Vikram Patel', email: 'vikram@email.com', items: 1, total: 2299, status: 'shipped', date: '2026-04-12' },
    { id: 'ORD-004', customer: 'Rahul Reddy', email: 'rahul@email.com', items: 4, total: 5699, status: 'delivered', date: '2026-04-11' },
    { id: 'ORD-005', customer: 'Karan Singh', email: 'karan@email.com', items: 2, total: 3199, status: 'paid', date: '2026-04-11' },
    { id: 'ORD-006', customer: 'Aditya Joshi', email: 'aditya@email.com', items: 1, total: 1299, status: 'cancelled', date: '2026-04-10' },
  ];

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const statusColors = { paid: 'badge-green', processing: 'badge-yellow', shipped: 'badge-blue', delivered: 'badge-green', cancelled: 'badge-red' };
  const statusOptions = ['all', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div>
      <div className="admin-topbar">
        <h1>Orders</h1>
        <span style={{ color: 'var(--admin-text-secondary)', fontSize: '0.8125rem' }}>{orders.length} total orders</span>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
        {statusOptions.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600,
              background: filter === s ? 'var(--admin-accent)' : 'var(--admin-card)',
              color: filter === s ? 'var(--admin-bg)' : 'var(--admin-text-secondary)',
              border: `1px solid ${filter === s ? 'var(--admin-accent)' : 'var(--admin-border)'}`,
              cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s ease'
            }}>
            {s === 'all' ? 'All Orders' : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{order.id}</td>
                <td>
                  <div>{order.customer}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--admin-text-secondary)' }}>{order.email}</div>
                </td>
                <td>{order.items}</td>
                <td style={{ fontWeight: 600 }}>{formatPrice(order.total)}</td>
                <td><span className={`badge ${statusColors[order.status]}`}>{order.status}</span></td>
                <td>{order.date}</td>
                <td>
                  <select style={{
                    padding: '0.375rem 0.625rem', borderRadius: 'var(--radius-sm)', fontSize: '0.6875rem',
                    background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', cursor: 'pointer'
                  }} defaultValue={order.status}>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
