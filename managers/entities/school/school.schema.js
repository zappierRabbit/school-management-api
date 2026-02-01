const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      default: null
    },
    contact_email: {
      type: String,
      lowercase: true,
      trim: true,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", SchoolSchema);
