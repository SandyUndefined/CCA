const jwt = require("jsonwebtoken");

const generateToken = (userFromDb) => {
  const userPayload = { id: userFromDb.id, email: userFromDb.email };
  const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
};

module.exports = { generateToken };
