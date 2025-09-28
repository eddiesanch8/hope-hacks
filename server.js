// --------------------- setting up dependencies --------------------- \\
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const connectToDatabase = require("./config/db");
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("./config/sqlUtils");
require("dotenv").config();
// connectToDatabase();

// --------------------- setting up external modules --------------------- \\

const getArticle = require("./lib/api/api");
const PORT = 3000;

// --------------------- server settings --------------------- \\

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// setting up pathing for ejs so it knows where views lives...
app.set("view engine", "hbs");
// change back for non-testing
// app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "test-folder"));

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
// this users const would technically be the result of our SQL query....?
const users = [
  {
    name: "eduardo",
    password: "password",
  },
];
// Login Simulator... maybe call it something else? I'm not sure
app.get("/test/users", (req, res) => {
  // sending the users as JSON, this is our exposed endpoint
  res.json(users);
});

// this is our endpoint for getting, hashing, and storing an instance of our users
// refactor for a SQL query...
app.post("/test/users", async (req, res) => {
  try {
    // salt was used in the .hash function but was replaces with 10
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(salt);
    console.log(hashedPassword);

    // this is coming from the post request body...
    // similar to the movies API, we are looking for the req name and password
    const user = {
      name: req.body.name,
      password: hashedPassword,
    };
    // this would simulate a user instance being created
    users.push(user);
    res.status(201).send(user.name);
    console.log(users);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// learning how to login.. need a post request that is async
app.get("/test/users/login", (req, res) => {
  res.render("login");
});
app.post("/test/users/login", async (req, res) => {
  // trying to look inside the users array to find the first instance of the user
  const user = users.find((user) => user.name === req.body.name);
  if (!user) {
    return res.status(400).send("cannot find user");
  }
  // comparing request from user to the outcome of the query???
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send(user.password);
    }
  } catch (err) {
    console.error(err);
  }
});

app.get("/test/users/signup", (req, res) => {
  res.render("signup");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
