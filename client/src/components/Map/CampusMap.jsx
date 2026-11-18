import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import {
  Navigation,
  Compass,
  Crosshair,
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// Category color palette for custom pins
const CATEGORY_COLORS = {
  academic: '#2563eb', // Blue
  food: '#d97706', // Amber
  library: '#6366f1', // Indigo
  administration: '#059669', // Emerald
  accommodation: '#8b5cf6', // Purple
  recreation: '#ec4899', // Pink
  medical: '#dc2626', // Red
  parking: '#475569', // Slate
  facility: '#0891b2', // Cyan
};

// Category SVG Icons
const getCategorySvg = (category, color) => {
  return `
    <div style="
      background: ${color};
      width: 34px;
      height: 34px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.35);
      border: 2px solid #ffffff;
      cursor: pointer;
    ">
      <div style="
        transform: rotate(45deg);
        width: 10px;
        height: 10px;
        background: #ffffff;
        border-radius: 50%;
      "></div>
    </div>
  `;
};

// Create custom Leaflet HTML icon for each location
const createLocationIcon = (category, isSelected = false) => {
  const color = CATEGORY_COLORS[category] || '#2563eb';
  return L.divIcon({
    className: 'custom-campus-marker',
    html: `
      <div style="position: relative; ${isSelected ? 'transform: scale(1.3); z-index: 999;' : ''}">
        ${getCategorySvg(category, isSelected ? '#06b6d4' : color)}
        ${isSelected ? '<div style="position:absolute; -top: 6px; -left: 6px; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #06b6d4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
};

// User GPS icon with radar ring
const userGpsIcon = L.divIcon({
  className: 'user-gps-marker',
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;">
      <div class="radar-ring" style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(59, 130, 246, 0.4);"></div>
      <div style="width: 16px; height: 16px; border-radius: 50%; background: #2563eb; border: 3px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.4); position: relative; z-index: 10;"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Helper component to smoothly pan/zoom the map to bounds
function MapViewController({ center, zoom, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.isValid && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 19, duration: 1 });
    } else if (center) {
      map.flyTo(center, zoom || 17.5, { duration: 1.2 });
    }
  }, [center, zoom, bounds, map]);

  return null;
}

export default function CampusMap({
  locations = [],
  selectedLocation,
  onSelectLocation,
  userLocation,
  routeResult,
  showAllPaths = false,
  allPaths = [],
  onSetStartLocation,
  onSetDestination,
}) {
  const VJTI_CENTER = [19.0223, 72.8562];
  const [mapCenter, setMapCenter] = useState(VJTI_CENTER);
  const [mapZoom, setMapZoom] = useState(17.5);
  const [mapBounds, setMapBounds] = useState(null);

  // When a location is selected from search or list, fly to it
  useEffect(() => {
    if (selectedLocation?.coordinates) {
      setMapBounds(null);
      setMapCenter([selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]);
      setMapZoom(18.5);
    }
  }, [selectedLocation]);

  // When a route is calculated, fit bounds to the entire route
  useEffect(() => {
    if (routeResult?.primaryRoute?.coordinates?.length > 1) {
      const latLngs = routeResult.primaryRoute.coordinates.map((c) => [c.lat, c.lng]);
      const bounds = L.latLngBounds(latLngs);
      setMapBounds(bounds);
    }
  }, [routeResult]);

  // Format polyline coordinates for primary route
  const primaryRouteCoords =
    routeResult?.primaryRoute?.coordinates?.map((c) => [c.lat, c.lng]) || [];

  // Format polyline coordinates for alternative route
  const altRouteCoords =
    routeResult?.alternativeRoute?.coordinates?.map((c) => [c.lat, c.lng]) || [];

  const handleResetView = () => {
    setMapBounds(null);
    setMapCenter(VJTI_CENTER);
    setMapZoom(17.5);
  };

  const handleLocateMe = () => {
    if (userLocation) {
      setMapBounds(null);
      setMapCenter([userLocation.lat, userLocation.lng]);
      setMapZoom(18.5);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden shadow-glass border border-slate-200/80 dark:border-slate-800">
      <MapContainer
        center={VJTI_CENTER}
        zoom={17.5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* OpenStreetMap Base Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={20}
        />

        <MapViewController center={mapCenter} zoom={mapZoom} bounds={mapBounds} />

        {/* Walkable paths overlay if toggled */}
        {showAllPaths &&
          allPaths.map((p, idx) => (
            <Polyline
              key={p._id || idx}
              positions={p.pathCoordinates.map((c) => [c.lat, c.lng])}
              pathOptions={{
                color: p.accessibility?.wheelchairAccessible ? '#10b981' : '#f59e0b',
                weight: 3,
                dashArray: p.accessibility?.hasStairs ? '4, 6' : undefined,
                opacity: 0.6,
              }}
            />
          ))}

        {/* Alternative Route Polyline (Purple/Slate dashed) */}
        {altRouteCoords.length > 0 && (
          <Polyline
            positions={altRouteCoords}
            pathOptions={{
              color: '#8b5cf6',
              weight: 5,
              opacity: 0.75,
              dashArray: '10, 8',
              lineCap: 'round',
            }}
          />
        )}

        {/* Primary Shortest Route Polyline (Electric Cyan/Blue Glowing) */}
        {primaryRouteCoords.length > 0 && (
          <>
            {/* Outer Glow */}
            <Polyline
              positions={primaryRouteCoords}
              pathOptions={{
                color: '#38bdf8',
                weight: 9,
                opacity: 0.45,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Inner Core */}
            <Polyline
              positions={primaryRouteCoords}
              pathOptions={{
                color: '#0284c7',
                weight: 5,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </>
        )}

        {/* User GPS location Marker */}
        {userLocation && (
          <>
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userGpsIcon}
            >
              <Popup className="font-sans">
                <div className="p-1 text-center">
                  <p className="font-bold text-xs text-blue-600">Your Current Location</p>
                  <p className="text-[11px] text-slate-500">VJTI Campus Geolocation</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={20}
              pathOptions={{
                color: '#3b82f6',
                fillColor: '#60a5fa',
                fillOpacity: 0.15,
                weight: 1,
              }}
            />
          </>
        )}

        {/* Campus Location Markers */}
        {locations.map((loc) => {
          const isSelected = selectedLocation?._id === loc._id;
          return (
            <Marker
              key={loc._id}
              position={[loc.coordinates.lat, loc.coordinates.lng]}
              icon={createLocationIcon(loc.category, isSelected)}
              eventHandlers={{
                click: () => onSelectLocation(loc),
              }}
            >
              <Popup className="font-sans max-w-xs">
                <div className="p-2 space-y-2">
                  <div className="flex items-start gap-2">
                    <img
                      src={loc.buildingImage}
                      alt={loc.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-white"
                        style={{ background: CATEGORY_COLORS[loc.category] || '#2563eb' }}>
                        {loc.category}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-0.5 line-clamp-1">{loc.name}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{loc.department}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {loc.description}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                    <button
                      onClick={() => onSelectLocation(loc)}
                      className="flex-1 py-1 px-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onSetDestination && onSetDestination(loc)}
                      className="flex-1 py-1 px-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Navigation className="w-2.5 h-2.5" />
                      Navigate
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Controls in Top Right */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        {/* Reset view */}
        <button
          onClick={handleResetView}
          title="Reset to VJTI Center"
          className="p-2.5 rounded-xl glass-panel shadow-md hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all hover:scale-105 active:scale-95"
        >
          <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </button>

        {/* Locate me */}
        <button
          onClick={handleLocateMe}
          title="Center on My Location"
          className="p-2.5 rounded-xl glass-panel shadow-md hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all hover:scale-105 active:scale-95"
        >
          <Crosshair className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </button>
      </div>

      {/* Route Badge Overlay if route is active */}
      {routeResult?.primaryRoute && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto z-[400] glass-panel px-4 py-3 rounded-2xl shadow-xl flex items-center gap-4 max-w-md animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
            <Navigation className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {routeResult.primaryRoute.distance} m
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{routeResult.primaryRoute.walkingTimeMinutes} min walk
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {routeResult.primaryRoute.label || 'Shortest Walkway Path'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
