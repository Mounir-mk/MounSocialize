const AbstractManager = require("./AbstractManager");

class LikeManager extends AbstractManager {
  constructor() {
    super({ table: "like" });
  }

  insert(like) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [like.title]
    );
  }

  update(like) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [like.title, like.id]
    );
  }

  findAllByPostIdandUserId = (postId, userId) => {
    return this.connection.query(
      `select * from ${this.table} where post_id = ? and user_id = ?`,
      [postId, userId]
    );
  };

  findOneByPostIdandUserId = (likeId, postId, userId) => {
    return this.connection.query(
      `select * from ${this.table} where id = ? and post_id = ? and user_id = ?`,
      [likeId, postId, userId]
    );
  };

  updateByPostIdandUserId = (like, postId, userId) => {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ? and post_id = ? and user_id = ?`,
      [like.title, like.id, postId, userId]
    );
  };

  insertByPostIdandUserId = (like, postId, userId) => {
    return this.connection.query(
      `insert into ${this.table} (title, post_id, user_id) values (?, ?, ?)`,
      [like.title, postId, userId]
    );
  };

  destroyByPostandUser = (likeId, postId, userId) => {
    return this.connection.query(
      `delete from ${this.table} where id = ? and post_id = ? and user_id = ?`,
      [likeId, postId, userId]
    );
  };
}

module.exports = LikeManager;
