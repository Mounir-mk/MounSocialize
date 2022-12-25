const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

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

module.exports = {
  hashPassword,
  getUserByEmail,
  verifyPassword,
};
