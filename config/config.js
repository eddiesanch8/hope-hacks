require("dotenv").config();
const config = {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = config;
