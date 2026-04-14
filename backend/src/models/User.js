import mongoose from "mongoose"; //mongoosee da las herramientas para definir modelos
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, //createdAt y updatedAt automaticos en MongoDB.
  },
);

//Creamos el modelo a partir del Schema.
//User: Nombre del modelo
//mongoose convierte users como nombre de la coleccion en MongoDB.
const User = mongoose.model("User", UserSchema);

export default User;
