const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  insert(comment) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [comment.title]
    );
  }

  update(comment) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [comment.title, comment.id]
    );
  }

  findAllByPostIdandUserId = (postId, userId) => {
    return this.connection.query(
      `select * from ${this.table} where post_id = ? and user_id = ?`,
      [postId, userId]
    );
  };

  findOneByPostIdandUserId = (commentId, postId, userId) => {
    return this.connection.query(
      `select * from ${this.table} where id = ? and post_id = ? and user_id = ?`,
      [commentId, postId, userId]
    );
  };

  updateByPostIdandUserId = (comment, postId, userId) => {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ? and post_id = ? and user_id = ?`,
      [comment.title, comment.id, postId, userId]
    );
  };

  insertByPostIdandUserId = (comment, postId, userId) => {
    return this.connection.query(
      `insert into ${this.table} (title, post_id, user_id) values (?, ?, ?)`,
      [comment.title, postId, userId]
    );
  };

  destroyByPostandUser = (commentId, postId, userId) => {
    return this.connection.query(
      `delete from ${this.table} where id = ? and post_id = ? and user_id = ?`,
      [commentId, postId, userId]
    );
  };
}

module.exports = CommentManager;
