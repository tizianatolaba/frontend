import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIAS } from '../data/stickersData';
import { Heart, ShoppingCart, Sparkles, Star, Search, RefreshCw, AlertTriangle } from 'lucide-react';

export default function CatalogoView() {
  const { stickers, loading, error, fetchCatalogo, navigateTo, addToCart, favorites, toggleFavorite } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract categories dynamically or use static list
  const availableCategories = CATEGORIAS || [
    'Todos',
    ...Array.from(new Set(stickers.map(s => s.categoria).filter(Boolean)))
  ];

  // Filter logic
  const filteredStickers = stickers.filter(sticker => {
    const matchesCategory = selectedCategory === 'Todos' || sticker.categoria === selectedCategory;
    const matchesSearch =
      (sticker.nombre || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sticker.descripcion || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="catalogo-wrapper">
        <div className="hero-banner">
          <div className="hero-text">
            <div className="hero-tag">
              <Sparkles size={14} /> Nueva Colección Pastel 2026
            </div>
            <h1 className="hero-title">
              Expresá tu <span>mood</span> con los stickers más irresistibles
            </h1>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: '700', color: 'var(--purple-primary)' }}>
            <RefreshCw size={24} style={{ animation: 'spin 1.5s linear infinite' }} />
            Cargando stickers desde la API...
          </div>
          <div className="sticker-grid" style={{ marginTop: '30px' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="sticker-card" style={{ opacity: 0.7, pointerEvents: 'none' }}>
                <div className="card-img-wrapper" style={{ background: '#f5f3ff', height: '180px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={32} style={{ color: 'var(--purple-primary)', opacity: 0.5 }} />
                </div>
                <div style={{ background: '#e0e0e0', height: '14px', width: '50%', margin: '12px 0 6px', borderRadius: '8px' }} />
                <div style={{ background: '#eee', height: '20px', width: '80%', marginBottom: '16px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogo-wrapper">
        <div className="empty-cart-card" style={{ border: '2px dashed #FF70A6', marginTop: '40px' }}>
          <div className="empty-cart-icon" style={{ background: '#FFEBEB', color: '#FF4949' }}>
            <AlertTriangle size={44} />
          </div>
          <h2 className="empty-cart-title">No pudimos conectar con el servidor</h2>
          <p className="empty-cart-desc">{error}</p>
          <button className="btn-add-main" style={{ maxWidth: '240px' }} onClick={() => fetchCatalogo()}>
            <RefreshCw size={18} /> Reintentar conexión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogo-wrapper">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-text">
          <div className="hero-tag">
            <Sparkles size={14} /> Nueva Colección Pastel 2026
          </div>
          <h1 className="hero-title">
            Expresá tu <span>mood</span> con los stickers más irresistibles
          </h1>
          <p className="hero-subtitle">
            Vinilo troquelado impermeables, súper resistentes e ilustrados con mucho amor para tus cuadernos, laptop y termo.
          </p>
        </div>
        <div className="hero-decorations">
          <div className="hero-sticker-pill">
            <Star size={18} color="#FF70A6" fill="#FF70A6" /> 100% Waterproof
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input
            type="text"
            placeholder="Buscar sticker (ej: Gatito, Café, Lluvia...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              borderRadius: '999px',
              border: '2px solid var(--border-sticker)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              outline: 'none',
              background: 'white'
            }}
          />
        </div>

        {/* Category Chips */}
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          {availableCategories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sticker Grid */}
      <div className="sticker-grid">
        {filteredStickers.map(sticker => {
          const isFav = favorites.includes(sticker.id);

          return (
            <div
              key={sticker.id}
              className="sticker-card"
              onClick={() => navigateTo('producto', sticker.id)}
            >
              {/* Badge Tag */}
              {sticker.tag && (
                <span
                  className="card-badge-tag"
                  style={{ backgroundColor: sticker.color_badge || '#FF70A6' }}
                >
                  {sticker.tag}
                </span>
              )}

              {/* Heart Favorite Toggle Button */}
              <button
                className={`card-fav-btn ${isFav ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(sticker.id);
                }}
                title={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
              >
                <Heart size={18} fill={isFav ? "var(--pink-primary)" : "none"} />
              </button>

              {/* Image Container */}
              <div className="card-img-wrapper">
                <img
                  src={sticker.image_url}
                  alt={sticker.nombre}
                  className="card-img"
                  loading="lazy"
                />
              </div>

              {/* Card Information */}
              <span className="card-category">{sticker.categoria}</span>
              <h2 className="card-title">{sticker.nombre}</h2>

              {/* Card Footer Price & Add */}
              <div className="card-footer">
                <div className="card-price-block">
                  <span className="card-price-label">Precio Final</span>
                  <span className="card-price-amount">
                    ${(sticker.precio_final || 0).toLocaleString('es-AR')}
                  </span>
                  <span className="card-installments">
                    {sticker.cuotas_cantidad || 3} cuotas de ${(sticker.cuotas_valor || 0).toLocaleString('es-AR')}
                  </span>
                </div>

                <button
                  className="card-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(sticker, 1);
                  }}
                  title="Agregar al carrito"
                >
                  <ShoppingCart size={16} />
                  Agregar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStickers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '24px', border: '2px dashed var(--border-sticker)', margin: '20px 0' }}>
          <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            No encontramos ningún sticker con esa búsqueda 🔍
          </p>
          <button
            className="back-link-btn"
            style={{ marginTop: '16px' }}
            onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
          >
            Ver todos los stickers
          </button>
        </div>
      )}
    </div>
  );
}
