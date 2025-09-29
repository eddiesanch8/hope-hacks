const express = require("express");
const { register, login } = require("./authControllers");
const router = express.Router();
// setting up our to expose our enpoints on server.js
router.post("/signup", register);
router.post("/login", login);

module.exports = router;
