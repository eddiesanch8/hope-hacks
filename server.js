// --------------------- setting up instance of express --------------------- \\
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = 3000;
const mysql = require("mysql2/promise");
const hbs = require("hbs"); //JANE DID IT!!!!
const getArticle = require("./lib/api/api");
require("dotenv").config();

// --------------------- server settings --------------------- \\

app.use(express.urlencoded({ extended: true }));
app.use(cors());
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

app.get("/signup", (req, res)=> { res.render("signup")}) 

// --------------------------- testing site--------------------------- \\
app.get("/test", async (req, res) => {
  try {
    const searchTerm = req.query.search || "No search term provided";
    const data = await getArticle(searchTerm);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
// --------------------------- server gets booted---------------------------- \\

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
