import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
// BrowserRouter — envuelve toda la app y activa el sistema de rutas
// Routes — contenedor de todas las rutas
// Route — define cada ruta con su path y componente
// Navigate — redirige programáticamente a otra ruta
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Componente interno que tiene acceso a useNavigate
// useNavigate solo funciona DENTRO de BrowserRouter
// por eso separamos la lógica aquí
function AppContent() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificamos si hay token de nuestra API en localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      // Si hay token propio → usuario logueado con email/contraseña
      setSession({ type: "api", token, user: JSON.parse(user) });
      setLoading(false);
      return;
    }

    // Si no hay token propio → verificamos sesión de Supabase (Google)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession({ type: "supabase", ...session });
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setSession({ type: "supabase", ...session });
        navigate("/dashboard");
      }
      if (event === "SIGNED_OUT") {
        setSession(null);
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cargando — muestra spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Con sesión — muestra el workspace
  return (
    <Routes>
      {/* Ruta "/" — Landing page, pública para cualquier visitante */}
      <Route
        path="/"
        element={
          <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <Navbar session={session} />
            <Hero />
            <Logos />
            <Features />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CTA />
            <Footer />
          </div>
        }
      />

      {/* Ruta "/login" — pantalla de auth
            Si ya hay sesión activa, redirige directo al dashboard
            No tiene sentido mostrar el login si ya estás logueado */}
      <Route
        path="/login"
        element={
          session ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
              <Auth />
            </div>
          )
        }
      />

      {/* Ruta "/dashboard" — protegida
            ProtectedRoute verifica si hay sesión
            Si no hay sesión → redirige a /login
            Si hay sesión → muestra el Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute session={session}>
            <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
              <Navbar session={session} />
              <Dashboard session={session} />
            </div>
          </ProtectedRoute>
        }
      />

      {/* Cualquier ruta que no existe → redirige a la landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// App solo envuelve con BrowserRoute
// BrowserRoute debe estar en el nivel mas alto
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
