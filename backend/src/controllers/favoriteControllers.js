const models = require("../models");

const browseByPostandUser = (req, res) => {
  models.like
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
  models.like
    .findOneByPostIdandUserId(
      req.params.likeId,
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
  const like = req.body;
  models.like
    .updateByPostIdandUserId(like, req.params.postId, req.params.id)
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
  const like = req.body;
  models.like
    .insertByPostIdandUserId(like, req.params.postId, req.params.id)
    .then(([rows]) => {
      res.location(
        `/users/${req.params.id}/posts/${req.params.postId}/likes/${rows.insertId}`
      );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyByPostandUser = (req, res) => {
  models.like
    .deleteByPostIdandUserId(
      req.params.likeId,
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
