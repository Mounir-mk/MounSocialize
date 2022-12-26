const express = require("express");

const router = express.Router();

const {
  hashPassword,
  getUserByEmail,
  verifyPassword,
  // verifyToken,
} = require("./_services/auth");

// setting up controllerss
const usercontrollers = require("./controllers/userControllers");
const postcontrollers = require("./controllers/postControllers");
const commentcontrollers = require("./controllers/commentControllers");
const favoritecontrollers = require("./controllers/favoriteControllers");

// register and login routes are public and do not require authentication
router.post("/users", hashPassword, usercontrollers.add);
router.post("/login", getUserByEmail, verifyPassword);

// all routes below this line require authentication
// router.use(verifyToken);

// routes concerning users
router.get("/users", usercontrollers.browse);
router.get("/users/:id", usercontrollers.read);

// routes concerning posts
router.get("/posts", postcontrollers.browse);
router.get("/posts/:id", postcontrollers.read);
router.post("/posts", postcontrollers.add);
router.put("/posts/:id", postcontrollers.edit);
router.delete("/posts/:id", postcontrollers.destroy);

router.get("/users/:id/posts", postcontrollers.browseByUser);
router.get("/users/:id/posts/:postId", postcontrollers.readByUser);
router.post("/users/:id/posts", postcontrollers.addByUser);
router.put("/users/:id/posts/:postId", postcontrollers.editByUser);
router.delete("/users/:id/posts/:postId", postcontrollers.destroyByUser);

// routes concerning comments
router.get(
  "/users/:id/posts/:postId/comments",
  commentcontrollers.browseByPostandUser
);
router.get(
  "/users/:id/posts/:postId/comments/:commentId",
  commentcontrollers.readByPostandUser
);
router.post(
  "/users/:id/posts/:postId/comments",
  commentcontrollers.addByPostandUser
);
router.put(
  "/users/:id/posts/:postId/comments/:commentId",
  commentcontrollers.editByPostandUser
);
router.delete(
  "/users/:id/posts/:postId/comments/:commentId",
  commentcontrollers.destroyByPostandUser
);

// // routes concerning favorites
router.get(
  "/users/:id/posts/:postId/favorites",
  favoritecontrollers.browseByPostandUser
);
router.get(
  "/users/:id/posts/:postId/favorites/:favoriteId",
  favoritecontrollers.readByPostandUser
);
router.post(
  "/users/:id/posts/:postId/favorites",
  favoritecontrollers.addByPostandUser
);
router.put(
  "/users/:id/posts/:postId/favorites/:favoriteId",
  favoritecontrollers.editByPostandUser
);
router.delete(
  "/users/:id/posts/:postId/favorites/:favoriteId",
  favoritecontrollers.destroyByPostandUser
);

module.exports = router;
