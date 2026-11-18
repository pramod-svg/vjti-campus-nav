import React, { useState } from 'react';
import {
  X,
  QrCode,
  Scan,
  MapPin,
  CheckCircle,
  Building,
  Sparkles,
} from 'lucide-react';
import { api } from '../../services/api';

const QUICK_QR_PRESETS = [
  { key: 'VJTI-MAIN-BLDG', label: 'VJTI Main Building (Heritage Porch)', desc: 'Admin, Director Office' },
  { key: 'VJTI-COMP-IT', label: 'Comp & IT Building (CCF Entrance)', desc: 'AI Labs, CCF, Classrooms' },
  { key: 'VJTI-LIBRARY', label: 'Central Library (Front Entrance)', desc: 'Reading Halls, E-Library' },
  { key: 'VJTI-CANTEEN', label: 'VJTI Central Canteen', desc: 'Dining Hall & Refreshments' },
  { key: 'VJTI-GATE-1', label: 'Main Campus Gate 1', desc: 'H.R. Mahajani Marg Entrance' },
  { key: 'VJTI-MEDICAL', label: 'Health Centre & Dispensary', desc: 'Emergency Medical First Aid' },
  { key: 'VJTI-GYMKHANA', label: 'Gymkhana Pavilion Ground', desc: 'Sports, Cricket & Track' },
  { key: 'VJTI-BOYS-HOSTEL', label: 'Boys Hostel Complex Block A', desc: 'Hostels & Mess' },
];

export default function QRScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputCode, setInputCode] = useState('');

  if (!isOpen) return null;

  const handleProcessCode = async (codeKey) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getLocationByQR(codeKey.trim());
      if (res.success && res.data) {
        onScanSuccess(res.data);
        onClose();
      } else {
        setError(res.message || 'No campus building matching this QR code.');
      }
    } catch (err) {
      setError('Failed to scan or connect to campus database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[700] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Scan Building QR Code
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instantly pinpoint your starting location at any campus building entrance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Simulated Scanner Viewport */}
          <div className="relative rounded-2xl bg-slate-950 text-white p-6 flex flex-col items-center justify-center border border-slate-800 overflow-hidden min-h-[170px]">
            <div className="absolute inset-4 border-2 border-dashed border-indigo-400/50 rounded-xl pointer-events-none flex items-center justify-center">
              <Scan className="w-12 h-12 text-indigo-400/40 animate-pulse" />
            </div>
            <p className="text-xs text-indigo-200 text-center font-medium z-10 max-w-xs">
              Point your camera at the QR sign located at any building doorway or choose a campus landmark below:
            </p>
          </div>

          {error && (
            <p className="text-xs text-rose-500 font-semibold text-center bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Quick Preset Building QR Codes */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quick Scan Campus Buildings (One-Click)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {QUICK_QR_PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  disabled={loading}
                  onClick={() => handleProcessCode(preset.key)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 text-left transition-all group flex items-start gap-2.5"
                >
                  <Building className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {preset.label}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      Code: {preset.key}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual QR Key Input */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Or enter QR code string (e.g. VJTI-MAIN-BLDG)..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 outline-none"
            />
            <button
              onClick={() => handleProcessCode(inputCode)}
              disabled={!inputCode || loading}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all disabled:opacity-50"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
