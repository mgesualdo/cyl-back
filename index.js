require("dotenv").config()
const express = require("express")
const passport = require("passport")
const { localCallback } = require("./controllers/auth")
const connectToDB = require("./db/index")
const cors = require("cors")
const { areWeInProduction } = require("./utils/config")
const authRouter = require("./routes/auth")
require("./middlewares/passport")

const app = express()

connectToDB()

app.use(express.json())
app.use(
  cors({
    origin: [
      "https://cyl-front-three.vercel.app",
      "https://cyl-front-git-dev-mgesualdo.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
)

app.use(
  require("express-session")({
    secret: "my-increible-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: areWeInProduction ? "none" : "strict",
      secure: areWeInProduction,
    },
  })
)
app.use(passport.initialize())
// app.use(passport.session())

app.use("/auth", authRouter)

app.get("/health-check", (_, res) => {
  res.status(200).send("I'm alive, don't replace me! 🙏")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`App escuchando en puerto ${PORT}`)
})
