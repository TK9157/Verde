import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';

import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminManagement from './pages/admin/AdminManagement';
import AdminSettings from './pages/admin/Settings';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
}

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="bottom-right" toastOptions={{
            style: { fontFamily: 'var(--font-body)', fontSize: '0.875rem' }
          }} />

          <Routes>
            {/* Auth pages — no navbar/footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin panel — own layout */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<Dashboard />} />
              <Route path="categories" element={<Dashboard />} />
              <Route path="admins" element={<AdminManagement />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Customer pages */}
            <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
            <Route path="/shop" element={<CustomerLayout><Shop /></CustomerLayout>} />
            <Route path="/product/:slug" element={<CustomerLayout><ProductDetail /></CustomerLayout>} />
            <Route path="/cart" element={<CustomerLayout><Cart /></CustomerLayout>} />
            <Route path="/checkout" element={<CustomerLayout><ProtectedRoute><Checkout /></ProtectedRoute></CustomerLayout>} />
            <Route path="/profile" element={<CustomerLayout><ProtectedRoute><Profile /></ProtectedRoute></CustomerLayout>} />
            <Route path="/orders" element={<CustomerLayout><ProtectedRoute><Profile /></ProtectedRoute></CustomerLayout>} />
            <Route path="/order-success" element={<CustomerLayout><OrderSuccess /></CustomerLayout>} />
            <Route path="/wishlist" element={<CustomerLayout><Shop /></CustomerLayout>} />

            {/* Fallback */}
            <Route path="*" element={<CustomerLayout>
              <div style={{ paddingTop: 'calc(var(--navbar-height) + 4rem)', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '4rem', color: 'var(--primary)' }}>404</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Page not found</p>
                <a href="/" className="btn btn-primary">Go Home</a>
              </div>
            </CustomerLayout>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
