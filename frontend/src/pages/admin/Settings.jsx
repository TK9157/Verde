import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSave, HiOutlineGlobe, HiOutlineTruck, HiOutlineCreditCard, HiOutlineColorSwatch } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
    store_name: 'VERDE',
    store_tagline: 'Premium Sustainable Clothing',
    store_email: 'hello@verde.com',
    store_phone: '+91 98765 43210',
    currency: 'INR',
    shipping_free_min: 1999,
    shipping_rate: 199,
    tax_rate: 18,
    razorpay_key: '',
    razorpay_secret: '',
    shopify_domain: '',
    shopify_token: '',
    primary_color: '#16A34A',
    enable_reviews: true,
    enable_wishlist: true,
    maintenance_mode: false,
  });

  const updateSetting = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // In production: save to Supabase site_settings table
    toast.success('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', icon: <HiOutlineGlobe />, label: 'General' },
    { id: 'shipping', icon: <HiOutlineTruck />, label: 'Shipping & Tax' },
    { id: 'payments', icon: <HiOutlineCreditCard />, label: 'Payments' },
    { id: 'appearance', icon: <HiOutlineColorSwatch />, label: 'Appearance' },
  ];

  const inputStyle = { background: 'var(--bg-dark-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-light)' };
  const labelStyle = { color: 'var(--text-light-secondary)' };

  return (
    <div>
      <div className="admin-topbar">
        <h1>Settings</h1>
        <button className="btn btn-primary" onClick={handleSave}><HiOutlineSave /> Save Changes</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--space-xl)' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              style={{ background: activeTab === tab.id ? 'var(--primary)' : 'transparent', color: activeTab === tab.id ? 'white' : 'var(--text-light-secondary)', border: 'none', textAlign: 'left' }}>
              <span className="nav-icon">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
          style={{ background: 'var(--bg-dark-secondary)', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>

          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <h3 style={{ color: 'var(--text-light)', marginBottom: 'var(--space-sm)' }}>General Settings</h3>
              <div className="input-group">
                <label style={labelStyle}>Store Name</label>
                <input className="input-field" value={settings.store_name} onChange={e => updateSetting('store_name', e.target.value)} style={inputStyle} />
              </div>
              <div className="input-group">
                <label style={labelStyle}>Tagline</label>
                <input className="input-field" value={settings.store_tagline} onChange={e => updateSetting('store_tagline', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="input-group">
                  <label style={labelStyle}>Contact Email</label>
                  <input className="input-field" type="email" value={settings.store_email} onChange={e => updateSetting('store_email', e.target.value)} style={inputStyle} />
                </div>
                <div className="input-group">
                  <label style={labelStyle}>Phone</label>
                  <input className="input-field" value={settings.store_phone} onChange={e => updateSetting('store_phone', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div className="input-group">
                <label style={labelStyle}>Currency</label>
                <select className="input-field" value={settings.currency} onChange={e => updateSetting('currency', e.target.value)} style={inputStyle}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'var(--space-sm)' }}>
                <input type="checkbox" checked={settings.maintenance_mode} onChange={e => updateSetting('maintenance_mode', e.target.checked)} id="maintenance" />
                <label htmlFor="maintenance" style={{ color: 'var(--text-light-secondary)', fontSize: '0.875rem' }}>🚧 Maintenance Mode (site will show "Coming Soon")</label>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <h3 style={{ color: 'var(--text-light)', marginBottom: 'var(--space-sm)' }}>Shipping & Tax</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="input-group">
                  <label style={labelStyle}>Flat Shipping Rate (₹)</label>
                  <input className="input-field" type="number" value={settings.shipping_rate} onChange={e => updateSetting('shipping_rate', Number(e.target.value))} style={inputStyle} />
                </div>
                <div className="input-group">
                  <label style={labelStyle}>Free Shipping Minimum (₹)</label>
                  <input className="input-field" type="number" value={settings.shipping_free_min} onChange={e => updateSetting('shipping_free_min', Number(e.target.value))} style={inputStyle} />
                </div>
              </div>
              <div className="input-group">
                <label style={labelStyle}>Tax Rate (GST %)</label>
                <input className="input-field" type="number" value={settings.tax_rate} onChange={e => updateSetting('tax_rate', Number(e.target.value))} style={inputStyle} />
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <h3 style={{ color: 'var(--text-light)', marginBottom: 'var(--space-sm)' }}>Payment Integrations</h3>

              {/* Razorpay */}
              <div style={{ border: '2px dashed var(--primary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
                <h4 style={{ color: 'var(--text-light)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💳 Razorpay</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div className="input-group">
                    <label style={labelStyle}>Key ID</label>
                    <input className="input-field" value={settings.razorpay_key} onChange={e => updateSetting('razorpay_key', e.target.value)} placeholder="rzp_test_..." style={inputStyle} />
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Key Secret</label>
                    <input className="input-field" type="password" value={settings.razorpay_secret} onChange={e => updateSetting('razorpay_secret', e.target.value)} placeholder="••••••••" style={inputStyle} />
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light-secondary)', marginTop: '0.75rem' }}>
                  Get your keys from <a href="https://dashboard.razorpay.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)' }}>Razorpay Dashboard</a> → Settings → API Keys
                </p>
              </div>

              {/* Shopify */}
              <div style={{ border: '2px dashed var(--border-dark)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
                <h4 style={{ color: 'var(--text-light)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🛍️ Shopify (Sales Channel)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div className="input-group">
                    <label style={labelStyle}>Store Domain</label>
                    <input className="input-field" value={settings.shopify_domain} onChange={e => updateSetting('shopify_domain', e.target.value)} placeholder="your-store.myshopify.com" style={inputStyle} />
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Storefront Token</label>
                    <input className="input-field" type="password" value={settings.shopify_token} onChange={e => updateSetting('shopify_token', e.target.value)} placeholder="••••••••" style={inputStyle} />
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light-secondary)', marginTop: '0.75rem' }}>
                  Create a custom app in Shopify Admin → Settings → Apps → Develop apps
                </p>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <h3 style={{ color: 'var(--text-light)', marginBottom: 'var(--space-sm)' }}>Appearance</h3>
              <div className="input-group">
                <label style={labelStyle}>Primary Brand Color</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input type="color" value={settings.primary_color} onChange={e => updateSetting('primary_color', e.target.value)}
                    style={{ width: 50, height: 40, border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'transparent' }} />
                  <input className="input-field" value={settings.primary_color} onChange={e => updateSetting('primary_color', e.target.value)} style={{ ...inputStyle, maxWidth: 150 }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={settings.enable_reviews} onChange={e => updateSetting('enable_reviews', e.target.checked)} id="reviews" />
                  <label htmlFor="reviews" style={{ color: 'var(--text-light-secondary)', fontSize: '0.875rem' }}>Enable Product Reviews</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={settings.enable_wishlist} onChange={e => updateSetting('enable_wishlist', e.target.checked)} id="wishlist" />
                  <label htmlFor="wishlist" style={{ color: 'var(--text-light-secondary)', fontSize: '0.875rem' }}>Enable Wishlist</label>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
