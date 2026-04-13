import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch, HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';
import { useProducts } from '../../contexts/ProductsContext';
import { formatPrice } from '../../data/products';
import toast from 'react-hot-toast';

const MAX_IMAGES = 10;
const MIN_IMAGES = 1;

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [form, setForm] = useState({
    name: '', price: '', compare_price: '', category_id: '',
    description: '', stock_quantity: '', is_active: true, images: []
  });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name, price: product.price, compare_price: product.compare_price || '',
      category_id: product.category_id, description: product.description,
      stock_quantity: product.stock_quantity, is_active: product.is_active,
      images: product.images || []
    });
    setNewImageUrl('');
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingProduct(null);
    setForm({
      name: '', price: '', compare_price: '', category_id: categories[0]?.id || '',
      description: '', stock_quantity: '', is_active: true, images: []
    });
    setNewImageUrl('');
    setShowModal(true);
  };

  // ── Image management ──
  const addImage = () => {
    const url = newImageUrl.trim();
    if (!url) { toast.error('Enter an image URL'); return; }
    if (form.images.length >= MAX_IMAGES) { toast.error(`Maximum ${MAX_IMAGES} images allowed`); return; }
    if (form.images.includes(url)) { toast.error('This image is already added'); return; }
    setForm(prev => ({ ...prev, images: [...prev.images, url] }));
    setNewImageUrl('');
  };

  const removeImage = (index) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const moveImage = (index, direction) => {
    const newImages = [...form.images];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newImages.length) return;
    [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
    setForm(prev => ({ ...prev, images: newImages }));
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    if (form.images.length < MIN_IMAGES) { toast.error(`Add at least ${MIN_IMAGES} product image`); return; }

    if (editingProduct) {
      updateProduct(editingProduct.id, { ...form });
      toast.success('Product updated!');
    } else {
      addProduct({ ...form });
      toast.success('Product added!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted');
    }
  };

  const inputStyle = { background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', color: 'var(--admin-text)' };
  const labelStyle = { color: 'var(--admin-text-secondary)' };

  return (
    <div>
      <div className="admin-topbar">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={handleNew} style={{ background: 'var(--admin-accent)', color: 'var(--admin-bg)' }}><HiOutlinePlus /> Add Product</button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 'var(--space-lg)', position: 'relative', maxWidth: 400 }}>
        <HiOutlineSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-secondary)' }} />
        <input className="input-field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
          style={{ paddingLeft: '2.5rem', ...inputStyle }} />
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
              <th>Images</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={product.images?.[0]} alt="" style={{ width: 44, height: 52, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{product.name}</span>
                  </div>
                </td>
                <td>{product.category_name}</td>
                <td style={{ fontWeight: 600 }}>{formatPrice(product.price)}</td>
                <td>{product.stock_quantity}</td>
                <td>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--admin-accent)', fontWeight: 600 }}>
                    {product.images?.length || 0} pic{(product.images?.length || 0) !== 1 ? 's' : ''}
                  </span>
                </td>
                <td><span className={`badge ${product.is_active ? 'badge-green' : 'badge-red'}`}>{product.is_active ? 'Active' : 'Draft'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    <button onClick={() => handleEdit(product)} style={{ background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.625rem', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}><HiOutlinePencil /></button>
                    <button onClick={() => handleDelete(product.id)} style={{ background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.625rem', color: 'var(--error)', cursor: 'pointer' }}><HiOutlineTrash /></button>
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
            onClick={e => e.stopPropagation()} style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: 'var(--admin-accent)', marginBottom: 'var(--space-lg)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>

              {/* Name */}
              <div className="input-group">
                <label style={labelStyle}>Name *</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Product name" style={inputStyle} />
              </div>

              {/* Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="input-group">
                  <label style={labelStyle}>Price (₹) *</label>
                  <input className="input-field" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} />
                </div>
                <div className="input-group">
                  <label style={labelStyle}>Compare Price (₹)</label>
                  <input className="input-field" type="number" value={form.compare_price} onChange={e => setForm({ ...form, compare_price: e.target.value })} style={inputStyle} />
                </div>
              </div>

              {/* Category */}
              <div className="input-group">
                <label style={labelStyle}>Category</label>
                <select className="input-field" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} style={inputStyle}>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* ── IMAGES SECTION ── */}
              <div className="input-group">
                <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Product Images * <span style={{ fontWeight: 400, fontSize: '0.6875rem' }}>(min {MIN_IMAGES}, max {MAX_IMAGES})</span></span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: form.images.length >= MIN_IMAGES ? '#22C55E' : 'var(--error)' }}>
                    {form.images.length}/{MAX_IMAGES}
                  </span>
                </label>

                {/* Image thumbnails grid */}
                {form.images.length > 0 && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.5rem',
                    marginBottom: '0.75rem', marginTop: '0.5rem'
                  }}>
                    {form.images.map((url, i) => (
                      <div key={i} style={{
                        position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                        border: i === 0 ? '2px solid var(--admin-accent)' : '1px solid var(--admin-border)',
                        aspectRatio: '3/4', background: 'var(--admin-sidebar)'
                      }}>
                        <img src={url} alt={`Pic ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { e.target.src = ''; e.target.style.display = 'none'; }} />

                        {/* First image badge */}
                        {i === 0 && (
                          <div style={{
                            position: 'absolute', top: 4, left: 4, background: 'var(--admin-accent)', color: 'var(--admin-bg)',
                            fontSize: '0.5rem', fontWeight: 700, padding: '2px 5px', borderRadius: '3px',
                            textTransform: 'uppercase', letterSpacing: '0.05em'
                          }}>Main</div>
                        )}

                        {/* Controls overlay */}
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex',
                          background: 'rgba(0,0,0,0.7)', justifyContent: 'center', gap: '2px'
                        }}>
                          {i > 0 && (
                            <button onClick={() => moveImage(i, -1)} title="Move left"
                              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px 6px', fontSize: '0.625rem', fontWeight: 700 }}>◀</button>
                          )}
                          <button onClick={() => removeImage(i)} title="Remove"
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px 6px', fontSize: '0.75rem' }}>
                            <HiOutlineX />
                          </button>
                          {i < form.images.length - 1 && (
                            <button onClick={() => moveImage(i, 1)} title="Move right"
                              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px 6px', fontSize: '0.625rem', fontWeight: 700 }}>▶</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add image input */}
                {form.images.length < MAX_IMAGES && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input className="input-field" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)}
                      placeholder="Paste image URL (https://...)" style={{ ...inputStyle, flex: 1 }}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }} />
                    <button onClick={addImage} type="button"
                      style={{
                        background: 'var(--admin-accent)', color: 'var(--admin-bg)', border: 'none',
                        borderRadius: 'var(--radius-sm)', padding: '0 1rem', cursor: 'pointer',
                        fontWeight: 700, fontSize: '0.75rem', whiteSpace: 'nowrap', display: 'flex',
                        alignItems: 'center', gap: '0.25rem'
                      }}>
                      <HiOutlinePhotograph /> Add
                    </button>
                  </div>
                )}

                {/* Empty state */}
                {form.images.length === 0 && (
                  <div style={{
                    border: '2px dashed var(--admin-border)', borderRadius: 'var(--radius-md)',
                    padding: '1.5rem', textAlign: 'center', marginTop: '0.5rem', color: 'var(--admin-text-secondary)'
                  }}>
                    <HiOutlinePhotograph style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }} />
                    <p style={{ fontSize: '0.75rem' }}>No images added yet</p>
                    <p style={{ fontSize: '0.625rem', opacity: 0.6 }}>Add at least {MIN_IMAGES} product image to continue</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="input-group">
                <label style={labelStyle}>Description</label>
                <textarea className="input-field" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Product description..." style={inputStyle} />
              </div>

              {/* Stock */}
              <div className="input-group">
                <label style={labelStyle}>Stock Quantity</label>
                <input className="input-field" type="number" value={form.stock_quantity} onChange={e => setForm({ ...form, stock_quantity: e.target.value })} style={inputStyle} />
              </div>

              {/* Active toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} id="active" />
                <label htmlFor="active" style={{ color: 'var(--admin-text-secondary)', fontSize: '0.8125rem' }}>Active (visible on store)</label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'var(--space-sm)' }}>
                <button className="btn btn-primary" onClick={handleSave} style={{ background: 'var(--admin-accent)', color: 'var(--admin-bg)' }}>{editingProduct ? 'Update' : 'Add Product'}</button>
                <button className="btn btn-ghost" style={{ color: 'var(--admin-text-secondary)' }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
