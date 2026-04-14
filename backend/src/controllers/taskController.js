import Task from "../models/Task.js";

// ── READ — obtener todas las tareas del usuario ─────────────────
export const getTasks = async (req, res) => {
  try {
    // req.user viene del middleware — contiene el payload del JWT
    // específicamente el userId que guardamos al hacer login
    const { userId } = req.user;

    // Buscamos solo las tareas que pertenecen a este usuario
    // { user: userId } es el filtro — como un WHERE en SQL
    // sort({ createdAt: -1 }) → las más nuevas primero
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── CREATE — crear una tarea nueva ─────────────────────────────
export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;

    // El título viene del body que manda React
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "El título es obligatorio.",
      });
    }

    // Creamos la tarea vinculada al usuario actual
    // user: userId → referencia al documento User
    const task = await Task.create({
      title,
      user: userId,
    });

    // Status 201 → recurso creado exitosamente
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── UPDATE — marcar como completada o cambiar título ───────────
export const updateTask = async (req, res) => {
  try {
    const { userId } = req.user;

    // El id de la tarea viene en la URL → /api/tasks/:id
    const { id } = req.params;

    // Los datos a actualizar vienen en el body
    const { title, completed } = req.body;

    // Buscamos la tarea que:
    // 1. Tenga ese _id
    // 2. Pertenezca a este usuario
    // Así un usuario no puede modificar tareas de otro
    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId }, // filtro
      { title, completed }, // datos a actualizar
      { new: true }, // devuelve el documento actualizado
    );

    // Si no encontró la tarea → no existe o no le pertenece
    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada.",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── DELETE — eliminar una tarea ─────────────────────────────────
export const deleteTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    // Eliminamos solo si la tarea existe Y pertenece al usuario
    // Misma lógica de seguridad que en updateTask
    const task = await Task.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada.",
      });
    }

    // Status 200 con mensaje de confirmación
    res.status(200).json({
      message: "Tarea eliminada correctamente.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
