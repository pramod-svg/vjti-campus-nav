import React, { useState } from 'react';
import {
  AlertTriangle,
  X,
  PhoneCall,
  HeartPulse,
  Flame,
  ShieldAlert,
  Navigation,
  ArrowRight,
} from 'lucide-react';
import { api } from '../../services/api';

export default function EmergencyModal({
  isOpen,
  onClose,
  currentCoords,
  onEmergencyRouteFound,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRouteToEmergency = async (type) => {
    setLoading(true);
    setError('');

    // If current GPS is not available, fallback to campus center
    const coords = currentCoords || { lat: 19.0223, lng: 72.8562 };

    try {
      const res = await api.getEmergencyRoute(coords, type);
      if (res.success && res.route) {
        onEmergencyRouteFound({
          route: res.route,
          targetLocation: res.targetLocation,
          alertMessage: res.alertMessage,
        });
        onClose();
      } else {
        setError(res.message || 'Could not find path to emergency location.');
      }
    } catch (err) {
      setError('Emergency service unavailable. Please call the emergency numbers below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[700] bg-red-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-red-500 animate-in zoom-in-95 duration-200">
        {/* Header Alert Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide">
                CAMPUS EMERGENCY ASSISTANCE
              </h3>
              <p className="text-xs text-red-100">
                Immediate navigation to nearest healthcare or safety muster point
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl font-bold">
              {error}
            </p>
          )}

          {/* Quick Route Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => handleRouteToEmergency('medical')}
              disabled={loading}
              className="w-full p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/60 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/20">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-red-900 dark:text-red-200">
                    Route to VJTI Health Dispensary
                  </h4>
                  <p className="text-xs text-red-700/80 dark:text-red-300">
                    Resident Doctor, First Aid & Medical triage
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-red-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleRouteToEmergency('muster')}
              disabled={loading}
              className="w-full p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-amber-900 dark:text-amber-200">
                    Route to Emergency Muster Point
                  </h4>
                  <p className="text-xs text-amber-700/80 dark:text-amber-300">
                    Open field assembly area for fire / earthquake evacuation
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Urgent Emergency Phone Lines */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Direct Emergency Contacts
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+912224198112"
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold hover:text-red-600"
              >
                <PhoneCall className="w-3.5 h-3.5 text-red-500" />
                <span>Dispensary: +91 22 2419 8112</span>
              </a>
              <a
                href="tel:+912224198111"
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold hover:text-red-600"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
                <span>Campus Security: 8111</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
