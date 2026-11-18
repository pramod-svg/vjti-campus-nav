import React, { useState } from 'react';
import {
  X,
  Navigation,
  Heart,
  Clock,
  Phone,
  Mail,
  MapPin,
  Accessibility,
  Layers,
  Sparkles,
  Check,
  Building,
  DoorOpen,
  Users,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LocationDrawer({
  location,
  onClose,
  onNavigateHere,
  onSelectNearby,
}) {
  const { user, toggleFavorite, isFavorite } = useAuth();
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
  const [roomFilter, setRoomFilter] = useState('');

  if (!location) return null;

  const isBookmarked = isFavorite(location._id);

  const activeFloor = location.floors && location.floors[selectedFloorIndex];
  const filteredRooms = activeFloor?.rooms
    ? activeFloor.rooms.filter(
        (r) =>
          r.name.toLowerCase().includes(roomFilter.toLowerCase()) ||
          r.roomNumber.toLowerCase().includes(roomFilter.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-y-0 right-0 z-[600] w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header Banner Image */}
      <div className="relative h-48 w-full flex-shrink-0">
        <img
          src={location.buildingImage}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Floating Action Buttons */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider">
            {location.category}
          </span>

          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={() => toggleFavorite(location._id)}
                title={isBookmarked ? 'Remove from saved' : 'Save location'}
                className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-rose-500 hover:scale-110 active:scale-95 transition-transform"
              >
                <Heart
                  className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-200'}`}
                />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title over banner */}
        <div className="absolute bottom-3 left-4 right-4">
          <h2 className="text-lg font-extrabold text-white leading-tight">
            {location.name}
          </h2>
          <p className="text-xs text-blue-200 font-medium">{location.department}</p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Primary CTA Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateHere(location)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Navigation className="w-4 h-4" />
            Get Directions Here
          </button>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            About This Location
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {location.description}
          </p>
        </div>

        {/* Operating Hours & Contact */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{location.openingHours || '08:00 AM - 06:00 PM'}</span>
          </div>
          {location.contactInfo?.phone && (
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{location.contactInfo.phone}</span>
            </div>
          )}
          {location.contactInfo?.email && (
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{location.contactInfo.email}</span>
            </div>
          )}
        </div>

        {/* Accessibility Information (HCI Highlight) */}
        <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <Accessibility className="w-4 h-4" />
            <span>Campus Accessibility Info</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {location.accessibilityInformation?.hasRamp && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[10px] font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Wheelchair Ramp Available
              </span>
            )}
            {location.accessibilityInformation?.hasElevator && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[10px] font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Elevator Access
              </span>
            )}
          </div>
          {location.accessibilityInformation?.notes && (
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 italic">
              {location.accessibilityInformation.notes}
            </p>
          )}
        </div>

        {/* Facilities Chips */}
        {location.facilities && location.facilities.length > 0 && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Facilities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {location.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  {fac}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Multi-Floor Navigation / Indoor Directory */}
        {location.floors && location.floors.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Floor & Room Directory
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">
                {location.floors.length} Floors
              </span>
            </div>

            {/* Floor Tabs */}
            <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              {location.floors.map((floor, fIdx) => (
                <button
                  key={fIdx}
                  onClick={() => setSelectedFloorIndex(fIdx)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    selectedFloorIndex === fIdx
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {floor.floorName}
                </button>
              ))}
            </div>

            {/* Floor Room Filter Input */}
            <input
              type="text"
              placeholder={`Filter rooms on ${activeFloor?.floorName}...`}
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 outline-none"
            />

            {/* Rooms List */}
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                        {room.roomNumber}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {room.name}
                      </span>
                    </div>
                    {room.capacity && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5 flex-shrink-0">
                        <Users className="w-3 h-3" />
                        {room.capacity}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-3">
                  No rooms match this search.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
