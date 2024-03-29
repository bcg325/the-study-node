const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ email: username }, async (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
      return done(null, user);
    }

    return done(null, false, { message: "Incorrect password" });
  });
};

const localStrategy = new LocalStrategy(customFields, verifyCallback);
passport.use(localStrategy);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const googleEmail = profile.emails[0].value;
      User.findOne({ email: googleEmail }, async (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: googleEmail,
          });

          return done(null, newUser);
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
