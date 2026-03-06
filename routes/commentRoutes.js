const express = require("express");
const router = express.Router();

const { addComment, getComments } = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/:taskId", authMiddleware, addComment);

router.get("/:taskId", authMiddleware, getComments);

module.exports = router;