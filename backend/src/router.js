const express = require("express");

const router = express.Router();

const {
  hashPassword,
  getUserByEmail,
  verifyPassword,
  verifyToken,
} = require("./_services/auth");

// setting up controllers
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

// register and login routes are public and do not require authentication
router.post("/users", hashPassword, userController.add);
router.post("/login", getUserByEmail, verifyPassword);

// all routes below this line require authentication
router.use(verifyToken);

// routes concerning users
router.get("/users", userController.browse);
router.get("/users/:id", userController.read);

// routes concerning posts
router.get("/posts", postController.browse);
router.get("/posts/:id", postController.read);
router.get("/users/:id/posts", postController.browseByUser);
router.get("/users/:id/posts/:postId/comments", postController.browseComments);
router.get("/users/:id/posts/:postId/likes", postController.browseLikes);

module.exports = router;
