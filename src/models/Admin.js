const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, minlength: 5, required: true },
    password: { type: String, minlength: 6, required: true },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = { Admin, AdminSchema };
