import passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        gPicture: profile.photos[0].value,
        googleId: profile.id,
        lastLogin: Date.now(),
      };

      const user = await User.findOrCreate(
        { googleId: profile.id },
        defaultUser
      ).catch((err) => {
        console.log(err);
        cb(err, null);
      });

      if (user) {
        return cb(null, user);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
