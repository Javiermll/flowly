// URL base de tu API — viene del .env
// En desarrollo: http://localhost:3001
// En producción: tu URL de Render
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// ── Función helper central ──────────────────────────────────────
// Todas las llamadas a la API pasan por aquí
// Recibe:
// - endpoint: la ruta específica ('/api/tasks', '/api/auth/login')
// - options: método, body, etc.
// - token: el JWT del usuario logueado (opcional)
const apiRequest = async (endpoint, options = {}, token = null) => {
  // Construimos los headers de la petición
  const headers = {
    "Content-Type": "application/json", // siempre mandamos JSON
  };

  // Si hay token, lo agregamos en el header Authorization
  // El middleware de auth.js lo leerá desde aquí
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // fetch() hace la petición HTTP
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options, // spread de opciones (method, body, etc.)
    headers, // nuestros headers con el JWT
  });

  // Si la respuesta no es exitosa (4xx, 5xx)
  // extraemos el mensaje de error que mandó el servidor
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error en la petición");
  }

  // Si todo está bien, devolvemos los datos en JSON
  return response.json();
};

// ── Funciones específicas de la API ────────────────────────────
// Estas son las que usará Dashboard.jsx
// Cada una llama a apiRequest con los parámetros correctos

export const api = {
  // AUTH
  register: (email, password) =>
    apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // TAREAS
  getTasks: (token) => apiRequest("/api/tasks", {}, token),

  createTask: (title, token) =>
    apiRequest(
      "/api/tasks",
      {
        method: "POST",
        body: JSON.stringify({ title }),
      },
      token,
    ),

  updateTask: (id, data, token) =>
    apiRequest(
      `/api/tasks/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      token,
    ),

  deleteTask: (id, token) =>
    apiRequest(
      `/api/tasks/${id}`,
      {
        method: "DELETE",
      },
      token,
    ),
};
