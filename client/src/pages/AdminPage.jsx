import React, { useState, useEffect } from 'react';
import {
  Shield,
  Building,
  Users,
  Route,
  Accessibility,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Search,
  CheckCircle,
  X,
  AlertTriangle,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AdminPage() {
  const { user, loginAsAdmin } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [locations, setLocations] = useState([]);
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('locations'); // 'locations', 'paths', 'analytics'

  // Modal State for Add / Edit Building
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'academic',
    department: '',
    description: '',
    coordinates: { lat: 19.0225, lng: 72.8561 },
    buildingImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    facilities: 'Wi-Fi, Wheelchair Ramp, Restrooms, Drinking Water',
    openingHours: '08:30 AM - 05:30 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ramped entrance available.',
    },
    qrCodeKey: '',
  });

  const [message, setMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, locsRes, pathsRes] = await Promise.all([
        api.getAnalytics(),
        api.getLocations(),
        api.getPaths(),
      ]);

      if (analyticsRes.success) setAnalytics(analyticsRes);
      if (locsRes.success) setLocations(locsRes.data);
      if (pathsRes.success) setPaths(pathsRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Admin Access Required
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The CampusVigation administrative panel is protected for campus estate managers and IT directors to update coordinates and walkable paths.
          </p>
          <div className="pt-2">
            <button
              onClick={loginAsAdmin}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Login as Campus Administrator (Prof. Deshmukh)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Open modal for new location
  const handleAddNew = () => {
    setEditingLocation(null);
    setFormData({
      name: '',
      category: 'academic',
      department: 'Campus Wide',
      description: '',
      coordinates: { lat: 19.0225, lng: 72.8561 },
      buildingImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      facilities: 'Wi-Fi, Wheelchair Ramp, Restrooms, Drinking Water',
      openingHours: '08:30 AM - 05:30 PM',
      accessibilityInformation: {
        wheelchairAccessible: true,
        hasElevator: false,
        hasRamp: true,
        notes: 'Step-free entrance available.',
      },
      qrCodeKey: `VJTI-BLDG-${Date.now().toString().slice(-4)}`,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (loc) => {
    setEditingLocation(loc);
    setFormData({
      name: loc.name,
      category: loc.category,
      department: loc.department || '',
      description: loc.description,
      coordinates: { lat: loc.coordinates.lat, lng: loc.coordinates.lng },
      buildingImage: loc.buildingImage,
      facilities: (loc.facilities || []).join(', '),
      openingHours: loc.openingHours || '08:30 AM - 05:30 PM',
      accessibilityInformation: loc.accessibilityInformation || {
        wheelchairAccessible: true,
        hasElevator: false,
        hasRamp: true,
        notes: '',
      },
      qrCodeKey: loc.qrCodeKey || '',
    });
    setIsModalOpen(true);
  };

  // Handle delete location
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campus location?')) return;
    try {
      const res = await api.deleteLocation(id);
      if (res.success) {
        setMessage('Location deleted successfully');
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      alert('Failed to delete location');
    }
  };

  // Submit Add / Edit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        facilities: formData.facilities.split(',').map((f) => f.trim()).filter(Boolean),
        coordinates: {
          lat: parseFloat(formData.coordinates.lat),
          lng: parseFloat(formData.coordinates.lng),
        },
      };

      if (editingLocation) {
        await api.updateLocation(editingLocation._id, payload);
        setMessage('Location updated successfully');
      } else {
        await api.createLocation(payload);
        setMessage('New location created successfully');
      }
      setIsModalOpen(false);
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Error saving location');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              CampusVigation Admin Panel
            </h1>
            <p className="text-xs text-slate-500">
              VJTI Matunga Campus Infrastructure & Coordinates Management
            </p>
          </div>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Campus Building</span>
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>{message}</span>
        </div>
      )}

      {/* Analytics Overview Cards */}
      {analytics?.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Users</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analytics.stats.totalUsers}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Students ({analytics.stats.studentsCount}) • Faculty ({analytics.stats.facultyCount})
            </p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">Campus Locations</span>
              <Building className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analytics.stats.totalLocations}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Mapped buildings & departments</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">Walkable Paths</span>
              <Route className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analytics.stats.totalPaths}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Connected graph segments</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">Accessibility</span>
              <Accessibility className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {analytics.stats.accessibilityPercentage}%
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Wheelchair ramp compliant</p>
          </div>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('locations')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'locations'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Manage Campus Locations ({locations.length})
        </button>
        <button
          onClick={() => setActiveTab('paths')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'paths'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Manage Walkable Paths ({paths.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Most Searched & Search History
        </button>
      </div>

      {/* TAB 1: Locations Table */}
      {activeTab === 'locations' && (
        <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Building Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Coordinates (Lat, Lng)</th>
                  <th className="py-3 px-4">Floors</th>
                  <th className="py-3 px-4">QR Key</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {locations.map((loc) => (
                  <tr key={loc._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={loc.buildingImage}
                          alt={loc.name}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{loc.name}</p>
                          <p className="text-[10px] text-slate-400">{loc.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-semibold uppercase">
                        {loc.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {loc.coordinates.lat.toFixed(5)}, {loc.coordinates.lng.toFixed(5)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {loc.floors?.length || 1}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-indigo-500 font-bold">
                      {loc.qrCodeKey || '—'}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {loc.viewsCount || 0}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEdit(loc)}
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                          title="Edit location"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(loc._id)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-500 transition-colors"
                          title="Delete location"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Walkable Paths List */}
      {activeTab === 'paths' && (
        <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Starting Node</th>
                  <th className="py-3 px-4">Ending Node</th>
                  <th className="py-3 px-4">Distance (m)</th>
                  <th className="py-3 px-4">Path Type</th>
                  <th className="py-3 px-4">Wheelchair Accessible</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paths.map((p, idx) => (
                  <tr key={p._id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {p.startingPoint.name}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {p.endingPoint.name}
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">
                      {p.distance} m
                    </td>
                    <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-500">
                      {p.pathType}
                    </td>
                    <td className="py-3 px-4">
                      {p.accessibility?.wheelchairAccessible ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                          Yes (Ramp / Flat)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] font-semibold">
                          No (Steps/Stairs)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Analytics & Search History */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Destination Locations */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Most Visited & Searched Destinations
            </h3>
            <div className="space-y-2">
              {analytics?.topDestinations?.map((dest, idx) => (
                <div
                  key={dest._id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{dest.name}</p>
                      <p className="text-[10px] text-slate-400">{dest.category}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">
                    {dest.viewsCount} views
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Search History Log */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-500" />
              Recent Search History
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {analytics?.recentSearches?.map((s, idx) => (
                <div
                  key={s._id || idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      "{s.searchedLocation}"
                    </p>
                    <p className="text-[10px] text-slate-400">
                      User: {s.userId?.name || 'Guest Student'}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(s.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Add / Edit Location */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[700] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {editingLocation ? 'Edit Campus Location' : 'Add New Campus Location'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Department of Mechanical Engineering"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="academic">Academic</option>
                    <option value="food">Food & Cafeteria</option>
                    <option value="library">Library</option>
                    <option value="administration">Administration</option>
                    <option value="accommodation">Hostel & Accommodation</option>
                    <option value="recreation">Sports & Recreation</option>
                    <option value="medical">Medical & Health</option>
                    <option value="parking">Parking</option>
                    <option value="facility">Facility</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Mechanical Engineering"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Latitude (VJTI: ~19.022) *
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={formData.coordinates.lat}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: { ...formData.coordinates, lat: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Longitude (VJTI: ~72.856) *
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={formData.coordinates.lng}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: { ...formData.coordinates, lng: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of the building..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Facilities (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.facilities}
                  onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                  placeholder="Wi-Fi, Wheelchair Ramp, Restrooms, Drinking Water"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    QR Code Key
                  </label>
                  <input
                    type="text"
                    value={formData.qrCodeKey}
                    onChange={(e) => setFormData({ ...formData, qrCodeKey: e.target.value })}
                    placeholder="VJTI-MECH-DEPT"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              {/* Accessibility toggles */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 space-y-2">
                <p className="font-bold text-slate-700 dark:text-slate-300">Accessibility Settings</p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.accessibilityInformation.wheelchairAccessible}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accessibilityInformation: {
                            ...formData.accessibilityInformation,
                            wheelchairAccessible: e.target.checked,
                          },
                        })
                      }
                      className="rounded"
                    />
                    <span>Wheelchair Accessible</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.accessibilityInformation.hasElevator}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accessibilityInformation: {
                            ...formData.accessibilityInformation,
                            hasElevator: e.target.checked,
                          },
                        })
                      }
                      className="rounded"
                    />
                    <span>Elevator Available</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
                >
                  {editingLocation ? 'Save Changes' : 'Create Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
