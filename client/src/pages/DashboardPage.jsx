import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CampusMap from '../components/Map/CampusMap';
import SmartSearchBar from '../components/Search/SmartSearchBar';
import NavigationPanel from '../components/Navigation/NavigationPanel';
import LocationDrawer from '../components/Location/LocationDrawer';
import NearbyPlacesPanel from '../components/Nearby/NearbyPlacesPanel';
import QRScannerModal from '../components/QR/QRScannerModal';
import EmergencyModal from '../components/Emergency/EmergencyModal';
import { api } from '../services/api';
import { Layers, MapPin, AlertCircle, Sparkles, Navigation, X } from 'lucide-react';

export default function DashboardPage({ onOpenEmergency, onOpenQR, qrModalOpen, setQrModalOpen, emergencyModalOpen, setEmergencyModalOpen }) {
  const [searchParams] = useSearchParams();

  // Locations state
  const [locations, setLocations] = useState([]);
  const [allPaths, setAllPaths] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wheelchairOnly, setWheelchairOnly] = useState(false);

  // User selection & drawer state
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPathsLayer, setShowPathsLayer] = useState(false);

  // Navigation state
  const [startLocationId, setStartLocationId] = useState('');
  const [endLocationId, setEndLocationId] = useState('');
  const [routeResult, setRouteResult] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState('');

  // Geolocation state
  const [userLocation, setUserLocation] = useState(null);
  const [geoStatus, setGeoStatus] = useState('prompt'); // 'prompt', 'granted', 'denied'

  // Toast / Status banner
  const [notification, setNotification] = useState('');

  // Fetch initial locations & paths
  useEffect(() => {
    const fetchCampusData = async () => {
      setLoadingLocations(true);
      try {
        const [locsRes, pathsRes] = await Promise.all([
          api.getLocations({ category: selectedCategory, search: searchQuery, wheelchairOnly }),
          api.getPaths(),
        ]);

        if (locsRes.success) setLocations(locsRes.data);
        if (pathsRes.success) setAllPaths(pathsRes.data);
      } catch (err) {
        console.error('Failed to fetch campus data:', err);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchCampusData();
  }, [selectedCategory, searchQuery, wheelchairOnly]);

  // Request user geolocation on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(coords);
          setGeoStatus('granted');
        },
        (error) => {
          console.warn('Geolocation warning or denied:', error.message);
          setGeoStatus('denied');
          // Fallback simulation: user positioned near VJTI Gate 1 entrance for testing
          setUserLocation({ lat: 19.0235, lng: 72.8560 });
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // When a destination is chosen from map popup or nearby list
  const handleSetDestination = (location) => {
    setEndLocationId(location._id);
    setSelectedLocation(location);

    // If starting point is empty and user has location, auto-set to user GPS or Gate 1
    if (!startLocationId) {
      setStartLocationId('user_gps');
    }

    setNotification(`Destination set to ${location.name}. Click 'Calculate Path' to navigate.`);
    setTimeout(() => setNotification(''), 4000);
  };

  // Swap Start & Destination
  const handleSwapPoints = () => {
    const temp = startLocationId;
    setStartLocationId(endLocationId);
    setEndLocationId(temp);
  };

  // Calculate Shortest Route
  const handleCalculateRoute = async () => {
    if (!startLocationId || !endLocationId) return;

    setRouteLoading(true);
    setRouteError('');

    try {
      let startCoords = null;
      let startId = null;

      if (startLocationId === 'user_gps') {
        startCoords = userLocation || { lat: 19.0235, lng: 72.8560 };
      } else {
        startId = startLocationId;
      }

      const res = await api.calculateRoute({
        startLocationId: startId,
        startCoords,
        endLocationId,
        wheelchairOnly,
      });

      if (res.success && res.route) {
        setRouteResult(res.route);
        setNotification(
          `Shortest path calculated: ${res.route.primaryRoute.distance}m (~${res.route.primaryRoute.walkingTimeMinutes} min walk)`
        );
        setTimeout(() => setNotification(''), 5000);
      } else {
        setRouteError(res.message || 'Could not find a walkable path.');
      }
    } catch (err) {
      setRouteError('Routing calculation failed. Check campus paths.');
    } finally {
      setRouteLoading(false);
    }
  };

  const handleClearRoute = () => {
    setRouteResult(null);
    setRouteError('');
  };

  // Handle building QR scan success
  const handleQRScanSuccess = (scannedLocation) => {
    setSelectedLocation(scannedLocation);
    setStartLocationId(scannedLocation._id);
    setNotification(`Localized at ${scannedLocation.name} via QR scan! Set your destination.`);
    setTimeout(() => setNotification(''), 5000);
  };

  // Handle emergency route activation
  const handleEmergencyRouteFound = ({ route, targetLocation, alertMessage }) => {
    setEndLocationId(targetLocation._id);
    setSelectedLocation(targetLocation);
    setRouteResult(route.route || route);
    setNotification(alertMessage);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col p-3 sm:p-4 lg:p-6 space-y-4 max-w-7xl mx-auto w-full">
      {/* Top Banner Notification */}
      {notification && (
        <div className="glass-panel px-4 py-2.5 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-900 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-300 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 animate-spin-slow" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification('')} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Smart Search Bar & Filters */}
      <SmartSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        wheelchairOnly={wheelchairOnly}
        onToggleWheelchair={() => setWheelchairOnly(!wheelchairOnly)}
        locations={locations}
        onSelectLocation={(loc) => {
          setSelectedLocation(loc);
          handleSetDestination(loc);
        }}
      />

      {/* Main Two-Column Navigation & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
        {/* Left Sidebar: Route Planner & Nearby Facilities */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          {/* Route Navigation Panel */}
          <NavigationPanel
            locations={locations}
            startLocationId={startLocationId}
            endLocationId={endLocationId}
            onStartChange={setStartLocationId}
            onEndChange={setEndLocationId}
            onSwapPoints={handleSwapPoints}
            onCalculateRoute={handleCalculateRoute}
            onClearRoute={handleClearRoute}
            routeResult={routeResult}
            loading={routeLoading}
            wheelchairOnly={wheelchairOnly}
            onToggleWheelchair={() => setWheelchairOnly(!wheelchairOnly)}
            userLocation={userLocation}
          />

          {routeError && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{routeError}</span>
            </div>
          )}

          {/* Nearby Facilities Explorer */}
          <NearbyPlacesPanel
            referenceCoords={selectedLocation?.coordinates || userLocation || { lat: 19.0223, lng: 72.8562 }}
            referenceName={selectedLocation ? selectedLocation.name : 'Your Location'}
            onSelectDestination={handleSetDestination}
          />
        </div>

        {/* Right Main Column: Interactive Leaflet Campus Map */}
        <div className="lg:col-span-8 h-[550px] lg:h-[720px] order-1 lg:order-2 relative">
          <CampusMap
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            userLocation={userLocation}
            routeResult={routeResult}
            showAllPaths={showPathsLayer}
            allPaths={allPaths}
            onSetStartLocation={(loc) => setStartLocationId(loc._id)}
            onSetDestination={handleSetDestination}
          />

          {/* Map Layer Controls in Bottom Left */}
          <div className="absolute bottom-4 left-4 z-[400] flex items-center gap-2">
            <button
              onClick={() => setShowPathsLayer(!showPathsLayer)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold glass-panel shadow-md border transition-all flex items-center gap-1.5 ${
                showPathsLayer
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
              }`}
              title="Show campus walkable pathway graph network"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showPathsLayer ? 'Hide Pathway Grid' : 'Show Walkway Grid'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Location Details Slide-in Drawer */}
      {selectedLocation && (
        <LocationDrawer
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          onNavigateHere={handleSetDestination}
          onSelectNearby={handleSetDestination}
        />
      )}

      {/* QR Code Scanner Modal */}
      <QRScannerModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        onScanSuccess={handleQRScanSuccess}
      />

      {/* Emergency SOS Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        currentCoords={userLocation}
        onEmergencyRouteFound={handleEmergencyRouteFound}
      />
    </div>
  );
}
