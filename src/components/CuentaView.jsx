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
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function CuentaView() {
  const { cliente, pedidos, favorites, stickers, navigateTo, addToCart } = useShop();
  const [logoutModal, setLogoutModal] = useState(false);

  // Favorite sticker objects
  const favoriteStickers = stickers.filter(s => favorites.includes(s.id));

  return (
    <div className="account-container">
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

        <button className="btn-logout" onClick={() => setLogoutModal(true)}>
          <LogOut size={16} /> Cerrar sesión
        </button>
      </div>

      {/* Two Column Grid: Pedidos Recientes & Stickers Favoritos */}
      <div className="account-sections-grid">
        {/* Section 1: Pedidos Recientes */}
        <div className="account-section-card">
          <h2 className="section-card-title">
            <Package size={22} color="var(--purple-primary)" /> Pedidos Recientes
          </h2>

          <div className="orders-list">
            {pedidos.map(pedido => (
              <div key={pedido.id} className="order-card-item">
                <div className="order-header">
                  <span className="order-id">{pedido.id}</span>
                  <span
                    className="order-status"
                    style={{ background: 'var(--purple-soft)', color: 'var(--purple-primary)' }}
                  >
                    {pedido.estado}
                  </span>
                </div>
                <div className="order-details">
                  <span>📅 {pedido.fecha} • {pedido.items.length} productos</span>
                  <strong style={{ color: 'var(--pink-primary)', fontFamily: 'var(--font-heading)' }}>
                    ${pedido.total.toLocaleString('es-AR')}
                  </strong>
                </div>
              </div>
            ))}
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
                  <span className="fav-mini-name">{sticker.nombreCorto}</span>
                  <span className="fav-mini-price">
                    ${sticker.precio_final.toLocaleString('es-AR')}
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
            <div style={{ textStyle: 'center', padding: '30px 10px', textAlign: 'center', color: 'var(--text-secondary)' }}>
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
