const models = require("../models");

const browseByPostandUser = (req, res) => {
  models.comment
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
  models.comment
    .findOneByPostIdandUserId(
      req.params.commentId,
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
  const comment = req.body;
  models.comment
    .updateByPostIdandUserId(comment, req.params.postId, req.params.id)
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
  const comment = req.body;
  models.comment
    .insertByPostIdandUserId(comment, req.params.postId, req.params.id)
    .then(([rows]) => {
      res.location(
        `/users/${req.params.id}/posts/${req.params.postId}/comments/${rows.insertId}`
      );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyByPostandUser = (req, res) => {
  models.comment
    .deleteByPostIdandUserId(
      req.params.commentId,
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
