const passport = require('passport')
const { Router } = require('express')
const {
  getProducts,
  createProduct,
  editProduct,
  annulProduct,
} = require('../controllers/product')
const { parseFile } = require('../middlewares/multer')

const router = Router()

router.use(passport.authenticate('jwt'))

router.get('/', getProducts)
router.post('/', parseFile, createProduct)
router.put('/:id', parseFile, editProduct)
router.delete('/:id', annulProduct)

module.exports = router
