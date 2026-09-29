import React, { createContext, useContext, useState } from 'react';
import { STICKERS_DATA, CLIENTE_DEFAULT, PEDIDOS_RECIENTES } from '../data/stickersData';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('catalogo');
  const [selectedStickerId, setSelectedStickerId] = useState('gatito-feliz');

  // Cart State (initialize with 1 gatito feliz sticker as friendly demo or empty)
  const [cart, setCart] = useState([
    {
      stickerId: 'gatito-feliz',
      quantity: 1,
      sticker: STICKERS_DATA.find(s => s.id === 'gatito-feliz')
    }
  ]);

  // Favorites State
  const [favorites, setFavorites] = useState(['gatito-feliz', 'planeta-kawaii']);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', image: '' });

  // Navigation Handler
  const navigateTo = (tab, stickerId = null) => {
    setActiveTab(tab);
    if (stickerId) {
      setSelectedStickerId(stickerId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Notification Trigger
  const triggerToast = (message, image = '') => {
    setToast({ show: true, message, image });
    setTimeout(() => {
      setToast({ show: false, message: '', image: '' });
    }, 3500);
  };

  // Add to Cart
  const addToCart = (sticker, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.stickerId === sticker.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { stickerId: sticker.id, quantity, sticker }];
      }
    });

    triggerToast(`¡Agregaste ${quantity}x "${sticker.nombreCorto}" al carrito! ✨`, sticker.image_url);
  };

  // Update Cart Quantity
  const updateCartQuantity = (stickerId, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.stickerId === stickerId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove Item from Cart
  const removeFromCart = (stickerId) => {
    setCart(prevCart => prevCart.filter(item => item.stickerId !== stickerId));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Toggle Favorite
  const toggleFavorite = (stickerId) => {
    setFavorites(prev => {
      if (prev.includes(stickerId)) {
        return prev.filter(id => id !== stickerId);
      } else {
        return [...prev, stickerId];
      }
    });
  };

  // Cart Calculations
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + item.sticker.precio_final * item.quantity, 0);

  // Selected Sticker Details
  const currentSticker = STICKERS_DATA.find(s => s.id === selectedStickerId) || STICKERS_DATA[0];

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        selectedStickerId,
        currentSticker,
        cart,
        favorites,
        toast,
        cliente: CLIENTE_DEFAULT,
        pedidos: PEDIDOS_RECIENTES,
        stickers: STICKERS_DATA,
        navigateTo,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleFavorite,
        cartTotalItems,
        cartTotalPrice,
        triggerToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
