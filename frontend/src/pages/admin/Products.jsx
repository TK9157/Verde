import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';
import { demoProducts, formatPrice } from '../../data/products';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({ name: '', price: '', compare_price: '', category_id: '', description: '', stock_quantity: '', is_active: true });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({ name: product.name, price: product.price, compare_price: product.compare_price || '', category_id: product.category_id, description: product.description, stock_quantity: product.stock_quantity, is_active: product.is_active });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingProduct(null);
    setForm({ name: '', price: '', compare_price: '', category_id: 'men', description: '', stock_quantity: '', is_active: true });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...form, price: Number(form.price), compare_price: Number(form.compare_price), stock_quantity: Number(form.stock_quantity) } : p));
      toast.success('Product updated!');
    } else {
      const newProduct = { ...form, id: Date.now().toString(), slug: form.name.toLowerCase().replace(/\s+/g, '-'), images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'], sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White'], tags: [], is_featured: false, category_name: form.category_id === 'men' ? 'Men' : form.category_id === 'women' ? 'Women' : 'Accessories', price: Number(form.price), compare_price: Number(form.compare_price), stock_quantity: Number(form.stock_quantity), rating: 0 };
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Product added!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted');
    }
  };

  return (
    <div>
      <div className="admin-topbar">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={handleNew}><HiOutlinePlus /> Add Product</button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 'var(--space-lg)', position: 'relative', maxWidth: 400 }}>
        <HiOutlineSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light-secondary)' }} />
        <input className="input-field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
          style={{ paddingLeft: '2.5rem', background: 'var(--bg-dark-secondary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }} />
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={product.images[0]} alt="" style={{ width: 44, height: 52, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-light)' }}>{product.name}</span>
                  </div>
                </td>
                <td>{product.category_name}</td>
                <td style={{ fontWeight: 600 }}>{formatPrice(product.price)}</td>
                <td>{product.stock_quantity}</td>
                <td><span className={`badge ${product.is_active ? 'badge-green' : 'badge-red'}`}>{product.is_active ? 'Active' : 'Draft'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    <button onClick={() => handleEdit(product)} style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.625rem', color: 'var(--text-light-secondary)', cursor: 'pointer' }}><HiOutlinePencil /></button>
                    <button onClick={() => handleDelete(product.id)} style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.625rem', color: 'var(--error)', cursor: 'pointer' }}><HiOutlineTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()} style={{ background: 'var(--bg-dark-secondary)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: 'var(--text-light)', marginBottom: 'var(--space-lg)' }}>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div className="input-group">
                <label style={{ color: 'var(--text-light-secondary)' }}>Name</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="input-group">
                  <label style={{ color: 'var(--text-light-secondary)' }}>Price (₹)</label>
                  <input className="input-field" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                    style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }} />
                </div>
                <div className="input-group">
                  <label style={{ color: 'var(--text-light-secondary)' }}>Compare Price (₹)</label>
                  <input className="input-field" type="number" value={form.compare_price} onChange={e => setForm({ ...form, compare_price: e.target.value })}
                    style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }} />
                </div>
              </div>
              <div className="input-group">
                <label style={{ color: 'var(--text-light-secondary)' }}>Category</label>
                <select className="input-field" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}
                  style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }}>
                  <option value="men">Men's</option>
                  <option value="women">Women's</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className="input-group">
                <label style={{ color: 'var(--text-light-secondary)' }}>Description</label>
                <textarea className="input-field" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                  style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }} />
              </div>
              <div className="input-group">
                <label style={{ color: 'var(--text-light-secondary)' }}>Stock Quantity</label>
                <input className="input-field" type="number" value={form.stock_quantity} onChange={e => setForm({ ...form, stock_quantity: e.target.value })}
                  style={{ background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} id="active" />
                <label htmlFor="active" style={{ color: 'var(--text-light-secondary)', fontSize: '0.875rem' }}>Active (visible on store)</label>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'var(--space-sm)' }}>
                <button className="btn btn-primary" onClick={handleSave}>{editingProduct ? 'Update' : 'Add Product'}</button>
                <button className="btn btn-ghost" style={{ color: 'var(--text-light-secondary)' }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
