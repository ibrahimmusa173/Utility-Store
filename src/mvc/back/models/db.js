const mysql = require("mysql2");
const path = require("path");
// This line finds your .env file at the root of the project
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "laravel",
  port: process.env.MYSQLPORT || 3306
});

connection.connect(error => {
  if (error) {
    console.error("❌ DATABASE ERROR: Could not connect to Railway.");
    console.error("Current Host attempted:", process.env.MYSQLHOST || "localhost");
    console.error("Make sure your .env file has the EXTERNAL Railway host.");
    return;
  }
  console.log("✅ Successfully connected to the database.");
});

module.exports = connection;