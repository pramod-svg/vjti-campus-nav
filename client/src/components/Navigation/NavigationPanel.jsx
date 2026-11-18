import React, { useState } from 'react';
import {
  Navigation,
  ArrowRightLeft,
  Footprints,
  Clock,
  Volume2,
  VolumeX,
  X,
  CornerUpRight,
  CornerUpLeft,
  ArrowUp,
  MapPin,
  CheckCircle2,
  Accessibility,
  Route,
  Layers,
} from 'lucide-react';

export default function NavigationPanel({
  locations = [],
  startLocationId,
  endLocationId,
  onStartChange,
  onEndChange,
  onSwapPoints,
  onCalculateRoute,
  onClearRoute,
  routeResult,
  loading,
  wheelchairOnly,
  onToggleWheelchair,
  userLocation,
}) {
  const [activeRouteTab, setActiveRouteTab] = useState('primary'); // 'primary' or 'alternative'
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentRoute =
    activeRouteTab === 'primary'
      ? routeResult?.primaryRoute
      : routeResult?.alternativeRoute || routeResult?.primaryRoute;

  // Voice Navigation using Web Speech Synthesis API
  const handleVoiceGuidance = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!currentRoute?.instructions?.length) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    const fullScript = currentRoute.instructions
      .map((inst) => `Step ${inst.step}. ${inst.instruction}`)
      .join('. ');

    const utterance = new SpeechSynthesisUtterance(fullScript);
    utterance.rate = 0.95; // gentle, clear pace
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Helper icon for turn action
  const getActionIcon = (action) => {
    switch (action) {
      case 'turn-right':
        return <CornerUpRight className="w-4 h-4 text-blue-500" />;
      case 'turn-left':
        return <CornerUpLeft className="w-4 h-4 text-indigo-500" />;
      case 'arrive':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'straight':
      default:
        return <ArrowUp className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 shadow-glass space-y-4 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
            <Route className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Smart Route Navigation</h3>
        </div>

        {routeResult && (
          <button
            onClick={() => {
              if (isSpeaking) window.speechSynthesis.cancel();
              onClearRoute();
            }}
            className="text-xs font-semibold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Starting Point & Destination Selectors */}
      <div className="space-y-2.5 relative">
        {/* From (Start) */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Starting Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={startLocationId}
              onChange={(e) => onStartChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Starting Point...</option>
              {userLocation && (
                <option value="user_gps">📍 My Current GPS Location</option>
              )}
              {locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.name} ({loc.department})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap points button */}
        <div className="flex justify-center -my-1">
          <button
            type="button"
            onClick={onSwapPoints}
            title="Swap Starting Point and Destination"
            className="p-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-110 active:scale-95 text-slate-500 hover:text-blue-600 transition-all z-10"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 rotate-90" />
          </button>
        </div>

        {/* To (Destination) */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Destination
          </label>
          <div className="relative">
            <Navigation className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={endLocationId}
              onChange={(e) => onEndChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Campus Destination...</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.name} ({loc.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculate Route CTA */}
        <button
          onClick={onCalculateRoute}
          disabled={!startLocationId || !endLocationId || loading}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
            !startLocationId || !endLocationId || loading
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 active:scale-[0.99]'
          }`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              <span>Calculate Shortest Campus Path</span>
            </>
          )}
        </button>
      </div>

      {/* Active Route Results Details */}
      {routeResult && currentRoute && (
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
          {/* Primary vs Alternative Route Switcher Tabs */}
          {routeResult.alternativeRoute && (
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900">
              <button
                onClick={() => setActiveRouteTab('primary')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                  activeRouteTab === 'primary'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Optimal Route ({routeResult.primaryRoute.distance}m)
              </button>
              <button
                onClick={() => setActiveRouteTab('alternative')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                  activeRouteTab === 'alternative'
                    ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Alternative ({routeResult.alternativeRoute.distance}m)
              </button>
            </div>
          )}

          {/* Metric Badges */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Footprints className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Total Distance</p>
                <p className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {currentRoute.distance} meters
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Est. Walking Time</p>
                <p className="font-extrabold text-sm text-slate-900 dark:text-white">
                  ~{currentRoute.walkingTimeMinutes} min
                </p>
              </div>
            </div>
          </div>

          {/* Voice Navigation Button */}
          <button
            onClick={handleVoiceGuidance}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 border ${
              isSpeaking
                ? 'bg-red-500 text-white border-red-500 animate-pulse'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Voice Navigation</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-blue-500" />
                <span>Voice Guidance (Read Steps Aloud)</span>
              </>
            )}
          </button>

          {/* Turn-by-turn Instructions */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Turn-by-Turn Directions ({currentRoute.instructions.length} steps)
            </p>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {currentRoute.instructions.map((inst, index) => (
                <div
                  key={index}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <div className="p-1 rounded-md bg-white dark:bg-slate-800 shadow-xs flex-shrink-0 mt-0.5">
                    {getActionIcon(inst.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium leading-relaxed">{inst.instruction}</p>
                    {inst.distance > 0 && (
                      <span className="text-[10px] text-slate-400 mt-0.5 inline-block">
                        for {inst.distance} meters
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
