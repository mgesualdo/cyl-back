const mongoose = require("mongoose")
const { AttachmentSchema } = require("./attachment")
const { ObjectId } = mongoose.Schema.Types

const CashflowSchema = new mongoose.Schema(
  {
    amount: Number,
    event: {
      type: ObjectId,
      ref: "Event",
    },
    from: {
      type: ObjectId,
      ref: "Wallet",
    },
    to: {
      type: ObjectId,
      ref: "Wallet",
    },
    attachments: [AttachmentSchema],
    details: String,
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

module.exports = mongoose.model("Cashflow", CashflowSchema, "Cashflows")
