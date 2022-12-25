const models = require("../models");

const browse = (req, res) => {
  models.post
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByUser = (req, res) => {
  models.post
    .findAllByUserId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.post
    .find(req.params.id)
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

const readByUser = (req, res) => {
  models.post
    .findOneByUserId(req.params.postId, req.params.id)
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

const edit = (req, res) => {
  const post = req.body;

  // TODO validations (length, format...)

  post.id = parseInt(req.params.id, 10);

  models.post
    .update(post)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editByUser = (req, res) => {
  const post = req.body;
  post.id = parseInt(req.params.postId, 10);
  post.userId = parseInt(req.params.id, 10);

  // TODO validations (length, format...)

  models.post
    .updateByUserId(post, post.userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const post = req.body;

  // TODO validations (length, format...)

  models.post
    .insert(post)
    .then(([result]) => {
      res.location(`/posts/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addByUser = (req, res) => {
  const post = req.body;
  post.userId = parseInt(req.params.id, 10);

  // TODO validations (length, format...)

  models.post
    .insertByUserId(post, post.userId)
    .then(([result]) => {
      res
        .location(`/users/${post.userId}/posts/${result.insertId}`)
        .sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.post
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyByUser = (req, res) => {
  models.post
    .deleteByUserId(req.params.postId, req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  browseByUser,
  readByUser,
  editByUser,
  addByUser,
  destroyByUser,
};
