import { createContext, useContext, useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const CART_KEY = 'storego_cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { showToast } = useToast();
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, qty = 1) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    setCart(prev =>
      prev.some(i => i.id === id)
        ? prev.map(i => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { id, qty }]
    );
    showToast(qty > 1 ? `${qty} × ${product.name} añadidos al carrito` : `${product.name} añadido al carrito`);
  };

  const removeFromCart = id => setCart(prev => prev.filter(i => i.id !== id));

  const changeQty = (id, delta) =>
    setCart(prev =>
      prev
        .map(i => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter(i => i.qty > 0)
    );

  const clearCart = () => setCart([]);

  // Une cada línea del carrito con los datos del producto.
  const items = cart
    .map(i => ({ ...i, product: PRODUCTS.find(p => p.id === i.id) }))
    .filter(i => i.product);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, total, addToCart, removeFromCart, changeQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
