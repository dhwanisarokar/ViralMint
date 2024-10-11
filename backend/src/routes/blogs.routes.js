const express = require("express");
const { blogController } = require("../controllers");
const { authMiddleware, checkBlogCreatedByUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlogByID);
router.post("/", authMiddleware, blogController.createBlog);
router.put("/:id", authMiddleware, checkBlogCreatedByUser, blogController.updateBlog);

module.exports = router;
