const passport = require('passport');
const loginPassport = require('./account/login');
const registerPassport = require('./account/register');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('passport session save: ', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('passport session get id: ', user);
    done(null, user);
  })

  loginPassport();
  registerPassport();
}
