// --------------------- setting up instance of express --------------------- \\
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const PORT = 3000;
const mysql = require("mysql2/promise");
const hbs = require("hbs"); //JANE DID IT!!!!

// --------------------- server settings --------------------- \\

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// setting up pathing for ejs so it knows where views lives...
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//register partials
hbs.registerPartials(path.join(__dirname, 'views/partials')); //JANE DID IT!!!!

app.get("/", (req, res) => {
  res.render("index", {
    intro: "Welcome to ByteSized!",
    message: "Your new favorite digital newsletter that connects tech professionals, students, and AI enthusiasts with curated news and research on artificial intelligence, making it easy to stay informed about the latest trends, breakthroughs, and applications."
  });
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
