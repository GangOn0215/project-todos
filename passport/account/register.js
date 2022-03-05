const passport = require('passport');
const crypto = require('crypto');
const connection = require('../../models/DB');
const LocalStrategy = require('passport-local').Strategy;
const requestIp = require('request-ip');
const { default: axios } = require('axios');

module.exports = () => {
  passport.use('local-register', new LocalStrategy({
    /* 오타 수정 */
    usernameField: 'user_id',
    passwordField: 'user_pw',
    // passReqToCallback: true --> (req, email, userpw, done)
    // passReqToCallback: false --> (email, userpw, done)
    passReqToCallback: true
  }, (req, user_id, user_pw, done) => {
    let query = connection.query('select * from member where user_id=?', [user_id], (err, rows) => {
      if (err) return done(err);

      // 아이디가 이미 존재하는 경우
      if (rows.length) {
        console.log('existed user');
        return done(null, false, { message: 'your id is already used' });
      }

      const salt = crypto.randomBytes(16).toString('hex');

      crypto.pbkdf2(user_pw, salt, 10000, 32, 'sha256', async (err, hashedPassword) => {
        if (err) throw err;

        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        const timezoneDate = new Date(Date.now() - timezoneOffset);
        const register_datetime = timezoneDate.toISOString().slice(0, 19).replace('T', ' ');

        const res = await axios.get('https://extreme-ip-lookup.com/json');
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

        query = connection.query('insert into member set ?', sql, (err, rows) => {

          if (err) throw err;
          // done의 역할: 인증이 성공하면 passport에게 사용자의 정보를 전달
          return done(null, { 'uid': rows.insertId, 'user_id': user_id });
        });

      });
    });
  }
  ));
}