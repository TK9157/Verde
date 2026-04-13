import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlinePhotograph } from 'react-icons/hi';
import { useProducts } from '../../contexts/ProductsContext';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image_url: '', is_active: true });

  const inputStyle = { background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', color: 'var(--admin-text)' };
  const labelStyle = { color: 'var(--admin-text-secondary)' };

  const handleNew = () => {
    setEditingCat(null);
    setForm({ name: '', slug: '', description: '', image_url: '', is_active: true });
    setShowModal(true);
  };

  const handleEdit = (cat) => {
    setEditingCat(cat);
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', image_url: cat.image_url || '', is_active: cat.is_active });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name) { toast.error('Category name is required'); return; }
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');

    if (editingCat) {
      updateCategory(editingCat.id, { ...form, slug });
      toast.success('Category updated!');
    } else {
      addCategory({ ...form, slug });
      toast.success('Category added!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const productCount = products.filter(p => p.category_id === id).length;
    if (productCount > 0) {
      toast.error(`Cannot delete: ${productCount} product(s) still in this category`);
      return;
    }
    if (confirm('Delete this category?')) {
      deleteCategory(id);
      toast.success('Category deleted');
    }
  };

  // Count products per category
  const getProductCount = (catId) => products.filter(p => p.category_id === catId).length;

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1>Categories</h1>
          <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.8125rem', fontFamily: 'var(--font-body)' }}>{categories.length} categories</p>
        </div>
        <button className="btn btn-primary" onClick={handleNew} style={{ background: 'var(--admin-accent)', color: 'var(--admin-bg)' }}>
          <HiOutlinePlus /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
        {categories.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            style={{
              background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-lg)',
              overflow: 'hidden', transition: 'all 0.2s ease'
            }}>
            {/* Image */}
            <div style={{ height: 140, background: 'var(--admin-sidebar)', overflow: 'hidden', position: 'relative' }}>
              {cat.image_url ? (
                <img src={cat.image_url} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-secondary)' }}>
                  <HiOutlinePhotograph style={{ fontSize: '2rem' }} />
                </div>
              )}
              {!cat.is_active && (
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <span className="badge badge-red">Inactive</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--admin-text)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {cat.name}
                  </h4>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--admin-text-secondary)' }}>/{cat.slug}</p>
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--admin-accent)', fontWeight: 600, background: 'rgba(212,169,69,0.1)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  {getProductCount(cat.id)} items
                </span>
              </div>
              {cat.description && (
                <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>{cat.description}</p>
              )}
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                <button onClick={() => handleEdit(cat)}
                  style={{ flex: 1, padding: '0.5rem', background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-sm)', color: 'var(--admin-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', fontSize: '0.6875rem', fontWeight: 600 }}>
                  <HiOutlinePencil /> Edit
                </button>
                <button onClick={() => handleDelete(cat.id)}
                  style={{ padding: '0.5rem 0.75rem', background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-sm)', color: 'var(--error)', cursor: 'pointer' }}>
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', width: '100%', maxWidth: 480 }}>
            <h2 style={{ color: 'var(--admin-accent)', marginBottom: 'var(--space-lg)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {editingCat ? 'Edit Category' : 'Add Category'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div className="input-group">
                <label style={labelStyle}>Category Name *</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Oversized Jeans" style={inputStyle} />
              </div>
              <div className="input-group">
                <label style={labelStyle}>Slug (URL-friendly)</label>
                <input className="input-field" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated from name" style={inputStyle} />
              </div>
              <div className="input-group">
                <label style={labelStyle}>Description</label>
                <textarea className="input-field" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} placeholder="Short description" style={inputStyle} />
              </div>
              <div className="input-group">
                <label style={labelStyle}>Image URL</label>
                <input className="input-field" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." style={inputStyle} />
                {form.image_url && (
                  <img src={form.image_url} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} id="cat-active" />
                <label htmlFor="cat-active" style={{ color: 'var(--admin-text-secondary)', fontSize: '0.8125rem' }}>Active (visible on store)</label>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'var(--space-sm)' }}>
                <button className="btn btn-primary" onClick={handleSave} style={{ background: 'var(--admin-accent)', color: 'var(--admin-bg)' }}>
                  {editingCat ? 'Update' : 'Add Category'}
                </button>
                <button className="btn btn-ghost" style={{ color: 'var(--admin-text-secondary)' }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
