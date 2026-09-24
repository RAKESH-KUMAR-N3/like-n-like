import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lnl_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('lnl_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('lnl_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('lnl_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('lnl_coupon');
    }
  }, [coupon]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product, size = 'M', color = '', quantity = 1) => {
    const itemKey = `${product._id}-${size}-${color}`;
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.key === itemKey);
      if (existing) {
        return prevItems.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          key: itemKey,
          productId: product._id,
          name: product.name,
          price: product.price,
          mrp: product.mrp,
          image: product.images?.[0] || '',
          size,
          color,
          quantity
        }
      ];
    });
    showToast(`Added "${product.name}" (${size}) to your bag! 🛍️`);
  };

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  // Coupons
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LNL10' || clean === 'WELCOME10') {
      setCoupon({ code: clean, percent: 10 });
      showToast('10% Discount applied! 🎉');
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'FASHION20') {
      setCoupon({ code: clean, percent: 20 });
      showToast('20% Mega discount applied! 🔥');
      return { success: true, message: '20% discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try WELCOME10' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed');
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalMrp = cartItems.reduce(
    (acc, item) => acc + (item.mrp || item.price) * item.quantity,
    0
  );
  const mrpSavings = Math.max(0, totalMrp - cartSubtotal);

  const discountAmount = coupon
    ? Math.round((cartSubtotal * coupon.percent) / 100)
    : 0;
  const shippingFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 49;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        totalMrp,
        mrpSavings,
        shippingFee,
        discountAmount,
        cartTotal,
        coupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toastMessage
      }}
    >
      {children}
      {/* Global Toast for Cart feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold animate-bounce border border-gray-700">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
