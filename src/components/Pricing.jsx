import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    description: "Para equipos pequeños que están empezando.",
    features: [
      "Hasta 5 usuarios",
      "3 proyectos activos",
      "1GB de almacenamiento",
      "Soporte por email",
    ],
    cta: "Empieza gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    monthly: 18,
    yearly: 12,
    description: "Para equipos que necesitan más potencia.",
    features: [
      "Usuarios ilimitados",
      "Proyectos ilimitados",
      "50GB de almacenamiento",
      "Soporte prioritario",
      "Reportes avanzados",
      "Integraciones API",
    ],
    cta: "Empieza prueba gratis",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: 49,
    yearly: 36,
    description: "Para organizaciones con necesidades avanzadas.",
    features: [
      "Todo lo de Pro",
      "SSO / SAML",
      "Auditoría de actividad",
      "SLA garantizado",
      "Onboarding dedicado",
    ],
    cta: "Contactar ventas",
    highlighted: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="bg-white dark:bg-gray-950 py-24 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Precios simples y transparentes
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">
            Sin sorpresas. Cancela cuando quieras.
          </p>

          {/* Toggle anual/mensual */}
          <div className="inline-flex items-center gap-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${!yearly ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
            >
              Mensual
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${yearly ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
            >
              Anual
              <span className="ml-2 text-xs text-emerald-600 font-semibold">
                −33%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300
                ${
                  plan.highlighted
                    ? "bg-emerald-600 border-emerald-600 scale-105 shadow-2xl"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800"
                }`}
            >
              {/* Badge popular */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3
                className={`text-lg font-bold mb-1 ${plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"}`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-6 ${plan.highlighted ? "text-emerald-100" : "text-gray-500 dark:text-gray-400"}`}
              >
                {plan.description}
              </p>

              {/* Precio */}
              <div className="mb-8">
                <span
                  className={`text-5xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"}`}
                >
                  ${yearly ? plan.yearly : plan.monthly}
                </span>
                <span
                  className={`text-sm ml-1 ${plan.highlighted ? "text-emerald-100" : "text-gray-400"}`}
                >
                  /mes
                </span>
              </div>

              {/* CTA */}

              <a
                href="#"
                className={`block text-center py-3 rounded-xl font-medium text-sm transition-colors duration-200 mb-8
                  ${
                    plan.highlighted
                      ? "bg-white text-emerald-700 hover:bg-emerald-50"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0
                      ${plan.highlighted ? "bg-emerald-500" : "bg-emerald-100 dark:bg-emerald-900"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${plan.highlighted ? "bg-white" : "bg-emerald-600"}`}
                      />
                    </span>
                    <span
                      className={`text-sm ${plan.highlighted ? "text-emerald-50" : "text-gray-600 dark:text-gray-300"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
