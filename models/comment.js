const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema(
  {
    text: String,
    createdBy: {
      type: ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
)

module.exports = {
  Comment: mongoose.model("Comment", CommentSchema, "Comments"),
  CommentSchema,
}
