import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  HeartPulse,
  ShieldAlert,
  Flame,
  PhoneCall,
  Navigation,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const EMERGENCY_SERVICES = [
  {
    id: 'medical',
    name: 'VJTI Campus Health Care & First Aid Unit',
    category: 'Medical Emergency',
    icon: HeartPulse,
    color: 'from-rose-500 to-red-600',
    borderColor: 'border-rose-200 dark:border-rose-900',
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    textColor: 'text-rose-600 dark:text-rose-400',
    phone: '+91 22 2419 8100',
    description: 'Equipped for medical first aid, emergency oxygen, physician consultation & ambulance dispatch.',
    locationName: 'VJTI Health Center & Medical Clinic',
  },
  {
    id: 'security',
    name: 'Main Gate Campus Security & Control Room',
    category: 'Security & Safety',
    icon: ShieldAlert,
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200 dark:border-amber-900',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    textColor: 'text-amber-600 dark:text-amber-400',
    phone: '+91 22 2419 8222',
    description: '24/7 security control post, emergency incident reporting and campus gate access control.',
    locationName: 'North Campus Main Entrance (Gate 1)',
  },
  {
    id: 'fire',
    name: 'Central Fire Evacuation Muster Point',
    category: 'Fire & Evacuation',
    icon: Flame,
    color: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-200 dark:border-orange-900',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    textColor: 'text-orange-600 dark:text-orange-400',
    phone: '101 (National Fire Service)',
    description: 'Designated safe open-air gathering zone in event of fire alarm or structural emergency.',
    locationName: 'VJTI Gymkhana & Cricket Pavilion Ground',
  },
];

export default function EmergencyModal({
  isOpen,
  onClose,
  onTriggerEmergencyRoute,
  locations = [],
}) {
  const [selectedService, setSelectedService] = useState('medical');

  if (!isOpen) return null;

  const handleRouteToEmergency = (service) => {
    // Look up location object from locations list by name match
    const targetLoc = locations.find((l) =>
      l.name.toLowerCase().includes(service.locationName.toLowerCase().split(' ')[0]) ||
      (service.id === 'medical' && l.category === 'medical') ||
      (service.id === 'security' && (l.category === 'administration' || l.name.includes('Gate 1'))) ||
      (service.id === 'fire' && (l.category === 'recreation' || l.name.includes('Gymkhana')))
    );

    onTriggerEmergencyRoute(service.id, targetLoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-red-200 dark:border-red-900/60 overflow-hidden">
        {/* Banner with pulsing emergency alert */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-white/20 text-white animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Emergency SOS Response
            </span>
          </div>
          <h2 className="text-2xl font-black">Campus Emergency Navigation</h2>
          <p className="text-xs text-red-100 mt-1">
            Immediate one-click shortest routing to medical clinic, security posts, and evacuation muster points.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EMERGENCY_SERVICES.map((srv) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedService(srv.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? `border-red-500 bg-red-50/70 dark:bg-red-950/50 shadow-md ring-2 ring-red-500/20`
                      : `border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700`
                  }`}
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${srv.color} text-white flex items-center justify-center mb-3 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {srv.category}
                    </span>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mt-1 leading-snug">
                      {srv.name}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {srv.phone}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed service card for selected item */}
          {(() => {
            const active = EMERGENCY_SERVICES.find((s) => s.id === selectedService);
            if (!active) return null;
            const ActiveIcon = active.icon;

            return (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <ActiveIcon className={`w-5 h-5 ${active.textColor}`} />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {active.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Target Location: <span className="font-semibold text-slate-700 dark:text-slate-200">{active.locationName}</span>
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${active.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Desk</span>
                  </a>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {active.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Estimated Walking Time: ~2-3 mins from anywhere on campus
                  </span>

                  <button
                    onClick={() => handleRouteToEmergency(active)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs shadow-lg shadow-red-500/30 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Navigate Shortest Emergency Route</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
