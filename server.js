require("dotenv").config();
// --------------------- setting up dependencies --------------------- \\
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2");
const hbs = require("hbs"); //JANE DID IT!!!!

// --------------------- setting up external modules --------------------- \\
const connectToDatabase = require("./config/db");
const getArticle = require("./lib/api");
const authRoutes = require("./routes/auth");
const PORT = 3000;

// --------------------- server settings --------------------- \\

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// login/signup end points
app.use("/", authRoutes);
// instantiate db on local machine
connectToDatabase();
// setting up pathing for ejs so it knows where views lives...
app.set("view engine", "hbs");
// change back for non-testing
app.set("views", path.join(__dirname, "views"));


// please dont uncomment or delete this, it is the set up for my testing routes:
// app.set("views", path.join(__dirname, "test-folder"));

// --------------------- routes --------------------- \\

//register partials
hbs.registerPartials(path.join(__dirname, 'views/partials')); //JANE DID IT!!!!

app.get("/", (req, res) => {
  res.render("index", {
    intro: "Welcome to ByteSized!",
    message: "Your new favorite digital newsletter that connects tech professionals, students, and AI enthusiasts with curated news and research on artificial intelligence, making it easy to stay informed about the latest trends, breakthroughs, and applications."
  });
});

app.get("/signup", (req, res)=> { res.render("signup")}) 

// this is where our API fetch will happen
app.get("/search", async (req, res) => {
  try {
    // get form input
    const searchTerm = req.query.search || "No search term provided";
    // fetching API (check lib/api)
    const data = await getArticle(searchTerm);
    // send back the data from our API fetch
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
// --------------------------- testing site--------------------------- \\

app.post("/login", (req, res) => {
  // this is where we capture our user input...
});
app.post("/signup", (req, res) => {
  // this is where we capture our user input...
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
