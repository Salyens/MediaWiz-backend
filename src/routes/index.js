const router = require("express").Router();
const webPageRouter = require("./WebPageRouter");
const mainPageRouter = require("./MainPageRouter");
const adminRouter = require("./AdminRouter");
const feedBackRouter = require("./FeedbackRouter");

router.use("/admin", adminRouter);
router.use("/", webPageRouter);
router.use("/", mainPageRouter);
router.use("/main", feedBackRouter);

module.exports = router;
