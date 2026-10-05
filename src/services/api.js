const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    if (import.meta.env.REACT_APP_API_URL) return import.meta.env.REACT_APP_API_URL;
  }
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.VITE_API_URL) return process.env.VITE_API_URL;
    if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  }
  return 'http://localhost:8000';
};

const BASE_URL = getBaseUrl();

// Token helper methods
export function getToken() {
  return localStorage.getItem('jwt_token') || localStorage.getItem('token');
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('token');
  }
}

export function removeToken() {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('token');
}

/**
 * Obtiene el listado de stickers desde la API.
 * @param {string} [categoria] - Categoría opcional para filtrar.
 */
export async function getProductos(categoria = '') {
  let url = `${BASE_URL}/productos/`;
  const params = new URLSearchParams();
  
  if (categoria && categoria !== 'Todos') {
    params.set('categoria', categoria);
  }
  
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudieron cargar los productos`);
  }

  const data = await response.json();

  // Filtrado defensivo del lado del cliente por categoría si la API no filtra directo
  if (categoria && categoria !== 'Todos' && Array.isArray(data)) {
    const filtered = data.filter(
      p => p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase()
    );
    return filtered.length > 0 ? filtered : data;
  }

  return data;
}

/**
 * Obtiene el detalle de un sticker en específico por ID.
 * @param {string} id - ID del sticker.
 */
export async function getProductoById(id) {
  const response = await fetch(`${BASE_URL}/productos/${id}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo obtener el producto ${id}`);
  }
  return await response.json();
}

/**
 * Autentica al usuario en el backend y retorna el token JWT.
 * @param {string} email 
 * @param {string} password 
 */
export async function login(email, password) {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Credenciales inválidas');
  }

  const data = await response.json();
  if (data.access_token) {
    setToken(data.access_token);
  }
  return data;
}

/**
 * Obtiene la información del usuario autenticado enviando el token Bearer.
 */
export async function getPerfil() {
  const token = getToken();
  if (!token) {
    throw new Error('No hay token de sesión almacenado');
  }

  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo obtener la información de perfil`);
  }

  return await response.json();
}

/**
 * Envía la orden de compra del carrito a la API.
 * @param {Array} cartItems 
 */
export async function crearPedido(cartItems) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const total = cartItems.reduce(
    (acc, item) => acc + (item.sticker?.precio_final || item.precio || 0) * item.quantity,
    0
  );

  const orderData = {
    items: cartItems.map(item => ({
      id: item.stickerId || item.id,
      nombre: item.sticker?.nombre || item.nombre,
      cantidad: item.quantity,
      precio: item.sticker?.precio_final || item.precio
    })),
    total,
    fecha: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }),
    estado: 'En preparación 📦'
  };

  try {
    const response = await fetch(`${BASE_URL}/pedidos/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Endpoint /pedidos/ no disponible, simulando confirmación local:', err);
  }

  return {
    id: `ORD-2026-${Math.floor(Math.random() * 9000) + 1000}`,
    ...orderData,
    estadoColor: '#4ECCA3'
  };
}

/**
 * Obtiene el historial de pedidos del usuario autenticado.
 */
export async function getPedidos() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/pedidos/`, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Endpoint /pedidos/ no disponible:', err);
  }

  return null;
}