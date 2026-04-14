import { Router } from "express";
import { register, login } from "../controllers/authController.js";

// Router es un mini-servidor de Express
// agrupa rutas relacionadas en un solo lugar
const router = Router();

// POST /api/auth/register → llama a register del controller
// No tiene middleware — cualquiera puede registrarse
router.post("/register", register);

// POST /api/auth/login → llama a login del controller
// No tiene middleware — cualquiera puede hacer login
router.post("/login", login);

export default router;
