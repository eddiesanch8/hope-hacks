// --------------------------- CRUD FUNCTIONS ---------------------------- \\
const mysql = require("mysql2/promise");
const connectToDatabase = require("./db");
let pool;
// IIFE!!!!!!!!
// start that DB right now!!!
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
    const [results] = await pool.query(
      // note: ?? and ? will help prevent against SQL injections...
      `
    SELECT *
    FROM ??
    WHERE ?? = ?
    `,
      [tableName, column, value]
    );
    // if there is a result length( truthy), return the first item in that result, otherwise, its null
    return results.length ? results[0] : null;
  } catch (err) {
    console.error(err);
  }
}

// for inserting a new user instance
async function insertUser(tableName, record) {
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
  insertUser,
};
