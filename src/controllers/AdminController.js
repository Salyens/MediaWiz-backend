const { Admin } = require("../models/Admin");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).send({ message: "Invalid email or password" });

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch)
      return res.status(401).send({ message: "Invalid email or password" });

    if (!admin.isActive) {
      return res.status(403).send({
        message:
          "Your access is temporarily restricted. Please contact support for further details.",
      });
    }

    const accessToken = generateToken(
      {
        isActive: admin.isActive,
      },
      "24h"
    );

    return res.send({ accessToken });
  } catch (_) {
    return res.status(400).send({
      message: "Something went wrong while processing the login request",
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, +process.env.SALT);
    await Admin.create({ ...req.body, password });
    const accessToken = generateToken({ isActive: true }, "24h");
    return res.send({ accessToken });
  } catch (e) {
    console.log("e: ", e);
    if (e.code === 11000) {
      return res.status(400).send({ message: "Email already exists" });
    }
    return res
      .status(400)
      .send({ message: "Something went wrong during registration" });
  }
};
