import React, { createContext, useContext, useState, useEffect } from 'react';
import { CLIENTE_DEFAULT, PEDIDOS_RECIENTES } from '../data/stickersData';
import {
  getProductos,
  getProductoById,
  login,
  getPerfil,
  crearPedido,
  getPedidos,
  getToken,
  setToken,
  removeToken
} from '../services/api';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('catalogo');
  const [selectedStickerId, setSelectedStickerId] = useState('gatito-feliz');

  // API Products State
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication & Profile State
  const [token, setTokenState] = useState(getToken());
  const [cliente, setCliente] = useState(CLIENTE_DEFAULT);
  const [pedidos, setPedidos] = useState(PEDIDOS_RECIENTES);

  // Cart State
  const [cart, setCart] = useState([]);

  // Favorites State
  const [favorites, setFavorites] = useState(['gatito-feliz', 'planeta-kawaii']);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', image: '' });

  // Initial Fetch: Load Stickers and User Profile if Token exists
  const fetchCatalogo = async (categoria = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductos(categoria);
      setStickers(data);
      // Select first sticker as active if selectedStickerId is not in list
      if (data && data.length > 0) {
        const found = data.find(s => s.id === selectedStickerId);
        if (!found) {
          setSelectedStickerId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Error al cargar el catálogo de la API:', err);
      setError(err.message || 'Error al conectar con la API de stickers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogo();
  }, []);

  // Fetch User Profile on Mount if Token present
  useEffect(() => {
    const currentToken = getToken();
    if (currentToken) {
      getPerfil()
        .then(perfil => {
          if (perfil) {
            setCliente({
              nombre: perfil.nombre || perfil.email,
              email: perfil.email,
              telefono: "+54 9 11 4321-8765",
              ciudad: "Buenos Aires, Argentina",
              miembroDesde: "2026",
              nivelClienta: perfil.rol === 'admin' ? 'Administrador 👑' : 'Fan de los Stickers ⭐'
            });
          }
        })
        .catch(err => {
          console.warn('Token inválido o expirado:', err);
          removeToken();
          setTokenState(null);
        });

      getPedidos()
        .then(userOrders => {
          if (userOrders && Array.isArray(userOrders)) {
            setPedidos(userOrders);
          }
        })
        .catch(() => {});
    }
  }, []);

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
    if (!sticker) return;
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

    triggerToast(`¡Agregaste ${quantity}x "${sticker.nombreCorto || sticker.nombre}" al carrito! ✨`, sticker.image_url);
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

  // Confirm Checkout Action
  const checkoutCart = async () => {
    if (cart.length === 0) return null;
    try {
      const nuevoPedido = await crearPedido(cart);
      setPedidos(prev => [nuevoPedido, ...prev]);
      clearCart();
      triggerToast('¡Pedido registrado con éxito! 📦✨');
      return nuevoPedido;
    } catch (err) {
      console.error('Error al realizar el pedido:', err);
      triggerToast('Hubo un inconveniente al procesar tu pedido. Intentá de nuevo.');
      throw err;
    }
  };

  // Login Handler
  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      if (data.access_token) {
        setToken(data.access_token);
        setTokenState(data.access_token);
        const perfil = await getPerfil();
        setCliente({
          nombre: perfil.nombre || perfil.email,
          email: perfil.email,
          telefono: "+54 9 11 4321-8765",
          ciudad: "Buenos Aires, Argentina",
          miembroDesde: "2026",
          nivelClienta: perfil.rol === 'admin' ? 'Administrador 👑' : 'Fan de los Stickers ⭐'
        });

        const userOrders = await getPedidos();
        if (userOrders && Array.isArray(userOrders)) {
          setPedidos(userOrders);
        }

        triggerToast(`¡Bienvenida/o de nuevo, ${perfil.nombre || 'cliente'}! ✨`);
      }
      return data;
    } catch (err) {
      triggerToast(err.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  // Logout Handler
  const logoutUser = () => {
    removeToken();
    setTokenState(null);
    setCliente(CLIENTE_DEFAULT);
    setPedidos(PEDIDOS_RECIENTES);
    triggerToast('Sesión cerrada correctamente 👋');
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
  const cartTotalPrice = cart.reduce(
    (acc, item) => acc + (item.sticker?.precio_final || 0) * item.quantity,
    0
  );

  // Selected Sticker Details
  const currentSticker =
    stickers.find(s => s.id === selectedStickerId) ||
    stickers[0] ||
    null;

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        selectedStickerId,
        currentSticker,
        cart,
        favorites,
        toast,
        cliente,
        pedidos,
        stickers,
        loading,
        error,
        token,
        fetchCatalogo,
        navigateTo,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        checkoutCart,
        loginUser,
        logoutUser,
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
