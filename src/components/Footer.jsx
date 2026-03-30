const links = {
  Producto: ["Features", "Precios", "Changelog", "Roadmap"],
  Empresa: ["Sobre nosotros", "Blog", "Clientes", "Prensa"],
  Recursos: ["Documentación", "API", "Comunidad", "Status"],
  Legal: ["Privacidad", "Términos", "Cookies", "Seguridad"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Grid Principal */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {/* Columna marca */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <span className="text-xl font-bold text-emerald-600 tracking-tight">
              Flowly
            </span>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              La plataforma de gestion de trabajo que tu equipo realmente va a
              usar.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3 mt-6">
              {["X", "Y", "Z"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700  flex items-center justify-center text-xs font-bold  text-gray-500 dark:text-gray-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {/* Columna de links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 tracking-wide">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href=""
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <span className="font-semibold">
            ª Flowly Inc. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
