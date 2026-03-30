import { useState } from "react";

const faqs = [
  {
    q: "¿Puedo usar Flowly gratis para siempre?",
    a: "Sí. El plan Starter es gratuito sin límite de tiempo. Incluye hasta 5 usuarios y 3 proyectos activos, ideal para equipos pequeños que están empezando.",
  },
  {
    q: "¿Necesito tarjeta de crédito para probar el plan Pro?",
    a: "No. La prueba gratuita de 14 días no requiere tarjeta. Solo creas tu cuenta y tienes acceso completo al plan Pro durante ese período.",
  },
  {
    q: "¿Puedo migrar mis proyectos desde Jira o Notion?",
    a: "Sí, ofrecemos importación directa desde Jira, Notion, Trello y Asana. El proceso toma menos de 5 minutos y no pierdes ningún dato.",
  },
  {
    q: "¿Cómo funciona la facturación anual?",
    a: "Con el plan anual pagas por adelantado 12 meses y obtienes un 33% de descuento respecto al precio mensual. Puedes cancelar antes del próximo ciclo sin cargos adicionales.",
  },
  {
    q: "¿Flowly tiene aplicación móvil?",
    a: "Sí, disponible para iOS y Android. La app móvil está sincronizada en tiempo real con tu workspace y tiene todas las funciones principales.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-white dark:bg-gray-950 py-24 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            ¿Tienes dudas? Aqui estan las respuestas.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {faqs.map((faq, i) => (
            <div key={i}>
              {/* Preguntas */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
              >
                <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${
                    openIndex === i
                      ? "border-emerald-600 bg-emerald-600 rotate-45"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <span
                    className={`text-sm font-bold leading-none
                    ${openIndex === i ? "text-white" : "text-gray-400 dark:text-gray-800"}`}
                  >
                    +
                  </span>
                </span>
              </button>

              {/* Respuesta */}
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-48 pb-5" : "max-h-0"}`}
              >
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
