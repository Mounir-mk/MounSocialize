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

  findAllByUser(userId) {
    return this.connection.query(
      `select * from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  findAllCommentsByPost(postId) {
    return this.connection.query(`select * from comment where post_id = ?`, [
      postId,
    ]);
  }

  findAllLikesByPost(postId) {
    return this.connection.query(`select * from like where post_id = ?`, [
      postId,
    ]);
  }
}

module.exports = PostManager;
