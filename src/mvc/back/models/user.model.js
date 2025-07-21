// src/mvc/back/models/user.model.js
// --- CORRECTED AND IMPROVED VERSION ---

const sql = require("./db.js");
const bcrypt = require("bcryptjs");

// Constructor
const User = function(user) {
  this.name = user.name;
  this.username = user.username;
  this.email = user.email;
  if (user.password) {
    this.password = user.password;
  }
};

// --- AUTHENTICATION METHODS ---

/**
 * FIXED: Register a new user with a hashed password.
 * This function is now more robust and secure.
 */
User.create = (newUser, result) => {
  // First, validate that a password was provided.
  if (!newUser.password) {
    result({ message: "Password is required for registration." }, null);
    return;
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      result(err, null);
      return;
    }
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        result(err, null);
        return;
      }
      
      // Replace the plain text password with the secure hash before saving
      newUser.password = hash; 

      sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          console.log("Database insertion error: ", err);
          result(err, null);
          return;
        }

        // After successful insertion, create a clean response object
        // that does NOT include the password hash. This is more secure.
        const userForResponse = {
          id: res.insertId,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email
        };

        // Send the clean, secure response object back.
        result(null, userForResponse);
      });
    });
  });
};


// Find a user by email for login
User.findByEmail = (email, result) => {
  sql.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

// Save reset token and expiry to the database
User.saveResetToken = (email, token, expire, result) => {
    sql.query(
        "UPDATE users SET resetPasswordToken = ?, resetPasswordExpire = ? WHERE email = ?",
        [token, expire, email],
        (err, res) => {
            if (err) { result(err, null); return; }
            if (res.affectedRows === 0) { result({ kind: "not_found" }, null); return; }
            result(null, res);
        }
    );
};

// Find user by a valid reset token
User.findByResetToken = (token, result) => {
    sql.query(
        "SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpire > NOW()",
        [token],
        (err, res) => {
            if (err) { result(err, null); return; }
            if (res.length) { result(null, res[0]); return; }
            result({ kind: "not_found" }, null);
        }
    );
};

// Update a user's password
User.updatePassword = (id, password, result) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { result(err, null); return; }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) { result(err, null); return; }
            sql.query(
                "UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpire = NULL WHERE id = ?",
                [hash, id],
                (err, res) => {
                    if (err) { result(err, null); return; }
                    if (res.affectedRows === 0) { result({ kind: "not_found" }, null); return; }
                    result(null, res);
                }
            );
        });
    });
};


// --- ORIGINAL CRUD METHODS (Table name updated to 'users') ---

User.findById = (id, result) => {
  sql.query(`SELECT id, name, username, email FROM users WHERE id = ${id}`, (err, res) => {
    if (err) { result(err, null); return; }
    if (res.length) { result(null, res[0]); return; }
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (result) => {
  sql.query("SELECT id, name, username, email FROM users ORDER BY id DESC", (err, res) => {
    if (err) { result(err, null); return; }
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, username = ?, email = ? WHERE id = ?",
    [user.name, user.username, user.email, id],
    (err, res) => {
      if (err) { result(err, null); return; }
      if (res.affectedRows === 0) { result({ kind: "not_found" }, null); return; }
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) { result(err, null); return; }
    if (res.affectedRows === 0) { result({ kind: "not_found" }, null); return; }
    result(null, res);
  });
};

module.exports = User;