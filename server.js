// --------------------- setting up instance of express --------------------- \\
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const PORT = 3000;
const mysql = require("mysql2/promise");

// --------------------- server settings --------------------- \\

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// setting up pathing for ejs so it knows where views lives...
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  // here... we are using the query from the user to then send back data
  const searchTerm = req.query.search || "No search term provided";
  //   data gets sent as json which is parsed on the client side...
  res.json({ search: searchTerm });
});

// --------------------------- database connections---------------------------- \\

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

// connectToDatabase();

// --------------------------- server gets booted---------------------------- \\

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
