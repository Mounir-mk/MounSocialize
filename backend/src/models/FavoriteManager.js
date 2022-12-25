const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  insert(favorite) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [favorite.title]
    );
  }

  update(favorite) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [favorite.title, favorite.id]
    );
  }

  findAllByPostIdandUserId = (postId, userId) => {
    return this.connection.query(
      `select * from ${this.table} where post_id = ? and user_id = ?`,
      [postId, userId]
    );
  };

  findOneByPostIdandUserId = (favoriteId, postId, userId) => {
    return this.connection.query(
      `select * from ${this.table} where id = ? and post_id = ? and user_id = ?`,
      [favoriteId, postId, userId]
    );
  };

  updateByPostIdandUserId = (favorite, postId, userId) => {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ? and post_id = ? and user_id = ?`,
      [favorite.title, favorite.id, postId, userId]
    );
  };

  insertByPostIdandUserId = (favorite, postId, userId) => {
    return this.connection.query(
      `insert into ${this.table} (title, post_id, user_id) values (?, ?, ?)`,
      [favorite.title, postId, userId]
    );
  };

  destroyByPostandUser = (favoriteId, postId, userId) => {
    return this.connection.query(
      `delete from ${this.table} where id = ? and post_id = ? and user_id = ?`,
      [favoriteId, postId, userId]
    );
  };
}

module.exports = FavoriteManager;
