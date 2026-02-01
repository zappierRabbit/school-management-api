const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true
    },
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    classroom_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    status: {
      type: String,
      enum: ["ENROLLED", "TRANSFERRED"],
      default: "ENROLLED"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
