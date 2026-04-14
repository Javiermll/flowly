import jwt from "jsonwebtoken";

//Middleware que se ejecuta antes del controller. En cada ruta que requiere
//autenticacion recibe tres parametros:
//req: La peticion que llego
//res: La respuesta que se enviara
//next: funcion que llama al siguiente paso
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; //Leemos el header de la peticion

  //Si no hay header authorization, token no existe.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Acceso denegado. Token no proporcionado",
    });
  }

  //Extraemos solo el token quitando el Bearer del inicio
  const token = authHeader.split(" ")[1];
  try {
    // jwt.verify() hace dos cosas:
    // 1. Verifica que el token fue firmado con nuestro JWT_SECRET
    // 2. Decodifica el payload y lo devuelve
    // Si el token fue manipulado o expiró → lanza un error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Guardamos el payload decodificado en req.user
    // Así el controller puede saber quién es el usuario
    // sin tener que verificar el token de nuevo
    req.user = decoded;
    // Todo está bien → llamamos a next() para pasar al controller
    next();
  } catch (error) {
    // El token es inválido o expiró
    return res.status(401).json({
      message: "Acceso denegado. Token invalido",
    });
  }
};

export default authMiddleware;
