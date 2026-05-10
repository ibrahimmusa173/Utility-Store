// config/db.config.js
module.exports = {

  HOST: process.env.MYSQLHOST || "localhost", 
  USER: process.env.MYSQLUSER || "root",
  PASSWORD: process.env.MYSQLPASSWORD || "oebroPRDxJJHBZEMDnZhxBdOAeTDIiIj ",
  DB: process.env.MYSQLDATABASE || "laravel",
  PORT: process.env.MYSQLPORT || 3306

 
};