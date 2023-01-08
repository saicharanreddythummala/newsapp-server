import express from 'express';
import passport from 'passport';

const route = express.Router();

//user login success
route.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      msg: 'success',
      user: req.user,
    });
  } else {
    res.json({
      success: false,
      msg: 'login to access',
    });
  }
});

//user login failed
route.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    msg: 'failed',
  });
});

//user oAuth logout
route.get('/log', (req, res) => {
  req.session = null;
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect(process.env.CLIENT_URL);
});

route.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

route.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/auth/login/failed',
  })
);

export const authRoute = route;
