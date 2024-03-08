const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // Maximum age for JWT token

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, "iitmandi", {
    expiresIn: maxAge,
  });
};

// Function to handle errors
const handleErrors = (err) => {
  console.error(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === "ER_DUP_ENTRY") {
    errors.email = "That email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ message, path }) => {
      errors[path] = message;
    });
  }

  return errors;
};

// Controller to get all users
async function getAllUsers(req, res) {
  try {
    let users = await User.findAll();
    res.status(200).json({
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// Controller to sign up a new user
async function signUp(req, res) {
  try {
    console.log("user signup is working inside userController.js")
    let body = req.body;
    let newUser = await User.create(body);
    const token = createToken(newUser.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log("New Event: New user Created");
    console.log(newUser);
    res.status(201).json({
      newUser: newUser.id,
      message: "New User Created",
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

// Controller to log in a user
async function login(req, res) {
  console.debug("User login is working inside userController.js");
  try {
    let body = req.body;
    let user = await User.findOne({ where: { email: body.email } });
    if (user) {
      if (user.password === body.password) {
        const token = createToken(user.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user });
      } else {
        res.clearCookie("jwt");
        res.status(401).json({
          message: "Incorrect Password.",
        });
      }
    } else {
      res.clearCookie("jwt");
      res.status(401).json({
        message: "User not found.",
      });
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

// Middleware to protect routes requiring authentication
async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      const payload = jwt.verify(token, "iitmandi");
      if (payload) {
        const user = await User.findByPk(payload.id);
        req.body.role = user.role;
        req.body.id = user.id;
        next();
      } else {
        return res.status(401).json({
          message: "Login again.",
        });
      }
    } else {
      res.status(401).json({
        message: "Please Login",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// Controller to get user profile
async function getUserProfile(req, res) {
  let id = req.body.id;
  let user = await User.findByPk(id);
  if (user) {
    return res.json(user);
  } else {
    res.json({
      message: "User not found",
    });
  }
}

// Controller to delete all users
async function deleteAll(req, res) {
  await User.destroy({ truncate: true });
  res.json({
    message: "Users Deleted",
  });
}

module.exports = {
  signUp,
  getAllUsers,
  deleteAll,
  protectRoute,
  getUserProfile,
  login,
};
