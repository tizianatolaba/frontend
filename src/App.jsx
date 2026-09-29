import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import CatalogoView from './components/CatalogoView';
import ProductoView from './components/ProductoView';
import CarritoView from './components/CarritoView';
import CuentaView from './components/CuentaView';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import './index.css';

function MainRouter() {
  const { activeTab } = useShop();

  return (
    <main className="main-content">
      {activeTab === 'catalogo' && <CatalogoView />}
      {activeTab === 'producto' && <ProductoView />}
      {activeTab === 'carrito' && <CarritoView />}
      {activeTab === 'cuenta' && <CuentaView />}
    </main>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <div className="app-container">
        <Navbar />
        <MainRouter />
        <Footer />
        <ToastNotification />
      </div>
    </ShopProvider>
  );
}
