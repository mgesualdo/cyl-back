require("dotenv").config()
const express = require("express")
const passport = require("passport")
const { localCallback } = require("./controllers/auth")
const connectToDB = require("./db/index")
const cors = require("cors")
require("./middlewares/passport")

const app = express()

connectToDB()

app.use(express.json())
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))

app.use(
  require("express-session")({
    secret: "my-increible-secret",
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get("/", passport.authenticate("jwt"), (req, res) => {
  console.log("LLEGA ACA")
  res.status(200).send("Nuestra app ya está en producción")
})

app.post(
  "/login",
  passport.authenticate("local", { session: true }),
  localCallback
)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`App escuchando en puerto ${PORT}`)
})
