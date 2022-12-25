const mongoose = require("mongoose")

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
    fullname: {
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
    loginCode: { type: String, maxLength: 6 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Person", PersonSchema, "Persons")
