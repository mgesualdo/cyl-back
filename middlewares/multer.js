const multer = require("multer")
const storageType = multer.memoryStorage()

const parseFile = multer({ storage: storageType }).single("file")
const parseFiles = multer({ storage: storageType }).array("files", 3)

module.exports = {
  parseFile,
  parseFiles,
}
