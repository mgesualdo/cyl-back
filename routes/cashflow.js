const passport = require("passport")
const { Router } = require("express")
const {
  getCashflows,
  createCashflow,
  annulCashflow,
  addAttachment,
} = require("../controllers/cashflow")
const { parseFile } = require("../middlewares/multer")

const router = Router()

router.use(passport.authenticate("jwt"))

router.get("/", getCashflows)
router.post("/", createCashflow)
router.delete("/:id", annulCashflow)

router.post("/attachments/:id", parseFile, addAttachment)

module.exports = router
