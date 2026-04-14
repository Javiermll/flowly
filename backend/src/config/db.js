import mongoose from "mongoose"; // Libreria que se conecta a Node.js con MongoDB
const connectDB = async () => {
  //connectDB es la funcion que llama index.js al arrancar.
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error conectando a MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;
