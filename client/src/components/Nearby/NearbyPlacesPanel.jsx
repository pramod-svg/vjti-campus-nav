import React, { useState, useEffect } from 'react';
import {
  Compass,
  Coffee,
  BookOpen,
  Car,
  HeartPulse,
  Sparkles,
  Footprints,
  Clock,
  Navigation,
  ChevronRight,
} from 'lucide-react';
import { api } from '../../services/api';

const QUICK_FILTERS = [
  { id: 'all', label: 'All', icon: Compass },
  { id: 'food', label: 'Dining', icon: Coffee },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'medical', label: 'Medical', icon: HeartPulse },
  { id: 'parking', label: 'Parking', icon: Car },
];

export default function NearbyPlacesPanel({
  referenceCoords,
  referenceName = 'Your Location',
  onSelectDestination,
}) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [nearbyList, setNearbyList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!referenceCoords?.lat || !referenceCoords?.lng) return;

    const fetchNearby = async () => {
      setLoading(true);
      try {
        const res = await api.getNearbyLocations(
          referenceCoords.lat,
          referenceCoords.lng,
          selectedFilter,
          450
        );
        if (res.success) {
          setNearbyList(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch nearby locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearby();
  }, [referenceCoords, selectedFilter]);

  if (!referenceCoords) return null;

  return (
    <div className="glass-panel rounded-2xl p-4 shadow-glass space-y-3 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Nearby Facilities
            </h3>
            <p className="text-[10px] text-slate-400">Around {referenceName}</p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Within 400m
        </span>
      </div>

      {/* Quick Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {QUICK_FILTERS.map((f) => {
          const Icon = f.icon;
          const isActive = selectedFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Places List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {loading ? (
          <div className="space-y-2 py-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-14 rounded-xl bg-slate-100 dark:bg-slate-800/60 animate-pulse"
              />
            ))}
          </div>
        ) : nearbyList.length > 0 ? (
          nearbyList.map((place) => (
            <div
              key={place._id}
              onClick={() => onSelectDestination(place)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={place.buildingImage}
                  alt={place.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {place.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 font-semibold">
                      <Footprints className="w-3 h-3" />
                      {place.distanceMeters}m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      ~{place.walkingMinutes} min
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDestination(place);
                }}
                className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all"
                title="Navigate to this location"
              >
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">
            No facilities found within 400m for this category.
          </p>
        )}
      </div>
    </div>
  );
}
