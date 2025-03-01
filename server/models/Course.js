const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
    enum: ["morning", "afternoon", "night"],
  },
});

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true },
    description: String,
    image: String,
    batches: [batchSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", courseSchema);
