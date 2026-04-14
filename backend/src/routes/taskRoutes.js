import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// authMiddleware se aplica a TODAS las rutas de este archivo
// con router.use() — es más limpio que agregarlo ruta por ruta
// cualquier petición a /api/tasks/* primero pasa por authMiddleware
router.use(authMiddleware);

// GET    /api/tasks      → obtener todas las tareas
// POST   /api/tasks      → crear una tarea nueva
// PUT    /api/tasks/:id  → actualizar una tarea
// DELETE /api/tasks/:id  → eliminar una tarea
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
