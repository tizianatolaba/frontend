import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { navigateTo } = useShop();

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          mood <span style={{ color: 'var(--pink-primary)' }}>Sticker</span> ✨
        </div>
        <p style={{ maxWidth: '400px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          La tienda online de stickers más coloridos, creativos y resistentes. Hechos con mucho amor para llenar tu día de buena energía.
        </p>

        <div className="footer-links">
          <a onClick={() => navigateTo('catalogo')} style={{ cursor: 'pointer' }}>Catálogo</a>
          <a onClick={() => navigateTo('carrito')} style={{ cursor: 'pointer' }}>Carrito</a>
          <a onClick={() => navigateTo('cuenta')} style={{ cursor: 'pointer' }}>Mi Cuenta</a>
        </div>

        <div className="footer-copy">
          © 2026 <strong>mood Sticker</strong>. Todos los derechos reservados. Diseñado con <Heart size={12} fill="var(--pink-primary)" color="var(--pink-primary)" style={{ verticalAlign: 'middle' }} /> para vos.
        </div>
      </div>
    </footer>
  );
}
