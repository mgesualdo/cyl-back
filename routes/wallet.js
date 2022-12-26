const passport = require("passport")
const { Router } = require("express")
const {
  getWallets,
  createWallet,
  editWallet,
  annulWallet,
} = require("../controllers/wallet")

const router = Router()

router.use(passport.authenticate("jwt"))

router.get("/", getWallets)
router.post("/", createWallet)
router.put("/:id", editWallet)
router.delete("/:id", annulWallet)

module.exports = router
