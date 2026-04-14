import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ── REGISTRO ────────────────────────────────────────────────────
// Crea un usuario nuevo en la base de datos
export const register = async (req, res) => {
  try {
    // Extraemos email y password del body de la petición
    // El frontend mandará: { email: '...', password: '...' }
    const { email, password } = req.body;

    // Verificamos que el usuario no exista ya
    // findOne() busca un documento que coincida con el filtro
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Ya existe una cuenta con ese email.",
      });
    }

    // Encriptamos la contraseña con bcrypt
    // El número 10 es el "salt rounds" — cuántas veces procesa el hash
    // Más alto = más seguro pero más lento. 10 es el estándar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario en MongoDB con la contraseña encriptada
    // Nunca guardamos la contraseña original
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Generamos el JWT que el frontend usará en peticiones futuras
    // jwt.sign() recibe tres cosas:
    // 1. El payload — datos que viajan dentro del token
    // 2. El secret — clave para firmar el token
    // 3. Opciones — cuándo expira
    const token = jwt.sign(
      { userId: user._id }, // payload — solo el ID del usuario
      process.env.JWT_SECRET, // secret del .env
      { expiresIn: "7d" }, // expira en 7 días
    );

    // Respondemos con el token y datos básicos del usuario
    // Status 201 → "Created" — recurso creado exitosamente
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── LOGIN ───────────────────────────────────────────────────────
// Verifica credenciales y devuelve un token si son correctas
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscamos el usuario por email
    const user = await User.findOne({ email });

    // Si no existe el usuario → error genérico
    // No decimos "email incorrecto" o "contraseña incorrecta" por separado
    // eso daría pistas a un atacante sobre qué campo está mal
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas.",
      });
    }

    // Comparamos la contraseña con el hash guardado en MongoDB
    // bcrypt.compare() devuelve true o false
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Credenciales inválidas.",
      });
    }

    // Credenciales correctas → generamos el token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Status 200 → "OK" — petición exitosa
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
