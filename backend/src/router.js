const express = require("express");

const router = express.Router();

const {
  hashPassword,
  getUserByEmail,
  verifyPassword,
} = require("./_services/auth");

const userController = require("./controllers/userController");

router.post("/login", getUserByEmail, verifyPassword);

router.get("/users", userController.browse);
router.get("/users/:id", userController.read);
router.post("/users", hashPassword, userController.add);

module.exports = router;
