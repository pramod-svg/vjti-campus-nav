import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Navigation,
  Trash2,
  Clock,
  MapPin,
  Building,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function FavoritesPage() {
  const { user, loginAsStudent, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await api.getFavorites();
        if (res.success) {
          setFavoriteLocations(res.data);
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemove = async (locationId) => {
    await toggleFavorite(locationId);
    setFavoriteLocations((prev) => prev.filter((loc) => loc._id !== locationId));
  };

  const handleNavigateTo = (location) => {
    navigate('/dashboard');
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Sign In to View Saved Places
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bookmark your frequent lecture halls, labs, favorite canteen spots, and offices for instant one-click navigation anytime.
          </p>
          <div className="pt-2">
            <button
              onClick={loginAsStudent}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              Quick Login as Student (Aarav)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Your Saved Campus Locations
            </h1>
            <p className="text-xs text-slate-500">
              Quick access shortcuts for {user.name} ({user.role})
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Go to Campus Map</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-2xl glass-panel animate-pulse" />
          ))}
        </div>
      ) : favoriteLocations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteLocations.map((loc) => (
            <div
              key={loc._id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={loc.buildingImage}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {loc.category}
                </span>
                <button
                  onClick={() => handleRemove(loc._id)}
                  title="Remove from favorites"
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-rose-500 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="font-extrabold text-sm text-white truncate">{loc.name}</h3>
                  <p className="text-[11px] text-blue-200">{loc.department}</p>
                </div>
              </div>

              {/* Card content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {loc.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>{loc.openingHours || '08:00 AM - 06:00 PM'}</span>
                </div>

                <button
                  onClick={() => handleNavigateTo(loc)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate Here on Map</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-3 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
            No saved places yet
          </h3>
          <p className="text-xs text-slate-500">
            Click the heart icon on any building or classroom drawer in the campus map to save it here.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all inline-block mt-2"
          >
            Explore Campus Map
          </button>
        </div>
      )}
    </div>
  );
}
