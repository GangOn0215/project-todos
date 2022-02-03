const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy 
const connection = require('./models/DB');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('passport session save: ', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('passport session get id: ', user);
    done(null, user);
  })

  
  passport.use('local-register', new LocalStrategy({
    /* 오타 수정 */
    usernameField: 'user_id',
    passwordField: 'user_pw',
    // passReqToCallback: true --> (req, email, userpw, done)
    // passReqToCallback: false --> (email, userpw, done)
    passReqToCallback: true
  }, (req, user_id, user_pw, done) => {
    console.log(req.body);
    let query = connection.query('select * from member where user_id=?', [user_id], (err, rows) => {
        if(err) return done(err);
        // 아이디가 이미 존재하는 경우
        if(rows.length) { 
          console.log('existed user');
          // done의 역할: 인증이 성공하면 passport에게 사용자의 정보를 전달
          return done(null, false, {message: 'your id is already used'});
        }

        const sql = {
          user_id: user_id, 
          user_pw: user_pw, 
          user_nickname: req.body.user_nickname,
          user_email: req.body.user_email
        }
        query = connection.query('insert into member set ?', sql, (err, rows) => {
            if(err) throw err;
            return done(null, {'user_id': user_id, 'uid': rows.insertId});
        });
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
    /* 오타 수정 */
    usernameField: 'user_id',
    passwordField: 'user_pw',
    // passReqToCallback: true --> (req, email, userpw, done)
    // passReqToCallback: false --> (email, userpw, done)
    passReqToCallback: true
  }, (req, user_id, user_pw, done) => {
    console.log(req.body);
    let query = connection.query('select * from member where user_id=?' [user_id], (err, rows) => {
      if(err) return done(err);
      if(rows.length) {
        return
      }
    })
    query = connection.query('select * from member where user_id=?', [user_id], (err, rows) => {
        if(err) return done(err);
        // 아이디가 이미 존재하는 경우
        if(rows.length) { 
          console.log('your id is not found');
          // done의 역할: 인증이 성공하면 passport에게 사용자의 정보를 전달
          return done(null, false, {message: 'your id is not found'});
        }

        const sql = {
          user_id: user_id, 
          user_pw: user_pw, 
        }
        query = connection.query('select * from member where user_id=? AND user_pw=?', sql, (err, rows) => {
            if(err) throw err;
            return done(null, {'user_id': user_id});
        });
      });
    }
  ));
}