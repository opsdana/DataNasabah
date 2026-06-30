import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'

/* === Template Routing ===
   - /login        : Public (halaman login)
   - /dashboard    : Protected (semua role bisa akses)
   - /             : Auto-redirect ke /dashboard
   - /*            : Catch-all redirect ke /dashboard

   Untuk menambah halaman baru:
   1. Import component di atas
   2. Tambah <Route> di dalam <Routes>
   3. Bungkus dengan <ProtectedRoute> jika perlu login
   4. Tambah menu di Sidebar.jsx
*/

export default function App() {
  return (
    <BrowserRouter> {/* Ganti dengan basename="/repo-name" jika deploy ke GitHub Pages */}
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected — Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* === TAMBAH ROUTE BARU DI SINI === */}

          {/* Redirect routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
