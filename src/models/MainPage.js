const mongoose = require("mongoose");

const MainPageSchema = new mongoose.Schema(
  {
    header:{ type: String },
    description: { type: String },
    offer: { type: Object },
    quotes: { type: Array },
    groupPhoto: { type: Object },
  },
  { versionKey: false }
);
const MainPage = mongoose.model("MainPage", MainPageSchema);
module.exports = { MainPage, MainPageSchema };

