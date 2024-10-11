const express = require("express");

const blogRoute = require("./blogs.routes");
const authRoute = require("./auth.routes");

const router = express.Router();

router.use("/blogs", blogRoute);
router.use("/auth", authRoute);

module.exports = router;