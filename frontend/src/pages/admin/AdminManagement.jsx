import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineShieldCheck } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AdminManagement() {
  const { isSuperAdmin, profile } = useAuth();
  
  const [admins, setAdmins] = useState([
    { id: '1', email: 'rjroshandev2010@gmail.com', full_name: 'Roshan', role: 'super_admin', added: '2026-04-13' },
  ]);

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('admin');

  const handleAdd = () => {
    if (!newEmail) { toast.error('Email is required'); return; }
    if (admins.find(a => a.email === newEmail)) { toast.error('This admin already exists'); return; }

    setAdmins(prev => [...prev, {
      id: Date.now().toString(),
      email: newEmail,
      full_name: newName || newEmail.split('@')[0],
      role: newRole,
      added: new Date().toISOString().split('T')[0]
    }]);
    setNewEmail('');
    setNewName('');
    toast.success(`Admin access granted to ${newEmail}!`);
  };

  const handleRemove = (id) => {
    const admin = admins.find(a => a.id === id);
    if (admin?.role === 'super_admin') { toast.error("Can't remove super admin"); return; }
    if (confirm(`Remove admin access for ${admin?.email}?`)) {
      setAdmins(prev => prev.filter(a => a.id !== id));
      toast.success('Admin access removed');
    }
  };

  const handleRoleChange = (id, role) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, role } : a));
    toast.success('Role updated');
  };

  const inputStyle = { background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', color: 'var(--admin-text)' };
  const labelStyle = { color: 'var(--admin-text-secondary)' };

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1>Admin Management</h1>
          <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.8125rem', fontFamily: 'var(--font-body)' }}>Manage who has access to the admin panel</p>
        </div>
      </div>

      {/* Add Admin Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ color: 'var(--admin-accent)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <HiOutlinePlus /> Add New Admin
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 150px auto', gap: 'var(--space-md)', alignItems: 'end' }}>
          <div className="input-group">
            <label style={labelStyle}>Email *</label>
            <input className="input-field" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="admin@example.com" style={inputStyle} />
          </div>
          <div className="input-group">
            <label style={labelStyle}>Name</label>
            <input className="input-field" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full name" style={inputStyle} />
          </div>
          <div className="input-group">
            <label style={labelStyle}>Role</label>
            <select className="input-field" value={newRole} onChange={e => setNewRole(e.target.value)} style={inputStyle}>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleAdd} style={{ height: 44, background: 'var(--admin-accent)', color: 'var(--admin-bg)' }}>Add</button>
        </div>
      </motion.div>

      {/* Admin List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="admin-table-wrapper">
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--admin-border)' }}>
          <h3 style={{ color: 'var(--admin-text)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Current Admins ({admins.length})</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Admin</th>
              <th>Email</th>
              <th>Role</th>
              <th>Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-full)',
                      background: admin.role === 'super_admin' ? 'var(--admin-accent)' : 'var(--admin-sidebar)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: admin.role === 'super_admin' ? 'var(--admin-bg)' : 'var(--admin-text)', fontWeight: 700, fontSize: '0.875rem'
                    }}>
                      {admin.full_name[0].toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{admin.full_name}</span>
                  </div>
                </td>
                <td>{admin.email}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    {admin.role === 'super_admin' && <HiOutlineShieldCheck style={{ color: 'var(--admin-accent)' }} />}
                    <span className={`badge ${admin.role === 'super_admin' ? 'badge-green' : 'badge-blue'}`}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </div>
                </td>
                <td>{admin.added}</td>
                <td>
                  {admin.role !== 'super_admin' ? (
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <select defaultValue={admin.role} onChange={e => handleRoleChange(admin.id, e.target.value)}
                        style={{ padding: '0.375rem', borderRadius: 'var(--radius-sm)', fontSize: '0.6875rem', background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                      <button onClick={() => handleRemove(admin.id)}
                        style={{ background: 'var(--admin-sidebar)', border: '1px solid var(--admin-border)', borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.625rem', color: 'var(--error)', cursor: 'pointer' }}>
                        <HiOutlineTrash />
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.6875rem', color: 'var(--admin-text-secondary)' }}>Protected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
