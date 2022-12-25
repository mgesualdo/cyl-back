const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const Person = require("../models/person")
const { jwtSecretKey } = require("../utils/config")

const cookieExtractor = (req) => {
  console.log("COOKIES", { cookies: req.headers.cookie })
  let token = null
  if (req && req.headers.cookie) {
    token = req.headers.cookie.split("jwt=")[1]
    token = token?.includes(";") ? token.split(";")[0] : token
  }
  console.log({ token })

  return token
}

// Estrategia de JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: jwtSecretKey,
    },
    async (jwt_payload, done) => {
      // called everytime a protected URL is being served
      console.log({ sub: jwt_payload.sub })
      const person = await Person.findOne({
        _id: jwt_payload.sub,
      })

      console.log({ person })

      if (person) return done(null, person)

      return done(null, false)
    }
  )
)

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "code",
    },
    function (email, code, done) {
      console.log({ email })
      Person.findOne({ email, loginCode: code }, function (err, person) {
        if (err) return done(err)

        if (!person)
          return done(null, false, { message: "Email o código incorrectos." })

        return done(null, person)
      })
    }
  )
)

passport.serializeUser(function (person, done) {
  console.log("SERIALIZE", person)
  done(null, person._id)
})

passport.deserializeUser(function (id, done) {
  // Se ejecuta con cada request que llega, para ver si tiene una SESSION
  // extrae el id de la persona y la pasa
  console.log("DE-SERIALIZE", id)
  Person.findById(id, function (err, person) {
    done(err, person)
  })
})
