const passport = require("passport")
const { Router } = require("express")
const {
  getEvents,
  createEvent,
  editEvent,
  annulEvent,
  addAttachment,
  addComment,
} = require("../controllers/event")
const { parseFile } = require("../middlewares/multer")

const router = Router()

router.use(passport.authenticate("jwt"))

router.get("/", getEvents)
router.post("/", createEvent)
router.put("/:id", editEvent)
router.delete("/:id", annulEvent)

router.post("/attachments/:id", parseFile, addAttachment)
router.post("/comments/:id", addComment)

module.exports = router
