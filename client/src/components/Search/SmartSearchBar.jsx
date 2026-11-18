import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Mic,
  MicOff,
  X,
  Filter,
  Check,
  Building,
  GraduationCap,
  Coffee,
  BookOpen,
  Home,
  Trophy,
  HeartPulse,
  Car,
  Accessibility,
  DoorOpen,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Places', icon: Building },
  { id: 'academic', label: 'Academic', icon: GraduationCap },
  { id: 'food', label: 'Cafeteria & Food', icon: Coffee },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'administration', label: 'Admin', icon: Building },
  { id: 'accommodation', label: 'Hostels', icon: Home },
  { id: 'recreation', label: 'Sports & Gym', icon: Trophy },
  { id: 'medical', label: 'Health & Medical', icon: HeartPulse },
  { id: 'parking', label: 'Parking', icon: Car },
];

export default function SmartSearchBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  wheelchairOnly,
  onToggleWheelchair,
  locations = [],
  onSelectLocation,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState('');
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);

  // Handle outside click to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions based on input
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const matched = [];

    locations.forEach((loc) => {
      let matchType = null;
      let matchedDetail = null;

      if (loc.name.toLowerCase().includes(q)) {
        matchType = 'Building';
      } else if (loc.department && loc.department.toLowerCase().includes(q)) {
        matchType = 'Department';
        matchedDetail = loc.department;
      } else if (loc.category && loc.category.toLowerCase().includes(q)) {
        matchType = 'Category';
      } else if (loc.facilities && loc.facilities.some((f) => f.toLowerCase().includes(q))) {
        const found = loc.facilities.find((f) => f.toLowerCase().includes(q));
        matchType = 'Facility';
        matchedDetail = found;
      } else if (loc.floors) {
        // Search inside rooms
        for (const floor of loc.floors) {
          if (floor.rooms) {
            const foundRoom = floor.rooms.find(
              (r) => r.roomNumber.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
            );
            if (foundRoom) {
              matchType = `Room ${foundRoom.roomNumber}`;
              matchedDetail = `${foundRoom.name} (${floor.floorName})`;
              break;
            }
          }
        }
      }

      if (matchType) {
        matched.push({
          location: loc,
          matchType,
          matchedDetail,
        });
      }
    });

    setSuggestions(matched.slice(0, 8));
  }, [searchQuery, locations]);

  // Voice Search setup using Web Speech API
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      setSpeechFeedback('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN'; // Optimized for Indian English
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechFeedback('Listening... Speak building or room name');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setSpeechFeedback(`Heard: "${transcript}"`);
        onSearchChange(transcript);
        setShowSuggestions(true);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setSpeechFeedback(`Speech recognition: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setSpeechFeedback(''), 2500);
      };

      recognition.start();
    } catch (err) {
      console.error('Voice search failed to initialize:', err);
      setIsListening(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full space-y-3">
      {/* Search Input Box */}
      <div className="relative">
        <div className="flex items-center glass-panel rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all overflow-hidden px-3.5 py-2">
          <Search className="w-5 h-5 text-slate-400 mr-2.5 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search building, department, room (e.g., CCF, Library, Canteen, MB-001)..."
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none"
          />

          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 mr-1.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Search Button */}
          <button
            onClick={handleVoiceSearch}
            title={isListening ? 'Stop listening' : 'Search by Voice'}
            className={`p-2 rounded-xl transition-all flex items-center justify-center ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30'
                : 'text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {/* Live Speech Feedback notification pill */}
        {speechFeedback && (
          <div className="absolute top-full left-0 mt-1 z-50 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></span>
            {speechFeedback}
          </div>
        )}

        {/* Real-time Search Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl glass-panel shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
            {suggestions.map(({ location: loc, matchType, matchedDetail }) => (
              <div
                key={loc._id}
                onClick={() => {
                  onSelectLocation(loc);
                  setShowSuggestions(false);
                }}
                className="p-3 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={loc.buildingImage}
                    alt={loc.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {loc.name}
                      </p>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                        {matchType}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {matchedDetail || loc.department}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 flex-shrink-0">
                  Select <span>→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Chips and Accessibility Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        {/* Category Horizontal Scrolling List */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                    : 'glass-panel text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Wheelchair Accessible Filter Toggle */}
        <button
          onClick={onToggleWheelchair}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
            wheelchairOnly
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-500/25'
              : 'border-slate-200 dark:border-slate-800 glass-panel text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600'
          }`}
          title="Filter and calculate routes with wheelchair ramps only"
        >
          <Accessibility className="w-3.5 h-3.5" />
          <span>Wheelchair Ramps Only</span>
          {wheelchairOnly && <Check className="w-3 h-3 stroke-[3]" />}
        </button>
      </div>
    </div>
  );
}
