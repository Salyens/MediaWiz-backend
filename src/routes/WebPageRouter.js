const router = require("express").Router();
const WebPageController = require("../controllers/WebPageController");
const multer = require("multer");
const path = require("path");
const checkUploadFolder = require("../middlewares/checkUploadFolder");
const multerErrorHandler = require("../middlewares/multerErrorHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "src", "uploads");
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
});

router.post("/web-page", WebPageController.create);
router.get("/web-page", WebPageController.get);
router.patch(
  "/web-page",
  [checkUploadFolder, upload.any(), multerErrorHandler],
  WebPageController.update
);

module.exports = router;
