import React from 'react';
import { useShop } from '../context/ShopContext';

export default function ToastNotification() {
  const { toast } = useShop();

  if (!toast.show) return null;

  return (
    <div className="toast-floating">
      {toast.image && (
        <img src={toast.image} alt="Sticker" className="toast-img" />
      )}
      <div className="toast-text">{toast.message}</div>
    </div>
  );
}
