const mysql = require("mysql2");
const path = require("path");
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: parseInt(process.env.MYSQLPORT),
   // This ensures the port is a number
});

connection.connect(error => {
  if (error) {
    console.error("❌ DATABASE CONNECTION FAILED");
    console.error("Error Message:", error.message);
    return;
  }
  console.log("✅ Successfully connected to Railway MySQL!");
});

module.exports = connection;