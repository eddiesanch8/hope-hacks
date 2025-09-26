// async function connectToDatabase() {
//   try {
//     const connection = await mysql.createConnection({
//       host: "127.0.0.1",
//       user: "root", // Or your MySQL username
//       password: "Getquery45!", // Your MySQL password
//       database: "mock_company", // The database you want to connect to
//     });

//     console.log("Connected to MySQL database!");

//     // Example query
//     const [rows, fields] = await connection.execute(
//       "SELECT * FROM joinslesson_saleman"
//     );
//     console.log(rows);
//     await connection.end(); // Close the connection when done
//   } catch (error) {
//     console.error("Error connecting to MySQL:", error);
//   }
// }

// const apiCall = function () {
//   // code
// };
// connectToDatabase();
