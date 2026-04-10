import { Navigate } from "react-router-dom";

// Este componente es un "guardián" de rutas
// Recibe dos cosas:
// - session: la sesión actual del usuario
// - children: el componente que quiere mostrar (Dashboard)

export default function ProtectedRoute({ session, children }) {
  // Si NO hay sesión activa...
  // Navigate es el componente de React Router para redirigir
  // replace={true} reemplaza la URL en el historial
  // así el botón "atrás" no vuelve al dashboard
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Si SÍ hay sesión, muestra el componente hijo (Dashboard)
  return children;
}
