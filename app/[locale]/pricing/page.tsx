export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto mt-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-50">
        Planes y Precios
      </h1>

      <p className="text-gray-600 dark:text-slate-300 mt-4">
        Empieza gratis y desbloquea todo el potencial de NoteMorph cuando lo necesites.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow border border-gray-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50">Gratis</h2>
          <p className="text-gray-600 dark:text-slate-300 mt-2">2 conversiones al día</p>
          <p className="text-gray-600 dark:text-slate-300">Funciones básicas</p>
          <button className="mt-6 bg-gray-800 dark:bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-slate-600">
            Empezar
          </button>
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg border border-blue-500">
          <h2 className="text-2xl font-bold">Pro</h2>
          <p className="mt-2">Ilimitado</p>
          <p className="opacity-90">Funciones inteligentes IA</p>
          <p className="opacity-90">PDF → Word avanzado</p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100">
            Suscribirse
          </button>
        </div>
      </div>
    </div>
  );
}
