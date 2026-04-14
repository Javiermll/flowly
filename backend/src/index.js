//--------IMPORTACIONES ----------
import express from "express"; //Framework que crea el servidor HTTP
import cors from "cors"; // Permite que React (localhost: 5173) hable con el servidor (localhost:3001)
import dotenv from "dotenv"; // Lee las variables del archivo .env y las pone en process.env
import connectDB from "./config/db.js"; // Conexión a la base de datos
// Importa las rutas
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

//---Configuracion inicial -----
dotenv.config(); //Lee .env y carga las variables de entorno. Siempre antes de cualquier process.env.VARIABLE
const app = express(); //Crea la apliacion Express
const PORT = process.env.PORT || 3001; // Puerto donde escuchar el servidor.

//---Middlewares globales ---------------
//Funcion que se ejecuta en cada peticion antes de que llegue a la ruta especifica.

app.use(
  cors({
    //cors() permite peticiones desde el frontend
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    creadentials: true, //permite enviar cookies y heades de auth.
  }),
);

app.use(express.json()); //Permita que el servidor entienda JSON en el body. Sin esto, req.body seria undefined en POST y PUT

// Conecta las rutas al servidor
// Todas las rutas de auth empiezan con /api/auth
// Todas las rutas de tareas empiezan con /api/tasks
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

//---Ruta de prueba ------------------------------
//Ruta para verificar que el servidor funciona cuando se entre en localhost: 3001/api/health
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor Flowly funcionando correctamente",
  });
});

//--Arranque del servidor -------------------------
// Conecta MongoDB primero, luego arranca el servidor
// Si la BD falla, el servidor no arranca
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error al arrancar el servidor:", error.message);
    process.exit(1); // 1 = salida con error
  }
};

// Llama a la funcion de arranque
start();
