import { createContext, useContext, useState, useEffect } from 'react';
import { demoProducts as defaultProducts, demoCategories as defaultCategories } from '../data/products';

const ProductsContext = createContext({});

export const useProducts = () => useContext(ProductsContext);

const PRODUCTS_KEY = 'amhan_products';
const CATEGORIES_KEY = 'amhan_categories';

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
  }
  return fallback;
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => loadFromStorage(PRODUCTS_KEY, defaultProducts));
  const [categories, setCategories] = useState(() => loadFromStorage(CATEGORIES_KEY, defaultCategories));

  // Persist to localStorage whenever products or categories change
  useEffect(() => { saveToStorage(PRODUCTS_KEY, products); }, [products]);
  useEffect(() => { saveToStorage(CATEGORIES_KEY, categories); }, [categories]);

  // ── Cross-tab sync: when admin saves in one tab, all other tabs update instantly ──
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === PRODUCTS_KEY && e.newValue) {
        try { setProducts(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === CATEGORIES_KEY && e.newValue) {
        try { setCategories(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ── Product CRUD ──
  function addProduct(product) {
    const cat = categories.find(c => c.id === product.category_id);
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      images: product.images || ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'],
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      colors: product.colors || ['Black', 'White'],
      tags: product.tags || [],
      is_featured: product.is_featured || false,
      category_name: cat?.name || 'Other',
      price: Number(product.price),
      compare_price: Number(product.compare_price) || 0,
      stock_quantity: Number(product.stock_quantity) || 0,
      rating: product.rating || 0,
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  }

  function updateProduct(id, updates) {
    const cat = categories.find(c => c.id === updates.category_id);
    setProducts(prev => prev.map(p => p.id === id ? {
      ...p,
      ...updates,
      price: Number(updates.price),
      compare_price: Number(updates.compare_price) || 0,
      stock_quantity: Number(updates.stock_quantity) || 0,
      category_name: cat?.name || p.category_name,
    } : p));
  }

  function deleteProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  // ── Category CRUD ──
  function addCategory(category) {
    const newCat = {
      ...category,
      id: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
      is_active: category.is_active !== false,
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  }

  function updateCategory(id, updates) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    // Also update category_name in products that use this category
    if (updates.name) {
      setProducts(prev => prev.map(p => p.category_id === id ? { ...p, category_name: updates.name } : p));
    }
  }

  function deleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  // ── Reset to defaults ──
  function resetToDefaults() {
    setProducts(defaultProducts);
    setCategories(defaultCategories);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
  }

  const value = {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    resetToDefaults,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}
