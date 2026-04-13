import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('verde_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('verde_cart', JSON.stringify(items));
  }, [items]);

  function addItem(product, size = '', color = '', quantity = 1) {
    setItems(prev => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find(item => `${item.id}-${item.size}-${item.color}` === key);
      if (existing) {
        return prev.map(item =>
          `${item.id}-${item.size}-${item.color}` === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        compare_price: product.compare_price,
        image: product.images?.[0] || product.image || '',
        size, color, quantity,
        slug: product.slug
      }];
    });
  }

  function removeItem(id, size = '', color = '') {
    setItems(prev => prev.filter(item =>
      !(`${item.id}-${item.size}-${item.color}` === `${id}-${size}-${color}`)
    ));
  }

  function updateQuantity(id, size, color, quantity) {
    if (quantity <= 0) return removeItem(id, size, color);
    setItems(prev => prev.map(item =>
      `${item.id}-${item.size}-${item.color}` === `${id}-${size}-${color}`
        ? { ...item, quantity }
        : item
    ));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    items, addItem, removeItem, updateQuantity, clearCart,
    itemCount, subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
