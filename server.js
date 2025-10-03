require("dotenv").config();
// -------------------------------- setting up dependencies ---------------------------------- \\
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");
const hbs = require("hbs"); //JANE DID IT!!!!

// -------------------------------- setting up custom modules -------------------------- \\
const connectToDatabase = require("./config/db");
const getArticle = require("./lib/api");
const authRoutes = require("./routes/auth");
const authenticateToken = require("./routes/authToken");
const PORT = process.env.PORT || process.env.PORT || 8000;

//------------------------------- server settings --------------------------------------- \\

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// for testing purposes please dont uncomment or delete this (EDUARDO DID THIS)
// app.use(express.static(path.join(__dirname, "test-folder")));
app.use(express.static(path.join(__dirname, "public")));

// login/signup end points
app.use("/", authRoutes);
// instantiate db on local machine
connectToDatabase();
// setting up pathing for ejs so it knows where views lives...
app.set("view engine", "hbs");
// change back for non-testing
app.set("views", path.join(__dirname, "views"));

// please dont uncomment or delete this, it is the set up for my testing routes on test-folder: (EDUARDO DID THIS)
// app.set("views", path.join(__dirname, "test-folder"));

// ---------------------------------------------routes --------------------------------------- \\

//register partials
hbs.registerPartials(path.join(__dirname, "views/partials")); //JANE DID IT!!!!

app.get("/", (req, res) => {
  res.render("index", {
    intro:
      "Stay ahead in the fast-moving world of AI and technology with ByteSized, your personal weekly tech digest!",
    message:
      "Curated research, breakthroughs, and industry insights delivered weekly all in one place. Stay smart. Stay updated. Stay ahead.",
  });
});

app.get("/signup", (req, res) => {
  res.render("signup"); // Helena
});

app.get("/login", (req, res) => {
  res.render("login");
});

// this actually where our search page will go
app.get("/dashboard", (req, res) => {
  //JANE DID IT!!!
  res.render("dashboard");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus"); // HELENA 
});

// this is where our API fetch will happen, it is our exposed endpoint...
app.get("/search", authenticateToken, async (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

