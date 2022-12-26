const passport = require("passport")
const { Router } = require("express")
const {
  getProducts,
  createProduct,
  editProduct,
  annulProduct,
} = require("../controllers/product")

const router = Router()

router.use(passport.authenticate("jwt"))

router.get("/", getProducts)
router.post("/", createProduct)
router.put("/:id", editProduct)
router.delete("/:id", annulProduct)

module.exports = router
