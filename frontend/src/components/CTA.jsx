import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-emerald-600 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Empieza hoy, gratis
        </h2>
        <p className="text-emerald-100 text-lg mb-12 max-w-xl mx-auto">
          Sin tarjeta de credito. Sin compromisos. Cancela cuando quieras.
        </p>

        {submitted ? (
          /* Estado de Confirmacion */
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 ">
            <div className=" w-17 h-17 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-white font-semibold text-lg">
              ¡Listo! Revisa tu email
            </p>
            <p className="text-emerald-100 text-sm mt-2">
              Enviamos el enlace de acceso a{" "}
              <span className="font-medium text-white">{email}</span>
            </p>
          </div>
        ) : (
          /* Formulario */
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-dm mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-emerald-200 focus:ring-2 focus:ring-white focus:bg-white/20 transition-all duration-300 "
            />
            <button
              type="submit"
              disabled={!email}
              className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Comenzar gratis
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
