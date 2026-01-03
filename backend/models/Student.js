const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: String,
  grade: String,
  subject: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);
