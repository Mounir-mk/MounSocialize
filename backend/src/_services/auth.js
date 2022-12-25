const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

const hashPassword = (req, res, next) => {
  const user = req.body;
  argon2
    .hash(user.password)
    .then((hash) => {
      req.body.hashPassword = hash;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  models.user
    .readByEmail(email)
    .then(([results]) => {
      if (results.length === 0) {
        res.sendStatus(401);
      } else {
        [req.user] = results;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  const { password } = req.body;
  argon2
    .verify(req.user.hashPassword, password)
    .then((match) => {
      if (match) {
        const token = jwt.sign(
          { id: req.user.id, email: req.user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  getUserByEmail,
  verifyPassword,
  verifyToken,
};
