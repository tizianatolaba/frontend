import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  User,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CarritoView() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotalPrice,
    cartTotalItems,
    navigateTo
  } = useShop();

  const [checkoutModal, setCheckoutModal] = useState(false);

  const handleFinalizarCompra = () => {
    // Launch confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback if canvas not available
    }

    setCheckoutModal(true);
  };

  const handleCloseCheckoutModal = () => {
    setCheckoutModal(false);
    clearCart();
    navigateTo('cuenta');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper">
        {/* Navigation Bar */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="back-link-btn" onClick={() => navigateTo('catalogo')}>
            <ArrowLeft size={16} /> Ir al Catálogo
          </button>
          <button className="back-link-btn" onClick={() => navigateTo('cuenta')}>
            <User size={16} /> Mi Cuenta
          </button>
        </div>

        {/* Empty Cart State */}
        <div className="empty-cart-card">
          <div className="empty-cart-icon">
            <ShoppingBag size={44} />
          </div>
          <h2 className="empty-cart-title">Tu carrito está vacío</h2>
          <p className="empty-cart-desc">
            ¡Todavía no agregaste ningún sticker a tu pedido! Explora nuestro catálogo y descubrí los modelos más coloridos y divertidos.
          </p>
          <button className="btn-add-main" style={{ maxWidth: '280px' }} onClick={() => navigateTo('catalogo')}>
            <Sparkles size={20} /> Explorar Stickers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      {/* Navigation & Header */}
      <div className="cart-header-title">
        <h1 style={{ fontSize: '30px', fontWeight: '700' }}>
          Tu Carrito de Stickers 🛒 ({cartTotalItems})
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="back-link-btn" onClick={() => navigateTo('catalogo')}>
            <ArrowLeft size={16} /> Catálogo
          </button>
          <button className="back-link-btn" onClick={() => navigateTo('cuenta')}>
            <User size={16} /> Cuenta
          </button>
        </div>
      </div>

      {/* Cart Layout */}
      <div className="cart-layout">
        {/* Left: Added Stickers List */}
        <div className="cart-items-card">
          {cart.map(({ stickerId, quantity, sticker }) => {
            const subtotal = sticker.precio_final * quantity;

            return (
              <div key={stickerId} className="cart-item-row">
                {/* Thumbnail Image */}
                <img
                  src={sticker.image_url}
                  alt={sticker.nombre}
                  className="cart-item-img"
                  onClick={() => navigateTo('producto', stickerId)}
                  style={{ cursor: 'pointer' }}
                />

                {/* Info */}
                <div className="cart-item-info">
                  <span className="cart-item-category">{sticker.categoria}</span>
                  <span
                    className="cart-item-name"
                    onClick={() => navigateTo('producto', stickerId)}
                    style={{ cursor: 'pointer' }}
                  >
                    {sticker.nombre}
                  </span>
                  <span className="cart-item-price">
                    Precio unitario: ${sticker.precio_final.toLocaleString('es-AR')}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="quantity-controls" style={{ transform: 'scale(0.9)' }}>
                  <button
                    className="qty-btn"
                    onClick={() => updateCartQuantity(stickerId, -1)}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateCartQuantity(stickerId, 1)}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="cart-item-subtotal">
                  ${subtotal.toLocaleString('es-AR')}
                </div>

                {/* Delete Button */}
                <button
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(stickerId)}
                  title="Eliminar sticker"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary-card">
          <h2 className="summary-title">Resumen de Compra</h2>

          <div className="summary-line">
            <span>Productos ({cartTotalItems})</span>
            <span>${cartTotalPrice.toLocaleString('es-AR')}</span>
          </div>

          <div className="summary-line">
            <span>Envío a domicilio</span>
            <span style={{ color: 'var(--mint-primary)', fontWeight: '700' }}>¡GRATIS! 🎁</span>
          </div>

          <div className="summary-line" style={{ fontSize: '13px', color: 'var(--text-light)' }}>
            <span>Garantía de stickers</span>
            <span>6 Meses Incluida</span>
          </div>

          <div className="summary-total-line">
            <span>Total de la compra</span>
            <span className="summary-total-price">
              ${cartTotalPrice.toLocaleString('es-AR')}
            </span>
          </div>

          <button className="btn-checkout" onClick={handleFinalizarCompra}>
            <PackageCheck size={22} />
            Finalizar compra
          </button>
        </div>
      </div>

      {/* Checkout Success Modal */}
      {checkoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon-badge" style={{ background: 'var(--mint-soft)', color: 'var(--mint-primary)' }}>
              <CheckCircle2 size={44} />
            </div>
            <h2 className="modal-title">¡Compra realizada con éxito! ✨</h2>
            <p className="modal-body">
              ¡Muchas gracias por tu compra en <strong>mood Sticker</strong>! Tu pedido fue registrado y ya lo estamos preparando con mucho amor y regalitos extra.
            </p>
            <div style={{ background: '#FAF8FD', padding: '16px', borderRadius: '16px', marginBottom: '20px', textAlign: 'left', fontSize: '14px' }}>
              <div><strong>Nº de Pedido:</strong> ORD-2026-{(Math.floor(Math.random() * 9000) + 1000)}</div>
              <div><strong>Total abonado:</strong> ${cartTotalPrice.toLocaleString('es-AR')}</div>
              <div><strong>Estado:</strong> En preparación 📦</div>
            </div>
            <button className="btn-checkout" onClick={handleCloseCheckoutModal}>
              Ver mis pedidos en Mi Cuenta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
