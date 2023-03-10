const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, email, image, hashed_password) values (?, ?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.image, user.hashPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }

  readByEmail(email) {
    return this.connection.query(
      `select id, firstname, lastname, email, image, hashed_password as hashPassword from ${this.table} where email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;
