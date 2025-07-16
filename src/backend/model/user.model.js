// models/user.model.js

const sql = require("../config/db.config.js"); // Correct path to db config

// Constructor
const User = function(user) {
  this.name = user.name;
  this.username = user.username;
  this.email = user.email;
};

// Create a new user
User.create = (newUser, result) => {
  sql.query("INSERT INTO form1 SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

// Find a user by ID (FIXED: SQL Injection vulnerability)
User.findById = (id, result) => {
  sql.query("SELECT * FROM form1 WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

// Get all users
User.getAll = (result) => {
  sql.query("SELECT * FROM form1 ORDER BY id DESC", (err, res) => {
    if (err) {
      result(null, err); // Standard is (err, data)
      return;
    }
    result(null, res);
  });
};

// Update a user by ID
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE form1 SET name = ?, username = ?, email = ? WHERE id = ?",
    [user.name, user.username, user.email, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...user });
    }
  );
};

// Delete a user by ID
User.remove = (id, result) => {
  sql.query("DELETE FROM form1 WHERE id = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = User;