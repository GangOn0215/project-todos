const passport = require("passport");
const crypto = require("crypto");
// const connection = require('../../models/DB');
// const mysql = require('../../models/DB');
const controllerAccount = require("../../controller/account");
const LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.use( "local-login", new LocalStrategy({
    /* 오타 수정 */
    usernameField: "user_id",
    passwordField: "user_pw",
    passReqToCallback: true,
  }, async (req, user_id, user_pw, done) => {
      let user = await controllerAccount.getMember(user_id);

      if (user !== undefined && user.length < 0) {
        console.log("your id is not found");
        /**
          *
          * done(null, false, { message: 'err_test' })
          * req.flash('error', 'err_test')
          *
          **/
        return done(null, false, { message: "your id is not found" });
      }

      user = user[0];

      crypto.pbkdf2( user_pw, user.salt, 10000, 32, "sha256", function (err, hashedPassword) {
        if (err) throw err;

        const primaryMemID = user.id;
        const row_pw       = Buffer.from(user.user_pw, "hex");
        hashedPassword     = Buffer.from(hashedPassword, "hex");

        if (!crypto.timingSafeEqual(row_pw, hashedPassword)) {
          console.log("Incorrect password");
          return done(null, false, { message: "Incorrect password" });
        }

        console.log("login id:  ", user_id);
        console.log("login uid: ", primaryMemID);

        return done(null, { uid: primaryMemID, user_id: user_id });
      });
    })
)};
