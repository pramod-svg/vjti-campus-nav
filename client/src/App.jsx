import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
            <Navbar
              onOpenEmergency={() => setEmergencyModalOpen(true)}
              onOpenQR={() => setQrModalOpen(true)}
            />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <DashboardPage
                      onOpenEmergency={() => setEmergencyModalOpen(true)}
                      onOpenQR={() => setQrModalOpen(true)}
                      qrModalOpen={qrModalOpen}
                      setQrModalOpen={setQrModalOpen}
                      emergencyModalOpen={emergencyModalOpen}
                      setEmergencyModalOpen={setEmergencyModalOpen}
                    />
                  }
                />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
