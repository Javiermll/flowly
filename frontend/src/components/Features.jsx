import { useState } from "react";

const tabs = [
  {
    id: "tareas",
    label: "Tareas",
    title: "Todo bajo control",
    description:
      "Crea, asigna y prioriza tareas en segundos. Tu equipo siempre sabe qué hacer y cuándo.",
    items: [
      "Asignación por arrastrar",
      "Fechas límite inteligentes",
      "Sub-tareas anidadas",
      "Etiquetas y filtros",
    ],
  },
  {
    id: "tiempo",
    label: "Tiempo",
    title: "Planifica sin fricción",
    description:
      "Visualiza el trabajo de tu equipo en el tiempo. Detecta cuellos de botella antes de que ocurran.",
    items: [
      "Vista de cronograma",
      "Carga de trabajo por persona",
      "Dependencias visuales",
      "Alertas automáticas",
    ],
  },
  {
    id: "reportes",
    label: "Reportes",
    title: "Datos que importan",
    description:
      "Métricas claras sobre el progreso real. Sin dashboards complicados, solo lo que necesitas ver.",
    items: [
      "Velocidad del equipo",
      "Tasa de completitud",
      "Tiempo por proyecto",
      "Exportar a CSV",
    ],
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Todo lo que necesita tu equipo
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Sin apps extra, sin integraciones complicadas. Flowly lo tiene todo.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 bg-white dark:bg-gray-800 p-1.5 rounded-xl w-fit mx-auto border border-gray-200 dark:border-gray-700">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  activeTab === i
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenido — grid de 2 columnas */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto — columna izquierda */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {tab.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              {tab.description}
            </p>
            <ul className="space-y-3">
              {tab.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup — columna derecha */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-3">
            {tab.items.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 group-hover:border-emerald-500 transition-colors shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
