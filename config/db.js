require("dotenv").config();
const mysql = require("mysql2/promise");
const config = require("./config");

const connectToDatabase = async () => {
  try {
    const pool = mysql.createPool(config);
    console.log("Connected to MySQL database");
    return pool; // return pool for queries
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

module.exports = connectToDatabase;
