import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  MapPin,
  Route,
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Accessibility,
  X,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'locations' | 'paths' | 'users'
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [locations, setLocations] = useState([]);
  const [paths, setPaths] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Modals & Editing state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [pathModalOpen, setPathModalOpen] = useState(false);

  // Status banners
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Location Form State
  const [locationForm, setLocationForm] = useState({
    name: '',
    category: 'academic',
    department: '',
    description: '',
    lat: '19.02230',
    lng: '72.85620',
    buildingImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    facilities: 'Wi-Fi, Restrooms, Drinking Water',
    openingHours: '08:30 AM - 06:00 PM (Mon-Sat)',
    wheelchairAccessible: true,
    hasElevator: true,
    hasRamp: true,
    qrCodeKey: '',
  });

  // Path Form State
  const [pathForm, setPathForm] = useState({
    startName: '',
    startNodeId: '',
    startLat: '19.02250',
    startLng: '72.85610',
    endName: '',
    endNodeId: '',
    endLat: '19.02280',
    endLng: '72.85695',
    distance: '65',
    pathType: 'main_walkway',
    wheelchairAccessible: true,
    hasStairs: false,
  });

  // Load all admin data
  const loadData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, locsRes, pathsRes, usersRes] = await Promise.all([
        api.getAnalytics(),
        api.getLocations(),
        api.getPaths(),
        api.getUsers(),
      ]);

      if (analyticsRes.success) setAnalytics(analyticsRes);
      if (locsRes.success) setLocations(locsRes.data);
      if (pathsRes.success) setPaths(pathsRes.data);
      if (usersRes.success) setUsersList(usersRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setFeedback({ type: 'error', message: 'Error loading admin data: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 4000);
  };

  // Location CRUD
  const handleOpenAddLocation = () => {
    setEditingLocation(null);
    setLocationForm({
      name: '',
      category: 'academic',
      department: '',
      description: '',
      lat: '19.02230',
      lng: '72.85620',
      buildingImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      facilities: 'Wi-Fi, Restrooms, Drinking Water',
      openingHours: '08:30 AM - 06:00 PM (Mon-Sat)',
      wheelchairAccessible: true,
      hasElevator: true,
      hasRamp: true,
      qrCodeKey: '',
    });
    setLocationModalOpen(true);
  };

  const handleOpenEditLocation = (loc) => {
    setEditingLocation(loc);
    setLocationForm({
      name: loc.name,
      category: loc.category,
      department: loc.department || '',
      description: loc.description || '',
      lat: loc.coordinates?.lat?.toString() || '19.02230',
      lng: loc.coordinates?.lng?.toString() || '72.85620',
      buildingImage: loc.buildingImage || '',
      facilities: loc.facilities ? loc.facilities.join(', ') : '',
      openingHours: loc.openingHours || '',
      wheelchairAccessible: loc.accessibilityInformation?.wheelchairAccessible ?? true,
      hasElevator: loc.accessibilityInformation?.hasElevator ?? false,
      hasRamp: loc.accessibilityInformation?.hasRamp ?? true,
      qrCodeKey: loc.qrCodeKey || '',
    });
    setLocationModalOpen(true);
  };

  const handleSaveLocation = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: locationForm.name,
        category: locationForm.category,
        department: locationForm.department,
        description: locationForm.description,
        coordinates: {
          lat: parseFloat(locationForm.lat),
          lng: parseFloat(locationForm.lng),
        },
        buildingImage: locationForm.buildingImage,
        facilities: locationForm.facilities
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        openingHours: locationForm.openingHours,
        accessibilityInformation: {
          wheelchairAccessible: locationForm.wheelchairAccessible,
          hasElevator: locationForm.hasElevator,
          hasRamp: locationForm.hasRamp,
        },
        qrCodeKey: locationForm.qrCodeKey || undefined,
      };

      if (editingLocation) {
        const res = await api.updateLocation(editingLocation._id, payload);
        if (res.success) {
          showNotification('success', 'Location updated successfully!');
          setLocationModalOpen(false);
          loadData();
        } else {
          showNotification('error', res.message || 'Failed to update location.');
        }
      } else {
        const res = await api.createLocation(payload);
        if (res.success) {
          showNotification('success', 'New location added to campus map!');
          setLocationModalOpen(false);
          loadData();
        } else {
          showNotification('error', res.message || 'Failed to create location.');
        }
      }
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  const handleDeleteLocation = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from campus locations?`)) {
      try {
        const res = await api.deleteLocation(id);
        if (res.success) {
          showNotification('success', 'Location removed successfully.');
          loadData();
        } else {
          showNotification('error', res.message);
        }
      } catch (err) {
        showNotification('error', err.message);
      }
    }
  };

  // Paths CRUD
  const handleSavePath = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        startingPoint: {
          name: pathForm.startName,
          nodeId: pathForm.startNodeId || pathForm.startName.toLowerCase().replace(/\s+/g, '_'),
          coordinates: {
            lat: parseFloat(pathForm.startLat),
            lng: parseFloat(pathForm.startLng),
          },
        },
        endingPoint: {
          name: pathForm.endName,
          nodeId: pathForm.endNodeId || pathForm.endName.toLowerCase().replace(/\s+/g, '_'),
          coordinates: {
            lat: parseFloat(pathForm.endLat),
            lng: parseFloat(pathForm.endLng),
          },
        },
        distance: parseInt(pathForm.distance, 10) || 50,
        pathCoordinates: [
          { lat: parseFloat(pathForm.startLat), lng: parseFloat(pathForm.startLng) },
          { lat: parseFloat(pathForm.endLat), lng: parseFloat(pathForm.endLng) },
        ],
        accessibility: {
          wheelchairAccessible: pathForm.wheelchairAccessible,
          hasStairs: pathForm.hasStairs,
          surfaceType: 'paved',
        },
        pathType: pathForm.pathType,
        isBidirectional: true,
      };

      const res = await api.createPath(payload);
      if (res.success) {
        showNotification('success', 'Campus walkway path added to Dijkstra graph!');
        setPathModalOpen(false);
        loadData();
      } else {
        showNotification('error', res.message);
      }
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  const handleDeletePath = async (id) => {
    if (window.confirm('Delete this walkable pathway edge? The routing graph will automatically reload.')) {
      try {
        const res = await api.deletePath(id);
        if (res.success) {
          showNotification('success', 'Path removed from routing engine.');
          loadData();
        } else {
          showNotification('error', res.message);
        }
      } catch (err) {
        showNotification('error', err.message);
      }
    }
  };

  // Users Management
  const handleUpdateRole = async (userId, newRole) => {
    try {
      const res = await api.updateUserRole(userId, newRole);
      if (res.success) {
        showNotification('success', `User role updated to ${newRole}`);
        loadData();
      } else {
        showNotification('error', res.message);
      }
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  const handleDeleteUser = async (userId, name) => {
    if (window.confirm(`Delete user account "${name}"?`)) {
      try {
        const res = await api.deleteUser(userId);
        if (res.success) {
          showNotification('success', 'User removed successfully.');
          loadData();
        } else {
          showNotification('error', res.message);
        }
      } catch (err) {
        showNotification('error', err.message);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                Campus Administrator Console
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Manage VJTI campus buildings, GPS coordinates, graph pathways, and user access roles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View Live Map</span>
            </button>
          </div>
        </div>

        {/* Status notification toast banner */}
        {feedback.message && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in ${
              feedback.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-800 dark:text-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics &amp; Usage</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'locations'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Campus Locations ({locations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('paths')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'paths'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>Walkways &amp; Paths ({paths.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Accounts ({usersList.length})</span>
          </button>
        </div>

        {/* Tab 1: Analytics & Usage */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Campus Locations
                </span>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
                  {analytics.stats?.totalLocations || 0}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Buildings, labs &amp; services</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Walkable Graph Edges
                </span>
                <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-2">
                  {analytics.stats?.totalPaths || 0}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Pedestrian network paths</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Registered Users
                </span>
                <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mt-2">
                  {analytics.stats?.totalUsers || 0}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Students, faculty &amp; staff</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Accessible Routes
                </span>
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                  {analytics.stats?.accessibilityPercentage || 0}%
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Wheelchair / step-free ready</p>
              </div>
            </div>

            {/* Top Searched Destinations & Category Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Most Visited Campus Destinations</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">By search volume</span>
                </div>

                <div className="space-y-3">
                  {analytics.topDestinations?.map((dest, i) => (
                    <div
                      key={dest._id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                            {dest.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {dest.category} • {dest.department}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {dest.viewsCount} visits
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Location Category Distribution</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">Campus inventory</span>
                </div>

                <div className="space-y-3">
                  {analytics.categoryStats?.map((cat) => (
                    <div key={cat._id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 capitalize">
                        <span>{cat._id}</span>
                        <span>{cat.count} places</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          style={{
                            width: `${(cat.count / (analytics.stats?.totalLocations || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Searches Log */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Live Campus Search Feed
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {analytics.recentSearches?.map((item) => (
                  <div key={item._id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        "{item.searchedLocation}"
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span>{item.userId ? item.userId.name : 'Visitor / Guest'}</span>
                      <span>•</span>
                      <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Campus Locations Management */}
        {activeTab === 'locations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Campus Buildings &amp; Facilities
                </h3>
                <p className="text-xs text-slate-500">
                  Manage coordinates, floor maps, and facilities for all campus nodes.
                </p>
              </div>

              <button
                onClick={handleOpenAddLocation}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Building</span>
              </button>
            </div>

            {/* Locations Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="p-4">Building Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Coordinates (Lat, Lng)</th>
                      <th className="p-4">Accessibility</th>
                      <th className="p-4">Visits</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {locations.map((loc) => (
                      <tr key={loc._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={loc.buildingImage}
                              alt={loc.name}
                              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                            />
                            <div>
                              <p className="font-extrabold text-slate-900 dark:text-white">{loc.name}</p>
                              <p className="text-[11px] text-slate-500">{loc.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold capitalize text-slate-700 dark:text-slate-300">
                            {loc.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                          {loc.coordinates?.lat?.toFixed(5)}, {loc.coordinates?.lng?.toFixed(5)}
                        </td>
                        <td className="p-4">
                          {loc.accessibilityInformation?.wheelchairAccessible ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                              <Accessibility className="w-3.5 h-3.5" /> Yes
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400 font-medium">Stairs Only</span>
                          )}
                        </td>
                        <td className="p-4 font-bold text-blue-600 dark:text-blue-400">
                          {loc.viewsCount}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditLocation(loc)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
                              title="Edit Building"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLocation(loc._id, loc.name)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500"
                              title="Delete Building"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Paths Management */}
        {activeTab === 'paths' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Campus Walkway Graph Edges
                </h3>
                <p className="text-xs text-slate-500">
                  Network paths utilized by Dijkstra's algorithm for turn-by-turn routing.
                </p>
              </div>

              <button
                onClick={() => setPathModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Walkway Path</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="p-4">Start Point</th>
                      <th className="p-4">Destination Point</th>
                      <th className="p-4">Distance</th>
                      <th className="p-4">Path Type</th>
                      <th className="p-4">Wheelchair Ramp</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {paths.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          {p.startingPoint?.name}
                        </td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          {p.endingPoint?.name}
                        </td>
                        <td className="p-4 font-bold text-blue-600 dark:text-blue-400">
                          {p.distance}m
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold capitalize text-slate-700 dark:text-slate-300">
                            {p.pathType?.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          {p.accessibility?.wheelchairAccessible ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                              <Accessibility className="w-3.5 h-3.5" /> Accessible
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400">Has Stairs</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeletePath(p._id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500"
                            title="Delete Pathway Edge"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: User Accounts Management */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Registered University Users
              </h3>
              <p className="text-xs text-slate-500">
                Grant or revoke administrator, faculty, or student privileges.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-400">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Assigned Role</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {usersList.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          {u.name}
                        </td>
                        <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
                          {u.email}
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">
                          {u.department || 'General'}
                        </td>
                        <td className="p-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-xs capitalize text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty / Staff</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u._id, u.name)}
                            disabled={u._id === user?.id}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500 disabled:opacity-30"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Location Add/Edit Modal Form */}
        {locationModalOpen && (
          <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {editingLocation ? 'Edit Campus Location' : 'Add New Campus Location'}
                </h3>
                <button
                  onClick={() => setLocationModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLocation} className="p-6 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Building / Facility Name
                    </label>
                    <input
                      type="text"
                      value={locationForm.name}
                      onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                      placeholder="e.g. Chemical Engineering Block"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={locationForm.category}
                      onChange={(e) => setLocationForm({ ...locationForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    >
                      <option value="academic">Academic</option>
                      <option value="food">Food &amp; Dining</option>
                      <option value="library">Library</option>
                      <option value="administration">Administration</option>
                      <option value="accommodation">Hostels</option>
                      <option value="recreation">Sports &amp; Gym</option>
                      <option value="medical">Health &amp; Medical</option>
                      <option value="parking">Parking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={locationForm.department}
                      onChange={(e) => setLocationForm({ ...locationForm, department: e.target.value })}
                      placeholder="e.g. Chemical Engineering"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={locationForm.lat}
                      onChange={(e) => setLocationForm({ ...locationForm, lat: e.target.value })}
                      placeholder="19.02230"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Longitude
                    </label>
                    <input
                      type="text"
                      value={locationForm.lng}
                      onChange={(e) => setLocationForm({ ...locationForm, lng: e.target.value })}
                      placeholder="72.85620"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Building Image URL
                    </label>
                    <input
                      type="url"
                      value={locationForm.buildingImage}
                      onChange={(e) => setLocationForm({ ...locationForm, buildingImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Facilities (comma separated)
                    </label>
                    <input
                      type="text"
                      value={locationForm.facilities}
                      onChange={(e) => setLocationForm({ ...locationForm, facilities: e.target.value })}
                      placeholder="Wi-Fi, Elevator, Restrooms, Drinking Water"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={locationForm.description}
                      onChange={(e) => setLocationForm({ ...locationForm, description: e.target.value })}
                      placeholder="Building overview, history, and primary offices..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div className="col-span-2 flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={locationForm.wheelchairAccessible}
                        onChange={(e) => setLocationForm({ ...locationForm, wheelchairAccessible: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Wheelchair Accessible</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={locationForm.hasRamp}
                        onChange={(e) => setLocationForm({ ...locationForm, hasRamp: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Entrance Ramp</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={locationForm.hasElevator}
                        onChange={(e) => setLocationForm({ ...locationForm, hasElevator: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Elevator</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setLocationModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                  >
                    {editingLocation ? 'Save Changes' : 'Create Location'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Path Add Modal Form */}
        {pathModalOpen && (
          <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Add Campus Walkway Path Edge
                </h3>
                <button
                  onClick={() => setPathModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePath} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Start Point Node Name
                    </label>
                    <input
                      type="text"
                      value={pathForm.startName}
                      onChange={(e) => setPathForm({ ...pathForm, startName: e.target.value })}
                      placeholder="e.g. Main Porch"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Destination Node Name
                    </label>
                    <input
                      type="text"
                      value={pathForm.endName}
                      onChange={(e) => setPathForm({ ...pathForm, endName: e.target.value })}
                      placeholder="e.g. IT Block Path"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Distance (meters)
                    </label>
                    <input
                      type="number"
                      value={pathForm.distance}
                      onChange={(e) => setPathForm({ ...pathForm, distance: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Path Type
                    </label>
                    <select
                      value={pathForm.pathType}
                      onChange={(e) => setPathForm({ ...pathForm, pathType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    >
                      <option value="main_walkway">Main Paved Walkway</option>
                      <option value="paved_road">Paved Campus Road</option>
                      <option value="covered_corridor">Covered Corridor</option>
                      <option value="garden_path">Garden Pathway</option>
                      <option value="stairs">Outdoor Stairs</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={pathForm.wheelchairAccessible}
                        onChange={(e) => setPathForm({ ...pathForm, wheelchairAccessible: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Wheelchair Accessible</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={pathForm.hasStairs}
                        onChange={(e) => setPathForm({ ...pathForm, hasStairs: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Has Steps / Stairs</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setPathModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                  >
                    Add to Routing Graph
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
