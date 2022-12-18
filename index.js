const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.status(200).send("Nuestra app ya está en producción")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`App escuchando en puerto ${PORT}`)
})
