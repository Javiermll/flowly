import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function Dashboard({ session }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Obtenemos el token según el tipo de sesión
  // Si es sesión de nuestra API → token está en session.token
  // Si es sesión de Supabase (Google) → token está en session.access_token
  const token = session.type === "api" ? session.token : session.access_token;

  // Email del usuario para mostrarlo en el header
  const email =
    session.type === "api" ? session.user.email : session.user.email;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("Error cargando tareas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const task = await api.createTask(newTask, token);
      setTasks([task, ...tasks]);
      setNewTask("");
    } catch (error) {
      console.error("Error creando tarea:", error.message);
    }
  };

  const toggleTask = async (task) => {
    try {
      const updated = await api.updateTask(
        task._id,
        { completed: !task.completed },
        token,
      );
      setTasks(tasks.map((t) => (t._id === task._id ? updated : t)));
    } catch (error) {
      console.error("Error actualizando tarea:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id, token);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error eliminando tarea:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Mi workspace
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>
        </div>

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
            disabled={!newTask.trim()}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-200"
          >
            Agregar
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No tienes tareas aún. ¡Agrega una!
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="group flex items-center gap-4 bg-white dark:bg-gray-900 px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200"
              >
                <button
                  onClick={() => toggleTask(task)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                    ${
                      task.completed
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-gray-300 dark:border-gray-600 hover:border-emerald-500"
                    }`}
                >
                  {task.completed && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>

                <span
                  className={`flex-1 text-sm transition-all duration-200
                  ${
                    task.completed
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {task.title}
                </span>

                <button
                  onClick={() => deleteTask(task._id)}
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
