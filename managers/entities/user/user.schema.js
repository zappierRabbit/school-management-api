const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password_hash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["SUPERADMIN", "SCHOOL_ADMIN"],
      required: true
    },
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
