import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  ShoppingBag,
  Grid,
  LogOut,
  Heart,
  Package,
  Star,
  Lock,
  Mail,
  LogIn,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function CuentaView() {
  const {
    cliente,
    pedidos,
    favorites,
    stickers,
    token,
    loginUser,
    logoutUser,
    navigateTo,
    addToCart
  } = useShop();

  const [logoutModal, setLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Login form state
  const [email, setEmail] = useState('cliente@moodsticker.com');
  const [password, setPassword] = useState('123456');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Favorite sticker objects
  const favoriteStickers = stickers.filter(s => favorites.includes(s.id));

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      await loginUser(email, password);
      setShowLoginModal(false);
    } catch (err) {
      setLoginError(err.message || 'Error al iniciar sesión. Verificá las credenciales.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="account-container">
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '700' }}>Mi Cuenta</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="back-link-btn" onClick={() => navigateTo('catalogo')}>
            <Grid size={16} /> Catálogo
          </button>
          <button className="back-link-btn" style={{ background: 'var(--pink-soft)', color: 'var(--pink-primary)' }} onClick={() => navigateTo('carrito')}>
            <ShoppingBag size={16} /> Carrito
          </button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="account-profile-card">
        <div className="profile-avatar-group">
          <div className="profile-avatar">
            <User size={40} />
          </div>
          <div>
            <h2 className="profile-name">{cliente.nombre}</h2>
            <div className="profile-email">{cliente.email}</div>
            <div className="profile-badge">
              <Star size={14} fill="#B37D00" /> {cliente.nivelClienta}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {!token ? (
            <button
              className="btn-add-main"
              style={{ padding: '10px 18px', fontSize: '14px' }}
              onClick={() => setShowLoginModal(true)}
            >
              <LogIn size={16} /> Iniciar Sesión (JWT)
            </button>
          ) : (
            <button className="btn-logout" onClick={() => setLogoutModal(true)}>
              <LogOut size={16} /> Cerrar sesión
            </button>
          )}
        </div>
      </div>

      {/* Two Column Grid: Pedidos Recientes & Stickers Favoritos */}
      <div className="account-sections-grid">
        {/* Section 1: Pedidos Recientes */}
        <div className="account-section-card">
          <h2 className="section-card-title">
            <Package size={22} color="var(--purple-primary)" /> Pedidos Recientes
          </h2>

          <div className="orders-list">
            {pedidos && pedidos.length > 0 ? (
              pedidos.map(pedido => (
                <div key={pedido.id} className="order-card-item">
                  <div className="order-header">
                    <span className="order-id">{pedido.id}</span>
                    <span
                      className="order-status"
                      style={{ background: 'var(--purple-soft)', color: 'var(--purple-primary)' }}
                    >
                      {pedido.estado || 'En proceso'}
                    </span>
                  </div>
                  <div className="order-details">
                    <span>📅 {pedido.fecha} • {pedido.items?.length || 1} productos</span>
                    <strong style={{ color: 'var(--pink-primary)', fontFamily: 'var(--font-heading)' }}>
                      ${(pedido.total || 0).toLocaleString('es-AR')}
                    </strong>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                No tenés pedidos registrados aún.
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Stickers Favoritos */}
        <div className="account-section-card">
          <h2 className="section-card-title">
            <Heart size={22} color="var(--pink-primary)" fill="var(--pink-primary)" /> Stickers Favoritos ({favoriteStickers.length})
          </h2>

          {favoriteStickers.length > 0 ? (
            <div className="favs-mini-grid">
              {favoriteStickers.map(sticker => (
                <div
                  key={sticker.id}
                  className="fav-mini-card"
                  onClick={() => navigateTo('producto', sticker.id)}
                >
                  <img
                    src={sticker.image_url}
                    alt={sticker.nombre}
                    className="fav-mini-img"
                  />
                  <span className="fav-mini-name">{sticker.nombreCorto || sticker.nombre}</span>
                  <span className="fav-mini-price">
                    ${(sticker.precio_final || 0).toLocaleString('es-AR')}
                  </span>
                  <button
                    className="card-add-btn"
                    style={{ padding: '6px 12px', fontSize: '12px', marginTop: '8px', width: '100%', justifyContent: 'center' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(sticker, 1);
                    }}
                  >
                    + Agregar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>No tenés stickers marcados como favoritos todavía.</p>
              <button
                className="back-link-btn"
                style={{ marginTop: '12px' }}
                onClick={() => navigateTo('catalogo')}
              >
                Explorar Catálogo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <div className="modal-icon-badge" style={{ background: 'var(--purple-soft)', color: 'var(--purple-primary)' }}>
              <Sparkles size={40} />
            </div>
            <h2 className="modal-title">Iniciar Sesión API</h2>
            <p className="modal-body" style={{ marginBottom: '16px' }}>
              Ingresá tus credenciales para obtener tu Token JWT y sincronizar tu perfil.
            </p>

            {loginError && (
              <div style={{ background: '#FFEBEB', color: '#FF4949', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', fontWeight: '600' }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Correo Electrónico:
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '12px', border: '2px solid var(--border-sticker)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Contraseña:
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '12px', border: '2px solid var(--border-sticker)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn-secondary-link"
                  style={{ background: '#F1EBF7', color: 'var(--text-primary)' }}
                  onClick={() => setShowLoginModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-add-main"
                  style={{ flex: 1 }}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    'Entrar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon-badge" style={{ background: '#FFEBEB', color: '#FF4949' }}>
              <LogOut size={40} />
            </div>
            <h2 className="modal-title">¿Cerrar Sesión?</h2>
            <p className="modal-body">
              ¿Estás seguro de que querés salir de la cuenta de <strong>{cliente.nombre}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn-secondary-link"
                style={{ background: '#F1EBF7', color: 'var(--text-primary)' }}
                onClick={() => setLogoutModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-add-main"
                style={{ background: '#FF4949', color: 'white', flex: 1 }}
                onClick={() => {
                  setLogoutModal(false);
                  logoutUser();
                  navigateTo('catalogo');
                }}
              >
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
