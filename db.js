



const mysql = require("mysql"); // Added missing 'const'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "laravel"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

module.exports = db;