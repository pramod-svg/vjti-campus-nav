import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navigation,
  MapPin,
  Heart,
  Shield,
  Sun,
  Moon,
  User,
  LogOut,
  AlertTriangle,
  Menu,
  X,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenEmergency, onOpenQR, onOpenAuth }) {
  const { user, logout, loginAsStudent, loginAsFaculty, loginAsAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Institute badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  CampusVigation
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  VJTI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Smart Campus Navigation & Guide
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/dashboard"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/dashboard')
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Campus Map
            </Link>

            <Link
              to="/favorites"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/favorites')
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Saved Places
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/admin')
                    ? 'bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-500" />
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Right Action Tools: QR, SOS, Dark Mode, Role Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* QR Scan Button */}
            <button
              onClick={onOpenQR}
              title="Scan Building QR Code"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <QrCode className="w-4 h-4 text-indigo-500" />
              <span className="hidden lg:inline">Scan QR</span>
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={onOpenEmergency}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/20 flex items-center gap-1.5 transition-all animate-pulse"
              title="Quick Emergency Navigation"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Role Demo Switcher & Profile Dropdown */}
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      {user.name.charAt(0)}
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="font-medium text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[100px]">
                        {user.name.split(' ')[0]}
                      </p>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        {user.role}
                      </span>
                    </div>
                  </button>

                  {roleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 text-xs">
                      <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-slate-500 text-[11px] truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold text-[10px]">
                          Role: {user.role.toUpperCase()}
                        </span>
                      </div>

                      {/* Demo Role Switcher */}
                      <div className="px-3 py-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Switch Demo Role
                      </div>
                      <button
                        onClick={async () => {
                          await loginAsStudent();
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between ${
                          user.role === 'student' ? 'text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>Student (Aarav)</span>
                        {user.role === 'student' && <span className="text-xs">✓</span>}
                      </button>
                      <button
                        onClick={async () => {
                          await loginAsFaculty();
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between ${
                          user.role === 'faculty' ? 'text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>Faculty (Dr. Radhika)</span>
                        {user.role === 'faculty' && <span className="text-xs">✓</span>}
                      </button>
                      <button
                        onClick={async () => {
                          await loginAsAdmin();
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between ${
                          user.role === 'admin' ? 'text-amber-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>Admin (Prof. Deshmukh)</span>
                        {user.role === 'admin' && <span className="text-xs">✓</span>}
                      </button>

                      <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5 font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={loginAsStudent}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Quick Student Login
                  </button>
                  <button
                    onClick={onOpenAuth}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    Login / Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <MapPin className="w-4 h-4 text-blue-500" />
            Campus Map
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            Saved Places
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
            >
              <Shield className="w-4 h-4 text-amber-500" />
              Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
