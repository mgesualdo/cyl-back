require("dotenv").config()
const express = require("express")
const passport = require("passport")
const connectToDB = require("./db/index")
const cors = require("cors")
const { areWeInProduction } = require("./utils/config")

// Importación de ROUTERS
const authRouter = require("./routes/auth")
const cashflowRouter = require("./routes/cashflow")
const eventRouter = require("./routes/event")
const personRouter = require("./routes/person")
const productRouter = require("./routes/product")
const walletRouter = require("./routes/wallet")

require("./middlewares/passport")

const app = express()

// Conexión con la base de datos de Mongo
connectToDB()

app.use(express.json())

//Configuración CORS
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

// Configuración de nuestras RUTAS con los ROUTERS que importamos
app.use("/auth", authRouter)
app.use("/cashflows", cashflowRouter)
app.use("/events", eventRouter)
app.use("/persons", personRouter)
app.use("/products", productRouter)
app.use("/wallets", walletRouter)

app.get("/health-check", (_, res) => {
  res.status(200).send("I'm alive, don't replace me! 🙏")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`App escuchando en puerto ${PORT}`)
})
