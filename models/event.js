const mongoose = require("mongoose")
const { AttachmentSchema } = require("./attachment")
const { CommentSchema } = require("./comment")
const { ObjectId } = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
  {
    type: String, // Compra, venta, pedido
    totalAmount: Number,
    totalPayed: Number,
    status: String,
    products: [
      {
        _id: { type: ObjectId, ref: "Product" },
        name: String,
        branch: String,
        model: String,
        unitAmount: Number,
        quantity: Number,
      },
    ],
    client: {
      type: ObjectId,
      ref: "Person",
    },
    supplier: {
      type: ObjectId,
      ref: "Person",
    },
    attachments: [AttachmentSchema],
    comments: [CommentSchema],
    annulled: { type: Boolean, default: false },
    annulledBy: {
      type: ObjectId,
      ref: "Person",
    },
    createdBy: {
      type: ObjectId,
      ref: "Person",
    },
    fullCreatedDate: {
      unixDate: Number,
      day: Number,
      weekOfYear: Number,
      month: Number,
      year: Number,
    },
    fullUpdatedDate: {
      unixDate: Number,
      day: Number,
      weekOfYear: Number,
      month: Number,
      year: Number,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Event", EventSchema, "Events")
