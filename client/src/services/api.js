const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
  const token = localStorage.getItem('campusvigation_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth
  login: async (credentials) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Locations
  getLocations: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/locations${query ? `?${query}` : ''}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getLocationById: async (id) => {
    const res = await fetch(`${BASE_URL}/locations/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getLocationByQR: async (qrKey) => {
    const res = await fetch(`${BASE_URL}/locations/qr/${qrKey}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getNearbyLocations: async (lat, lng, category = 'all', maxDistance = 400) => {
    const res = await fetch(
      `${BASE_URL}/locations/nearby?lat=${lat}&lng=${lng}&category=${category}&maxDistance=${maxDistance}`,
      { headers: getHeaders() }
    );
    return res.json();
  },

  // Navigation
  calculateRoute: async (routePayload) => {
    const res = await fetch(`${BASE_URL}/navigation/route`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(routePayload),
    });
    return res.json();
  },

  getEmergencyRoute: async (coords, emergencyType = 'medical') => {
    const res = await fetch(`${BASE_URL}/navigation/emergency`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ currentCoords: coords, emergencyType }),
    });
    return res.json();
  },

  // Favorites
  getFavorites: async () => {
    const res = await fetch(`${BASE_URL}/favorites`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  toggleFavorite: async (locationId) => {
    const res = await fetch(`${BASE_URL}/favorites/${locationId}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  removeFavorite: async (locationId) => {
    const res = await fetch(`${BASE_URL}/favorites/${locationId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Admin
  getAnalytics: async () => {
    const res = await fetch(`${BASE_URL}/analytics/dashboard`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  createLocation: async (locationData) => {
    const res = await fetch(`${BASE_URL}/locations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(locationData),
    });
    return res.json();
  },

  updateLocation: async (id, locationData) => {
    const res = await fetch(`${BASE_URL}/locations/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(locationData),
    });
    return res.json();
  },

  deleteLocation: async (id) => {
    const res = await fetch(`${BASE_URL}/locations/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  getPaths: async () => {
    const res = await fetch(`${BASE_URL}/paths`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  createPath: async (pathData) => {
    const res = await fetch(`${BASE_URL}/paths`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(pathData),
    });
    return res.json();
  },

  deletePath: async (id) => {
    const res = await fetch(`${BASE_URL}/paths/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // User Management (Admin)
  getUsers: async () => {
    const res = await fetch(`${BASE_URL}/auth/users`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  updateUserRole: async (id, role) => {
    const res = await fetch(`${BASE_URL}/auth/users/${id}/role`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ role }),
    });
    return res.json();
  },

  deleteUser: async (id) => {
    const res = await fetch(`${BASE_URL}/auth/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },
};
