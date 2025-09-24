// --------------------- setting up instance of express --------------------- \\
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = 3000;
const mysql = require("mysql2/promise");
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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  // here... we are using the query from the user to then send back data
  const searchTerm = req.query.search || "No search term provided";
  //   data gets sent as json which is parsed on the client side...
  res.json({ search: searchTerm });
});

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
