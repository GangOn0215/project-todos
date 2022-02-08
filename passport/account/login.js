const passport = require('passport');
const crypto = require('crypto');
const connection = require('../../models/DB');
const LocalStrategy = require('passport-local').Strategy

module.exports = () => {
  passport.use('local-login', new LocalStrategy({
    /* 오타 수정 */
    usernameField: 'user_id',
    passwordField: 'user_pw',
    passReqToCallback: true
  }, (req, user_id, user_pw, done) => {
    let query = connection.query('select * from member where user_id=?', [user_id], (err, rows) => {
      if (err) return done(err);

      /* if(!rows) */
      if (rows.length <= 0) {
        console.log('your id is not found');
        return done(null, false, { message: 'your id is not found' });
      }

      crypto.pbkdf2(user_pw, rows[0].salt, 10000, 32, 'sha256', function (err, hashedPassword) {
        if (err) throw err;

        const row_pw = Buffer.from(rows[0].user_pw, 'hex');
        hashedPassword = Buffer.from(hashedPassword, 'hex');

        if (!crypto.timingSafeEqual(row_pw, hashedPassword)) {
          console.log('Incorrect password');
          return done(null, false, { message: 'Incorrect password' });
        }

        console.log('login success, ', user_id);
        return done(null, { 'user_id': user_id });
      });

    });
  }
  ));
}