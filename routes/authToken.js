const jwt = require("jsonwebtoken");

// this function will serve as middleware to help make sure the correct user has logged in
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  //   we split becuase we are expecting "Bearer [_Space_] token"
  const token = authHeader && authHeader.split(" ")[1];
  //   we use ensures we have an authHeader before we split and look for token
  if (token == null) return res.status(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) res.status(403).json({ error: "invalid token" });
    // data gets sent back to the user
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
