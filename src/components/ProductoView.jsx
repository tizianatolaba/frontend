import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  Heart,
  Droplet
} from 'lucide-react';

export default function ProductoView() {
  const { currentSticker, addToCart, navigateTo, favorites, toggleFavorite } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFav = favorites.includes(currentSticker.id);

  const handleAddToCart = () => {
    addToCart(currentSticker, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 4000);
  };

  return (
    <div className="product-detail-container">
      {/* Top Header Navigation */}
      <div className="detail-nav-header">
        <button
          className="back-link-btn"
          onClick={() => navigateTo('catalogo')}
        >
          <ArrowLeft size={18} /> Volver al catálogo
        </button>

        <button
          className="back-link-btn"
          style={{ background: 'var(--pink-soft)', color: 'var(--pink-primary)' }}
          onClick={() => navigateTo('carrito')}
        >
          <ShoppingBag size={18} /> Ir al carrito
        </button>
      </div>

      {/* Product Detail Main Grid */}
      <div className="detail-grid">
        {/* Left Column: Large Sticker Image Preview */}
        <div className="detail-img-card">
          {/* Favorite heart on detail page */}
          <button
            className={`card-fav-btn ${isFav ? 'active' : ''}`}
            style={{ top: '16px', right: '16px' }}
            onClick={() => toggleFavorite(currentSticker.id)}
            title={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart size={20} fill={isFav ? "var(--pink-primary)" : "none"} />
          </button>

          <img
            src={currentSticker.image_url}
            alt={currentSticker.nombre}
            className="detail-large-img"
          />

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--purple-primary)', background: 'white', padding: '6px 14px', borderRadius: '999px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              ✨ Finish: {currentSticker.acabado}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', background: 'white', padding: '6px 14px', borderRadius: '999px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              📏 Tamaño: {currentSticker.tamano}
            </span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="detail-info">
          {/* Badges */}
          <div className="detail-badge-group">
            <span className="detail-category-badge">{currentSticker.categoria}</span>
            <span className="detail-garantia-badge">
              <ShieldCheck size={16} /> Garantía: {currentSticker.garantia_meses} meses
            </span>
          </div>

          {/* Product Title */}
          <h1 className="detail-title">{currentSticker.nombre}</h1>

          {/* Price Box */}
          <div className="detail-price-box">
            <div>
              <span style={{ fontSize: '13px', display: 'block', color: 'var(--text-secondary)', fontWeight: '600' }}>
                Precio Final
              </span>
              <span className="detail-final-price">
                ${currentSticker.precio_final.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="detail-cuotas-info">
              <CreditCard size={18} style={{ verticalAlign: 'middle', marginRight: '4px', color: 'var(--purple-primary)' }} />
              <span>
                {currentSticker.cuotas_cantidad} cuotas sin interés de{' '}
                <strong style={{ color: 'var(--purple-primary)' }}>
                  ${currentSticker.cuotas_valor.toLocaleString('es-AR')}
                </strong>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="detail-description">{currentSticker.descripcion}</p>

          {/* Specs List */}
          <div className="detail-specs-list">
            <div className="spec-item">
              <Droplet size={18} /> 100% Resistente al agua
            </div>
            <div className="spec-item">
              <Sparkles size={18} /> Vinilo troquelado premium
            </div>
            <div className="spec-item">
              <ShieldCheck size={18} /> Garantía oficial de {currentSticker.garantia_meses} meses
            </div>
            <div className="spec-item">
              <CreditCard size={18} /> {currentSticker.cuotas_cantidad} cuotas de ${currentSticker.cuotas_valor}
            </div>
          </div>

          {/* Quantity Selector & Add Button Panel */}
          <div className="detail-action-panel">
            <div className="quantity-selector-wrapper">
              <span className="quantity-label">Cantidad:</span>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart Main Button */}
            <button
              className="btn-add-main"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={22} />
              Agregar al carrito
            </button>

            {/* Confirmation Banner */}
            {addedSuccess && (
              <div
                style={{
                  background: 'var(--mint-soft)',
                  border: '2px solid var(--mint-primary)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#0D7D54',
                  fontWeight: '700',
                  fontSize: '15px',
                  animation: 'scaleUp 0.3s ease'
                }}
              >
                <CheckCircle2 size={22} />
                ¡Agregaste {quantity} {quantity === 1 ? 'sticker' : 'stickers'} al carrito con éxito! ✨
              </div>
            )}

            {/* Navigation Buttons Row */}
            <div className="detail-nav-actions">
              <button
                className="btn-secondary-link"
                onClick={() => navigateTo('catalogo')}
              >
                <ArrowLeft size={16} /> Volver al catálogo
              </button>
              <button
                className="btn-secondary-link"
                style={{ background: 'var(--pink-soft)', color: 'var(--pink-primary)' }}
                onClick={() => navigateTo('carrito')}
              >
                <ShoppingBag size={16} /> Ir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
