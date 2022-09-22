const router = require("express").Router();
const upload = require("../utils/multer");
const blogController = require("../controller/blogController");
const isAuthenticate = require("../utils/Auth");
router.post(
  "/add",
  isAuthenticate,
  upload.single("blog_image"),
  blogController.addNewBlog
);
router.get("/get/:id", isAuthenticate, blogController.getBlog);
router.post(
  "/edit/:id",
  isAuthenticate,
  upload.single("blog_image"),
  blogController.editBlog
);
router.get("/delete/:id", isAuthenticate, blogController.deleteBlog);
router.get("/gets/:page?", isAuthenticate, blogController.getAllBlog);

module.exports = router;
