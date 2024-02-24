const router = require("express").Router();
const webPageRouter = require("./WebPageRouter");
const mainPageRouter = require("./MainPageRouter");
const adminRouter = require("./AdminRouter");

router.use("/admin", adminRouter);
router.use("/admin", webPageRouter);
router.use("/admin", mainPageRouter);

module.exports = router;
