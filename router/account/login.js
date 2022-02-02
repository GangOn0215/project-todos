const { router } = require('../../common');
const connection = require('../../models/DB');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get('/login', (req, res) => {
  res.status(200).render('account/login.hbs', {})
});

// connection.get()
router.post('/login', 
  // 로그인 처리 (passport)
  passport.authenticate('local', {
    // 성공시, 메인 페이지 이동
    successRedirect: '/',
    // 실패시, 로그인 페이지 이동
    failureRedirect: '/account/login'
  })
);

module.exports = router;