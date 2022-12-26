const passport = require("passport")
const { Router } = require("express")
const {
  getPersons,
  createPerson,
  editPerson,
  annulPerson,
} = require("../controllers/person")

const router = Router()

router.use(passport.authenticate("jwt"))

router.get("/", getPersons)
router.post("/", createPerson)
router.put("/:id", editPerson)
router.delete("/:id", annulPerson)

module.exports = router
