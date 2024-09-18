const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  create: (userData, callback) => {
    const { username, email, password } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      callback
    );
  },
  findByUsername: (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], callback);
  },
};

module.exports = User;
