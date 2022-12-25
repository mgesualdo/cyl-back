const passport = require("passport")
const { Router } = require("express")
const { codeGenerator, localCallback } = require("../controllers/auth")

const router = Router()

router.get("/login/verify", passport.authenticate("jwt"), (req, res) => {
  res.status(200).json({ ok: true, user: req.user })
})

// Email
router.post(
  "/login",
  passport.authenticate("local", { session: true }),
  localCallback
)

router.get("/login/code/:email", codeGenerator)

module.exports = router
