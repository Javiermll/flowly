import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="text-xl font-bold text-emerald-600 tracking-tight">
          Flowly
        </span>

        {/* Links - ocultos en movil */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-color"
            >
              Producto
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-color"
            >
              Precios
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-color"
            >
              Clientes
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-white transition-color"
            >
              Blog
            </a>
          </li>
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900  dark:hover:text-white transition-colors"
          >
            Iniciar sesion
          </a>
          <a
            href="#"
            className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Prueba Gratis
          </a>

          {/* Toggle dark mode */}
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
