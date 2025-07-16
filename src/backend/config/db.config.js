


// config/db.config.js

const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "laravel" // The database name from your original code
});

// Open the MySQL connection
connection.connect(error => {
    if (error) {
        console.error("MySQL connection error:", error);
        throw error;
    }
    console.log("Successfully connected to the MySQL database.");
});

module.exports = connection;