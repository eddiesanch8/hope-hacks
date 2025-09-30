const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createTable,
  checkRecordExists,
  insertUser,
} = require("../config/sqlUtils");
const userSchema = require("../schemas/userSchema");

// ----------------------- Generating Acesss token for our Users -------------------------------\\
// how to log out?
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ----------------------------- first insance of our users -----------------------------------\\
const register = async (req, res) => {
  // destructuring the data sent over from the user in the POST request on JS
  const { first_name, last_name, email, password, confirm_password } = req.body;

  // validating data sent from client on the server
  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res
      .status(400)
      .json({ error: "First and Last Name, Email, and Password are required" });
  }
  // confirm password will not be sent but wil be used for validation
  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // making sure we have our table... this should typically only run once according to our schema
    await createTable(userSchema);

    // more validation for checking to see if our user exists (check SQLutils)
    const existingUser = await checkRecordExists("users", "email", email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // hash our password that has been given to us
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a user to be sent to our db (look at SQLutils)
    const user = {
      first_name,
      last_name,
      email,
      hashed_password: hashedPassword,
    };

    // then we send the user object to the database once its been cleaned, hashed and validated
    await insertUser("users", user);
    // response from db
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------------------- Login functionality  ---------------------------------------\\
const login = async (req, res) => {
  // getting the email and password from our form
  const { email, password } = req.body;

  // small sever side validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // use email to check if user exists, if it does, we get returned the result of that query
    const user = await checkRecordExists("users", "email", email);
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateAccessToken(user.id);
    // send back a JSON object with access token for our user
    res.status(200).json({
      userId: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      access_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
