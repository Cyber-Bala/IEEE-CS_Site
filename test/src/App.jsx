// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

// pages
import HomePage from "./pages/HomePage"
import EventsPage from "./pages/EventsPage"
import NotFound from "./pages/NotFound.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Registration from "./pages/Registration.jsx"

// components
import SmokeEffect from "./components/SmokeEffect"

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#060612',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: '3px solid rgba(194, 148, 59, 0.2)',
          borderTopColor: 'var(--xypher-gold, #C2943B)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Route-based smoke density: Active ONLY on Events page per user request
  const getSmokeDensity = () => {
    if (location.pathname === '/events') return 70;
    return 0; // Disabled for all other pages
  };

  const smokeDensity = getSmokeDensity();

  return (
    <>
      {/* Global Atmosphere Layer - Conditional Visibility */}
      {smokeDensity > 0 && <SmokeEffect density={smokeDensity} />}

      <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          {/* Making events public based on original Xypher behaviour, or we can protect it. Keeping it public for now */}
          <Route path="/events" element={<EventsPage />} />
          
          {/* Auth routes */}
          <Route path="/login" element={
            !loading && isAuthenticated ? <Navigate to="/events" replace /> : <Login />
          } />
          <Route path="/signup" element={
            !loading && isAuthenticated ? <Navigate to="/events" replace /> : <Signup />
          } />
          <Route path="/register" element={
            <ProtectedRoute><Registration /></ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App