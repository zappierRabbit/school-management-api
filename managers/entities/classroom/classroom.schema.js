const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    resources: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", ClassroomSchema);
