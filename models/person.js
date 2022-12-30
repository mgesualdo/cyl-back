const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const PersonSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    denomination: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
    },
    emails: [
      {
        type: String,
        minlength: 5,
        unique: true,
        lowercase: true,
        required: true,
      },
    ],
    phones: [
      {
        kind: String,
        number: String,
      },
    ],
    type: String,
    isClient: { type: Boolean, default: false },
    isSupplier: { type: Boolean, default: false },
    isEmployee: { type: Boolean, default: false },
    loginCode: { type: String, maxLength: 6 },
    createdBy: {
      type: ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Person", PersonSchema, "Persons")
