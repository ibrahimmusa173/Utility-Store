



const sql = require("mysql"); // Added missing 'const'

const sqlconnect = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "laravel"
});

sqlconnect.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

module.exports = sqlconnect;                 