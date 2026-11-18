import React, { useState } from 'react';
import {
  X,
  QrCode,
  Camera,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { api } from '../../services/api';

const DEMO_CAMPUS_QRS = [
  {
    key: 'VJTI-MAIN-BLDG',
    name: 'Main Building Quadrangle Entrance',
    buildingName: 'VJTI Main Building & Administrative Complex',
    floor: 'Ground Floor Porch',
  },
  {
    key: 'VJTI-COMP-IT',
    name: 'Computer Engineering & CCF Lobby',
    buildingName: 'Department of Computer Engineering & IT',
    floor: 'CCF Ground Floor',
  },
  {
    key: 'VJTI-LIBRARY',
    name: 'Central Library Turnstile Gate',
    buildingName: 'Central Library & Knowledge Resource Centre',
    floor: 'Main Entrance Hall',
  },
  {
    key: 'VJTI-CANTEEN',
    name: 'Campus Canteen Entrance',
    buildingName: 'VJTI Central Canteen & Cafeteria',
    floor: 'Main Dining Patio',
  },
  {
    key: 'VJTI-MECH-DEPT',
    name: 'Mechanical Engineering Workshop',
    buildingName: 'Department of Mechanical Engineering & Workshops',
    floor: 'Central Workshop Gate',
  },
  {
    key: 'VJTI-MEDICAL',
    name: 'Health Center & Dispensary',
    buildingName: 'VJTI Health Dispensary & Medical Centre',
    floor: 'First Aid Clinic',
  },
];

export default function QRCodeModal({
  isOpen,
  onClose,
  onLocationIdentified,
}) {
  const [activeTab, setActiveTab] = useState('simulate'); // 'simulate' or 'camera'
  const [scannedLocation, setScannedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSelectQR = async (qrKey) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getLocationByQR(qrKey);
      if (res.success && res.data) {
        setScannedLocation(res.data);
      } else {
        setError('Location not found for this QR code.');
      }
    } catch (err) {
      setError(err.message || 'Failed to resolve QR code location.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmLocation = () => {
    if (scannedLocation) {
      onLocationIdentified(scannedLocation);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider mb-2">
            <QrCode className="w-3 h-3" />
            <span>Instant Origin Detection</span>
          </div>
          <h2 className="text-2xl font-black">Scan Building QR Code</h2>
          <p className="text-xs text-blue-100 mt-1">
            Physical QR plaques are placed at campus entrances. Scanning sets your immediate navigation starting point.
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Scanned result confirmation if any */}
          {scannedLocation && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm">
                    Location Verified: {scannedLocation.name}
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    {scannedLocation.department} • {scannedLocation.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setScannedLocation(null)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
                >
                  Scan Another
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLocation}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Set as Current Origin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Quick Simulated Building QR Plaques */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Simulate Physical Building QR Plaques
              </h4>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                Click to scan plaque
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {DEMO_CAMPUS_QRS.map((qr) => (
                <button
                  key={qr.key}
                  type="button"
                  onClick={() => handleSelectQR(qr.key)}
                  disabled={loading}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 hover:border-blue-300 dark:hover:border-blue-800 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {qr.name}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {qr.buildingName} ({qr.floor})
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {qr.key}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
