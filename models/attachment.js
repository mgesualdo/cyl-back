const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const AttachmentSchema = new mongoose.Schema(
  {
    description: String,
    blobUrl: String,
    createdBy: {
      type: ObjectId,
      ref: 'Person',
    },
  },
  { timestamps: true }
)

module.exports = {
  Attachment: mongoose.model('Attachment', AttachmentSchema, 'Attachments'),
  AttachmentSchema,
}
