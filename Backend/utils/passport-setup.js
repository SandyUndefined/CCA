require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userService = require("../services/userService"); // Your user Service

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userService.findUserByEmail(profile.emails[0].value);
        if (!user) {
          // Create a new user if not found
          user = await userService.createUser({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "signed in with Google", // Store a string indicating sign-in method
            googleId: profile.id, // Store Google ID
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
