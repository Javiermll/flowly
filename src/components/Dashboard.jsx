import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// Recibe "session" desde App.jsx — contiene info del usuario logueado
export default function Dashboard({ session }) {
  // Lista de tareas que vienen desde Supabase
  const [tasks, setTasks] = useState([]);

  // Texto que el usuario escribe en el input de nueva tarea
  const [newTask, setNewTask] = useState("");

  // Controla si mostrar el spinner mientras cargamos las tareas
  const [loading, setLoading] = useState(true);

  // Al montar el componente, cargamos las tareas inmediatamente
  useEffect(() => {
    fetchTasks();
  }, []);

  // ── LEER tareas desde Supabase ──────────────────────────────
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks") // tabla "tasks"
      .select("*") // trae todas las columnas
      .order("created_at", { ascending: false }); // las más nuevas primero

    if (error) console.error(error);
    else setTasks(data); // guarda las tareas en el estado
    setLoading(false); // oculta el spinner
  };

  // ── CREAR una tarea nueva ───────────────────────────────────
  const addTask = async (e) => {
    e.preventDefault(); // evita que el form recargue la página
    if (!newTask.trim()) return; // no hace nada si el input está vacío

    const { data, error } = await supabase
      .from("tasks")
      .insert({ title: newTask }) // crea la tarea con el título escrito
      // user_id se llena automático con auth.uid()
      .select() // pide que devuelva la tarea creada
      .single(); // espera un solo objeto, no un array

    if (error) console.error(error);
    else {
      // Agrega la nueva tarea al inicio de la lista local
      // sin necesidad de volver a consultar Supabase
      setTasks([data, ...tasks]);
      setNewTask(""); // limpia el input
    }
  };

  // ── ACTUALIZAR — marcar como completada o no ────────────────
  const toggleTask = async (task) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed }) // invierte el estado actual
      .eq("id", task.id); // solo para esta tarea específica

    if (error) console.error(error);
    else {
      // Actualiza la tarea en el estado local
      // .map() recorre todas las tareas y solo modifica la que coincide
      setTasks(
        tasks.map(
          (t) =>
            t.id === task.id
              ? { ...t, completed: !t.completed } // esta es la que cambió
              : t, // las demás quedan igual
        ),
      );
    }
  };

  // ── ELIMINAR una tarea ──────────────────────────────────────
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id); // elimina solo la tarea con este id

    if (error) console.error(error);
    else {
      // Filtra la tarea eliminada fuera del estado local
      // .filter() devuelve todas las tareas EXCEPTO la eliminada
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header — muestra el email del usuario logueado */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Mi workspace
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {session.user.email}
          </p>
        </div>

        {/* Formulario — input + botón para agregar tarea */}
        <form onSubmit={addTask} className="flex gap-3 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!newTask.trim()} // deshabilitado si el input está vacío
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-200"
          >
            Agregar
          </button>
        </form>

        {/* Contenido principal — 3 estados posibles */}
        {loading ? (
          // Estado 1 — cargando: muestra spinner
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          // Estado 2 — sin tareas: muestra mensaje vacío
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No tienes tareas aún. ¡Agrega una!
            </p>
          </div>
        ) : (
          // Estado 3 — hay tareas: las muestra en lista
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                // "group" permite que hijos reaccionen al hover de la fila completa
                className="group flex items-center gap-4 bg-white dark:bg-gray-900 px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200"
              >
                {/* Checkbox — click alterna entre completada y no completada */}
                <button
                  onClick={() => toggleTask(task)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                    ${
                      task.completed
                        ? "bg-emerald-600 border-emerald-600" // completada: verde
                        : "border-gray-300 dark:border-gray-600 hover:border-emerald-500" // pendiente: gris
                    }`}
                >
                  {/* Muestra el ✓ solo si está completada */}
                  {task.completed && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>

                {/* Título — tachado si está completada */}
                <span
                  className={`flex-1 text-sm transition-all duration-200
                  ${
                    task.completed
                      ? "line-through text-gray-400 dark:text-gray-500" // completada: tachado
                      : "text-gray-700 dark:text-gray-200" // pendiente: normal
                  }`}
                >
                  {task.title}
                </span>

                {/* Botón eliminar — invisible hasta hacer hover en la fila */}
                {/* "group-hover:opacity-100" aparece cuando el padre tiene hover */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 text-sm"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
