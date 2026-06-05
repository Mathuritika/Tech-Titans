const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema({
  studentId: String,

  concept: Number,
  formula: Number,
  calculation: Number,

  step1: Number,
  step2: Number,

  q1Total: Number,
  q2Total: Number,
  finalTotal: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Evaluation",
  EvaluationSchema
);