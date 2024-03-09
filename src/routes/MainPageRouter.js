const router = require("express").Router();
const MainPageController = require("../controllers/MainPageController");
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

router.post("/main-page", MainPageController.create);
router.get("/main-page", MainPageController.get);
router.patch(
  "/admin/main-page",
  [checkUploadFolder, upload.any(), multerErrorHandler],
  MainPageController.update
);

module.exports = router;
