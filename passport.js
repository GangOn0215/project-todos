const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy 
const connect = require('./models/DB');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  })

  
passport.use('local-join', 
  new LocalStrategy({
    usernameFiled: 'username',
    passwordField: 'password',
    // passReqToCallback: true --> (req, email, password, done)
    // passReqToCallback: false --> (email, password, done)
    passReqToCallback: true
  }, (req, username, password, done) => {
    console.log(req.body);
    if(username != 'test') { 
      console.log('존재하지 않는 아이디'); 
      return done(null, false, req.flash('loginMessage', '아이디 불일치'));
    }
    if(password != '12345') { 
      console.log('패스워드 불일치'); 
      return done(null, false, req.flash('loginMessage', '비밀번호 불일치'));
    }
    console.log('비밀번호 일치');
    return done(null, {
      username: username,
      password: password
    });
    }
  ));
}