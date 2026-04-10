export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-950 pt-24 pb-32 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8 ring-1 ring-emerald-200 dark:ring-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Nuevo - Flowly 2.0 ya esta disponible
        </div>

        {/* Titulo */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
          Tu equipo, <br />
          <span className="text-emerald-600">en perfecta sintonia</span>
        </h1>

        {/* Subtitulo */}
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Flowly conecta tareas, personas y tiempo en un solo lugar. Sin
          fricciones, sin reuniones innecesarias, sin caos.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-300"
          >
            Empieza gratis
          </a>
          <a
            href="#"
            className="w-full sm:w-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium px-8 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
          >
            Ver demo →
          </a>
        </div>

        {/* App mockup */}
        <div className="mt-20 relative">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xl">
            {/* Barra de titulo falsa */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 h-6 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
            {/* Filas simuladas */}
            <div className="space-y-3">
              {[90, 75, 85, 60, 70].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-emerald-200 dark:bg-emerald-900 shrink-0" />
                  <div
                    className={"h-3 bg-gray-200 dark:bg-gray-700 rounded-full"}
                    style={{ width: "${w}%" }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Glow decorativo */}
          <div className="absolute -inset-4 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-3xl blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
}
