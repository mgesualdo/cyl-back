const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const WalletSchema = new mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    balance: { type: Number, default: 0 },
    annulled: { type: Boolean, default: false },
    person: {
      type: ObjectId,
      ref: "Person",
    },
    annulledBy: {
      type: ObjectId,
      ref: "Person",
    },
    createdBy: {
      type: ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Wallet", WalletSchema, "Wallets")
