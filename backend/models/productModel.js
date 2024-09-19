const db = require("../config/db");

const Product = {
  create: (productData, callback) => {
    const { name, description, price, stock } = productData;
    db.query(
      "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [name, description, price, stock],
      callback
    );
  },

  findAll: (callback) => {
    db.query("SELECT * FROM products", callback);
  },

  findById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ?", [id], callback);
  },

  update: (id, productData, callback) => {
    const { name, description, price, stock } = productData;
    db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [name, description, price, stock, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM products WHERE id = ?", [id], callback);
  },
};

module.exports = Product;
