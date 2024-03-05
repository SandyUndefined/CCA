const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, "iitmandi", {
    expiresIn: maxAge,
  });
};

let newUser;

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user in the database by email
        let user = await User.findOne({
          where: { email: profile.emails[0].value },
        });

        if (user) {
          // Update user information if already exists
          user.firstName = profile.name.givenName;
          user.lastName = profile.name.familyName;
          user = await user.save();
        } else {
          // Create new user if doesn't exist
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
          });
        }
        newUser = user;

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Controller actions
// Redirect to Google for authentication
const signin = passport.authenticate("google", { scope: ["profile", "email"] });

// Callback route after authentication
const signinCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

// Dashboard route after successful authentication
const dashboard = (req, res) => {
  // Create JWT token and set cookie
  const token = createToken(newUser.id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

  res.status(201).json({
    message: "Login Successful!",
    user: newUser,
  });
};

module.exports = {
  signin,
  signinCallback,
  dashboard,
};
