import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navigation,
  MapPin,
  Route,
  Search,
  Compass,
  Accessibility,
  Mic,
  QrCode,
  ShieldAlert,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  Users,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Decorative background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Campus & Technology Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide animate-in fade-in slide-in-from-top-2 duration-300">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>VEERMATA JIJABAI TECHNOLOGICAL INSTITUTE (VJTI)</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Smart Campus Navigation &{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                Assistance System
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Find classrooms, computing facilities, laboratories, departments, canteens, and hostels with millimeter campus path precision. Graph-based shortest routes, wheelchair accessibility, and voice-assisted guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Launch Interactive Campus Map</span>
              </Link>
              <Link
                to="/dashboard?focus=search"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-panel hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-blue-500" />
                <span>Search Buildings & Rooms</span>
              </Link>
            </div>

            {/* Micro stats banner */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-center border-t border-slate-200/60 dark:border-slate-800/60">
              <div>
                <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">20+</p>
                <p className="text-xs text-slate-500">Campus Locations</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">100%</p>
                <p className="text-xs text-slate-500">Walkable Path Graph</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">&lt; 1s</p>
                <p className="text-xs text-slate-500">Dijkstra Routing</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Voice</p>
                <p className="text-xs text-slate-500">Hands-Free Guide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Showcase Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-20">
        <div className="rounded-3xl glass-panel p-2 sm:p-4 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-900 flex items-center justify-center group">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"
              alt="VJTI Campus Map Preview"
              className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 mb-3 group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8 animate-spin-slow" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Live VJTI Campus Walkway Grid
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1 mb-4">
                Explore real geographical coordinates of VJTI Matunga: Quadrangle, Central Library, Computer/IT Block, Mechanical Labs, Canteen & Hostels.
              </p>
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <span>Open Live Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Comprehensive Feature Suite
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Engineered for Students, Faculty & Visitors
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Everything required to navigate an expansive 16-acre engineering institute without ever getting lost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Route className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Dijkstra Shortest Path Routing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Graph-based pathfinding algorithms calculate the fastest walking route through campus pathways and corridors, avoiding inaccessible buildings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Accessibility className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Accessible & Wheelchair Routes
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Inclusive navigation that filters out stairs and steep inclines, guiding mobility-impaired users exclusively along ramps and elevator access ways.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Voice Search & Speech Guidance
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Speak destination names using natural voice recognition. Turn-by-turn spoken guidance reads directions aloud for hands-free navigation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                QR Code Entrance Scanning
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Scan quick-response QR codes placed at building entrances to immediately calibrate your starting position on campus without GPS drift.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Multi-Floor Indoor Directory
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Search individual classrooms, labs, seminar halls, and faculty cabins across Ground, 1st, and 2nd floors for multi-story departments.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                1-Click Emergency SOS Routing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Instant emergency routing to the VJTI Health Dispensary or Disaster Evacuation Muster Point, complete with direct emergency phone links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HCI Principles Showcase Table */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Human-Computer Interaction (HCI) Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Built on Core Usability Heuristics
            </h2>
          </div>

          <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">HCI Principle</th>
                    <th className="py-3 px-4">CampusVigation Implementation</th>
                    <th className="py-3 px-4">User Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Visibility of system status</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Live GPS radar pulse, routing spinner, turn-by-turn steps, distance badge</td>
                    <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Immediate spatial feedback</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Match between system & real world</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Real VJTI landmark names, cardinal compass bearings, actual building photos</td>
                    <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Natural mental mapping</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">User control & freedom</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">1-click point swap, cancel navigation, alternative routes, clear route</td>
                    <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Easy error recovery</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Recognition rather than recall</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Instant search autocomplete, category chips, saved bookmarks list</td>
                    <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Reduced cognitive load</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Accessibility & inclusivity</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Wheelchair ramp filter, high color contrast, voice text-to-speech, dark mode</td>
                    <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Equitable access for all</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="font-extrabold text-slate-900 dark:text-white">CampusVigation</span>
            <span>• Veermata Jijabai Technological Institute (VJTI)</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hover:text-blue-600">Campus Map</Link>
            <Link to="/favorites" className="hover:text-blue-600">Saved Places</Link>
            <Link to="/admin" className="hover:text-blue-600">Admin</Link>
          </div>
          <p>© 2026 CampusVigation Team. Designed with HCI Excellence.</p>
        </div>
      </footer>
    </div>
  );
}
