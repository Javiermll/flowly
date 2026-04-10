Paso 4 — Login con Google OAuth
Antes de escribir código, te explico cómo funciona OAuth para que tenga sentido lo que vamos a hacer.
Cuando el usuario hace click en "Entrar con Google" pasan estas cosas:

1. Tu app llama a Supabase → "quiero login con Google"
2. Supabase redirige al usuario a Google
3. Google pregunta → "¿autorizas a Flowly acceder a tu cuenta?"
4. Usuario acepta → Google devuelve un token a Supabase
5. Supabase crea la sesión y redirige de vuelta a tu app
6. Tu app detecta la sesión y muestra el dashboard
   Tu app nunca ve la contraseña de Google. Solo recibe confirmación de que Google verificó al usuario. Eso es OAuth.

La Fase 2 está 100% completa. Repasemos todo lo que construiste:

1. Auth completo — Google OAuth + email/contraseña, sesión persistente, cierre de sesión.
2. Base de datos — tabla tasks en PostgreSQL con Row Level Security. Cada usuario ve solo sus datos.
3. CRUD real — crear, leer, completar y eliminar tareas conectadas a Supabase.
4. React Router — tres rutas con URLs propias, ruta protegida con ProtectedRoute, y redirección automática según el estado de sesión.
