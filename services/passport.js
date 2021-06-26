const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy( //this google strategy has some internal code which says that its name is "google" so whenever its loaded its called "google"
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      //we added a return statement and removed that shitty else because agr user mil gaya to return ho jega aur us return k neeche ka code chlega hi nhi......so we can avoid that else part
      const user = await new User({
        googleId: profile.id,
      }).save();
      done(null, user);
    }
  )
);
