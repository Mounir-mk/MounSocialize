const express = require("express");

const router = express.Router();

const userController = require("./controllers/userController");

router.get("/users", userController.browse);
router.get("/users/:id", userController.read);
router.post("/users", userController.add);

module.exports = router;
