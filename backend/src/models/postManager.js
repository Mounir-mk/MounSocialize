const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  insert(post) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [post.title]
    );
  }

  update(post) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [post.title, post.id]
    );
  }

  findAllByUserId(userId) {
    return this.connection.query(
      `select * from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  findOneByUserId(postId, userId) {
    return this.connection.query(
      `select * from ${this.table} where id = ? and user_id = ?`,
      [postId, userId]
    );
  }

  updateByUserId(post, userId) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ? and user_id = ?`,
      [post.title, post.id, userId]
    );
  }

  insertByUserId(post, userId) {
    return this.connection.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [post.title, userId]
    );
  }

  deleteByUserId = (postId, userId) => {
    return this.connection.query(
      `delete from ${this.table} where id = ? and user_id = ?`,
      [postId, userId]
    );
  };
}

module.exports = PostManager;
