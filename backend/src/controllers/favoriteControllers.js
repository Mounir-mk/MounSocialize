const models = require("../models");

const browseByPostandUser = (req, res) => {
  models.favorite
    .findAllByPostIdandUserId(req.params.postId, req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readByPostandUser = (req, res) => {
  models.favorite
    .findOneByPostIdandUserId(
      req.params.favoriteId,
      req.params.postId,
      req.params.id
    )
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editByPostandUser = (req, res) => {
  const favorite = req.body;
  models.favorite
    .updateByPostIdandUserId(favorite, req.params.postId, req.params.id)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addByPostandUser = (req, res) => {
  const favorite = req.body;
  models.favorite
    .insertByPostIdandUserId(favorite, req.params.postId, req.params.id)
    .then(([rows]) => {
      res.location(
        `/users/${req.params.id}/posts/${req.params.postId}/favorites/${rows.insertId}`
      );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyByPostandUser = (req, res) => {
  models.favorite
    .deleteByPostIdandUserId(
      req.params.favoriteId,
      req.params.postId,
      req.params.id
    )
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browseByPostandUser,
  readByPostandUser,
  editByPostandUser,
  addByPostandUser,
  destroyByPostandUser,
};
