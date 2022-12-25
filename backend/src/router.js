const express = require("express");

const router = express.Router();

const {
  hashPassword,
  getUserByEmail,
  verifyPassword,
  verifyToken,
} = require("./_services/auth");

const userController = require("./controllers/userController");

// register and login routes are public and do not require authentication
router.post("/users", hashPassword, userController.add);
router.post("/login", getUserByEmail, verifyPassword);

// all routes below this line require authentication
router.use(verifyToken);
router.get("/users", userController.browse);
router.get("/users/:id", userController.read);

module.exports = router;
