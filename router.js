




const express = require("express");
const db = require("./db");

const Router = express.Router();

Router.get("/", (req, res) => {
    const userData = [
        { name: "johsdfn", email: "john12@gmail.com", age: 34 },
        { name: "David", email: "David@gmail.com", age: 54 },
    ];
    res.json(userData); // Use res.json for consistency
});

Router.get("/api/user", (req, res) => {
    db.query("SELECT * FROM form1", (err, rows) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

Router.get("/api/country", (req, res) => {
    db.query("SELECT * FROM students", (err, rows) => {
        if (err) {
            console.error("Error fetching countries:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

Router.get("/api/state/:id", (req, res) => {
    db.query("SELECT * FROM students WHERE countryid = ?", [req.params.id], (err, rows) => {
        if (err) {
            console.error("Error fetching states:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

Router.post("/form1", (req, res) => {
    const { name, username, email } = req.body;

    // Validate input
    if (!name || !username || !email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `INSERT INTO form1 (name, username, email) VALUES (?, ?, ?)`;
    db.query(sql, [name, username, email], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Error inserting data" });
        }
        res.status(200).json({ message: "User added successfully" });
    });
});

module.exports = Router;