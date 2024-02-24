const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 1, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, minlength: 5 },
    sendTime: { type: Number, default: Date.now() },
  },
  { versionKey: false }
);
const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = { Feedback, FeedbackSchema };
