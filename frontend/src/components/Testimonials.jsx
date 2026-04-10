const testimonials = [
  {
    name: "Carolina Méndez",
    role: "Product Manager · Buk",
    avatar: "CM",
    text: "Flowly transformó cómo trabaja nuestro equipo. Lo que antes tomaba tres reuniones ahora se resuelve en un tablero.",
  },
  {
    name: "Andrés Fuentes",
    role: "CTO · NotCo",
    avatar: "AF",
    text: "La visibilidad que da Flowly es increíble. Por primera vez todos saben en qué está trabajando cada quien.",
  },
  {
    name: "Valentina Roa",
    role: "Engineering Lead · Fintual",
    avatar: "VR",
    text: "Migramos desde Jira y no volvemos atrás. La curva de aprendizaje fue casi cero para todo el equipo.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 px-6 transition-colors duration-300">
      <div>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Testimonios de nuestros clientes
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Mas de 3000 equipos ya trabajaron con Flowly.
          </p>
        </div>

        {/* Grid de testimonios */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 flex flex-col justify-between gap-6 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-lg transition-all duration-300"
            >
              {/* Comillas decorativas */}
              <span className="text-5xl leading-none text-emerald-200 dark:text-emerald-800 font-serif select-none">
                "
              </span>

              {/* Texto */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed -mt-4 flex-1">
                {t.text}
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {t.avatar}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
