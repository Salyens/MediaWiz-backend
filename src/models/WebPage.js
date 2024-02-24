const mongoose = require("mongoose");

const WebPageSchema = new mongoose.Schema(
  {
    header:{ type: String },
    description: { type: String },
    offers: { type: Array },
    services: { type: Object },
    workSteps: { type: Object },
  },
  { versionKey: false }
);
const WebPage = mongoose.model("WebPage", WebPageSchema);
module.exports = { WebPage, WebPageSchema };

