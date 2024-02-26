const mongoose = require("mongoose");

const commonStructureSchema = new mongoose.Schema({
  main: { type: Object, require:true },
  weOffer: { type: Object, require:true },
  quotes: { type: Array, require:true },
  ourPhoto: { type: Object, require:true },
}, { _id: false, versionKey: false }); 

const MainPageSchema = new mongoose.Schema({
  en: commonStructureSchema,
  ru: commonStructureSchema,
}, { versionKey: false });

const MainPage = mongoose.model("MainPage", MainPageSchema);

module.exports = { MainPage, MainPageSchema };
