const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // 3 days

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "iitmandi", {
    expiresIn: maxAge,
  });
};

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "212921215842-eearqfhdoo7pbmf7d945hqu6h09nfro7.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://research.iitmandi.ac.in:8080/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          where: { email: profile.emails[0].value },
        });

        const firstName =
          profile.name.givenName.length < 4
            ? `${profile.name.givenName}___`
            : profile.name.givenName;
        const lastName =
          profile.name.familyName.length < 4
            ? `${profile.name.familyName}___`
            : profile.name.familyName;

        if (user) {
          // Update user information if already exists
          user.firstName = firstName;
          user.lastName = lastName;
          user = await user.save();
        } else {
          // Create new user if doesn't exist
          user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: profile.emails[0].value,
          });
        }

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
const signin = passport.authenticate("google", { scope: ["profile", "email"] });

const signinCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  session: false,
});

const dashboard = (req, res) => {
  const token = createToken(req.user.id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

  // Redirect to dashboard after setting the cookie
  res.redirect("https://research.iitmandi.ac.in/cca/Dashboard/index.html");
};

module.exports = {
  signin,
  signinCallback,
  dashboard,
};
