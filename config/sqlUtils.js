// --------------------------- CRUD FUNCTIONS ---------------------------- \\
const mysql = require("mysql2/promise");
const connectToDatabase = require("./db");
let pool;
// IIFE!!!!!!!!
(async () => {
  pool = await connectToDatabase();
  console.log("a lil iffy about this iffe");
})();
// for creating the table
async function createTable(schema) {
  try {
    const [results] = await pool.query(schema);
    return results;
  } catch (err) {
    console.error(err);
  }
}
// for checking if a record already exists or not
async function checkRecordExists(tableName, column, value) {
  try {
    const [rows] = await pool.query(
      `
    SELECT *
    FROM ??
    WHERE ?? = ?
    `,
      [tableName, column, value]
    );
    return results.length ? results[0] : null;
  } catch (err) {
    console.error(err);
  }
}

// for inserting a new user instance
async function insertRecord(tableName, record) {
  try {
    const [results] = await pool.query(`INSERT INTO ?? SET ?`, [
      tableName,
      record,
    ]);
    return results;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
};
