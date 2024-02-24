const router = require("express").Router();
const FeedbackController = require("../controllers/FeedbackController");

router
  .route("/")
  .post(FeedbackController.create)

module.exports = router;
