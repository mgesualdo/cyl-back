const passport = require('passport')
const { Router } = require('express')
const {
  getPersons,
  createPerson,
  editPerson,
  annulPerson,
  getBusiness,
} = require('../controllers/person')
const { parseFile } = require('../middlewares/multer')

const router = Router()

router.use(passport.authenticate('jwt'))

router.get('/', getPersons)
router.post('/', parseFile, createPerson)
router.put('/:id', parseFile, editPerson)
router.delete('/:id', annulPerson)
router.get('/business', getBusiness)

module.exports = router
