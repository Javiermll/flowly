El flujo de peticion en backend:

Routes: Define las URLs de la API -- POST/ api/auth/login, GET /api/task
Middeleware: Funciones que se ejecutan entre la peticion y la respuesta --Verificacion JWT
Controller: Contiene la logica de cada ruta, que hacer cuando llega una peticion. En concreto para
flowly.

Route: POST /api/auth/register ↓
Controller register():

1. Lee email y password del body
2. Verifica que el email no exista
3. Encripta la contraseña con bcrypt
4. Crea el usuario en MongoDB
5. Genera el JWT
6. Responde con el token

Models: Define como se guardan los datos de MongoDB.

Request llega >>
Route: ¿Que URL es? >>
Middleware: ¿Tiene un JWT valido? >>
Controller: ejecuta la logica >>
Model: consulta MongoDB >>
Response: Devuelve el resultado.
