const passport = require('passport');
const crypto = require('crypto');
const connection = require('../../models/DB');
const controllerAccount = require("../../controller/account");
const LocalStrategy = require('passport-local').Strategy;
const { default: axios } = require('axios');

module.exports = () => {
  passport.use('local-register', new LocalStrategy({
    /* 오타 수정 */
    usernameField: 'user_id',
    passwordField: 'user_pw',
    // passReqToCallback: true --> (req, email, userpw, done)
    // passReqToCallback: false --> (email, userpw, done)
    passReqToCallback: true
  }, async (req, user_id, user_pw, done) => {
    
    const user = await controllerAccount.getMember(user_id);
    console.log(user.length);

    // 만약 아이디가 존재한다면
    if (user.length > 0) {
      console.log('this id is already');

      return done(null, false, { message: "this id is already" });
    }

    const salt = crypto.randomBytes(16).toString('hex');

    crypto.pbkdf2(user_pw, salt, 10000, 32, 'sha256', async (err, hashedPassword) => {
      if (err) throw err;

      const timezoneOffset    = new Date().getTimezoneOffset() * 60000;
      const timezoneDate      = new Date(Date.now() - timezoneOffset);
      const register_datetime = timezoneDate.toISOString().slice(0, 19).replace('T', ' ');

      const res     = await axios.get('https://extreme-ip-lookup.com/json');
      const user_ip = res.data.query;

      const sql = {
        user_id: user_id,
        user_pw: hashedPassword.toString('hex'),
        user_nickname: req.body.user_nickname,
        user_email: req.body.user_email,
        user_register_datetime: register_datetime,
        user_register_ip: user_ip,
        salt: salt
      }

      const insertedUserInfo = await controllerAccount.createMember(sql);

      console.log(insertedUserInfo);

      return done(null, { 
        'uid': insertedUserInfo.insertId,
        'user_id': user_id
      });
    });

  }));
}