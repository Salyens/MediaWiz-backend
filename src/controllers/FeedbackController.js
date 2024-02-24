const { Feedback } = require("../models/Feedback");
const sendEmail = require("../utils/sendEmail");

exports.create = async (req, res) => {
  try {
    const feedbackList = await Feedback.create(req.body);
    sendEmail(req.body).catch(console.error);
    return res.send(feedbackList);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({});
    return res.send(feedbackList);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};


