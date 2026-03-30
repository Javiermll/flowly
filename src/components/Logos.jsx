const companies = ["Notion", "Linear", "Vercel", "Stripe", "Figma", "Loom"];

export default function Logos() {
  return (
    <section className="bg-white dark:bg-gray-950 py-16 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10">
          Usado por equipos en las mejores empresas
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {companies.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200 tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
