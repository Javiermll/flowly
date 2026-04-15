import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function Navbar({ session }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSignOut = async () => {
    // Limpiamos el localStorage si era sesion de nuestra API
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    //Cerramos sesion de supabase su era google
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-xl font-bold text-emerald-600 tracking-tight">
          Flowly
        </span>

        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Producto
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Precios
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Clientes
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Blog
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {session ? (
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
          <Link
            to="/login"
            className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Prueba gratis
          </Link>
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
}
