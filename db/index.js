const mongoose = require("mongoose")

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Conexión exitosa con MONGO DB")
  } catch (error) {
    console.log("Error al conectarse con MONGO DB", { error })
  }
}

module.exports = connectToDB
