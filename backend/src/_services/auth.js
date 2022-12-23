const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
  const user = req.body;
  argon2
    .hash(user.password)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};
