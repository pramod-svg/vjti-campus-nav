import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('campusvigation_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.getMe();
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Failed to authenticate with stored token:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('campusvigation_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success && res.token) {
      localStorage.setItem('campusvigation_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('campusvigation_token');
    setToken(null);
    setUser(null);
  };

  const toggleFavorite = async (locationId) => {
    if (!user) return false;
    try {
      const res = await api.toggleFavorite(locationId);
      if (res.success) {
        setUser((prev) => ({
          ...prev,
          favorites: res.favorites,
        }));
        return res.isFavorite;
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
    return false;
  };

  // Instant demo role switchers for HCI demonstration
  const loginAsStudent = async () => {
    return login('student@vjti.ac.in', 'password123');
  };

  const loginAsFaculty = async () => {
    return login('faculty@vjti.ac.in', 'password123');
  };

  const loginAsAdmin = async () => {
    return login('admin@vjti.ac.in', 'password123');
  };

  const isFavorite = (locationId) => {
    if (!user || !user.favorites) return false;
    return user.favorites.some((fav) => {
      const id = typeof fav === 'string' ? fav : fav._id;
      return id === locationId;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        toggleFavorite,
        isFavorite,
        loginAsStudent,
        loginAsFaculty,
        loginAsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
