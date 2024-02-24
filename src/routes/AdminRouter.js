const router = require("express").Router();
const FeedbackController = require("../controllers/FeedbackController");
const AdminController = require("../controllers/AdminController");
const MainPageController = require("../controllers/MainPageController");

router.post("/registration", AdminController.createAdmin);
router.post("/login", AdminController.login);

router.route("/").get(FeedbackController.getAll);

module.exports = router;
