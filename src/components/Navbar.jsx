import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Grid, User, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { activeTab, navigateTo, cartTotalItems } = useShop();

  return (
    <header className="navbar-sticky">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="logo-container" onClick={() => navigateTo('catalogo')}>
          <div className="logo-badge">
            <Sparkles size={24} />
          </div>
          <div className="logo-text">
            mood <span className="logo-highlight">Sticker</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <nav className="nav-links">
          <button
            className={`nav-button ${activeTab === 'catalogo' || activeTab === 'producto' ? 'active' : ''}`}
            onClick={() => navigateTo('catalogo')}
          >
            <Grid size={18} />
            Catálogo
          </button>

          <button
            className={`nav-button ${activeTab === 'carrito' ? 'active' : ''}`}
            onClick={() => navigateTo('carrito')}
          >
            <ShoppingBag size={18} />
            Carrito
            {cartTotalItems > 0 && (
              <span className="cart-count-badge">{cartTotalItems}</span>
            )}
          </button>

          <button
            className={`nav-button ${activeTab === 'cuenta' ? 'active' : ''}`}
            onClick={() => navigateTo('cuenta')}
          >
            <User size={18} />
            Cuenta
          </button>
        </nav>
      </div>
    </header>
  );
}
