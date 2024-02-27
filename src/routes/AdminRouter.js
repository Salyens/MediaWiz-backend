const router = require("express").Router();
const FeedbackController = require("../controllers/FeedbackController");
const AdminController = require("../controllers/AdminController");
const verifyToken = require("../middlewares/auth/verifyToken");

router.post("/registration", AdminController.createAdmin);
router.post("/login", AdminController.login);
router.get("/me", [verifyToken], (req, res) => res.send(req.user));

router.route("/").get([verifyToken], FeedbackController.getAll);

module.exports = router;
