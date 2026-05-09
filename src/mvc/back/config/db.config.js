module.exports = {
  HOST: process.env.MYSQLHOST || "mysql.railway.internal",
  USER: process.env.MYSQLUSER || "root",
  PASSWORD: process.env.MYSQLPASSWORD || "oebroPRDxJJHBZEMDnZhxBdOAeTDIiIj ",
  DB: process.env.MYSQLDATABASE || "railway ",
  PORT: process.env.MYSQLPORT || 3306
};