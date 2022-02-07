const { router } = require('../../common');
const passport = require('passport');

router.get('/register', (req, res) => {
  if(!req.user) {
    res.status(200).render('account/register.hbs', {});
  } else {
    res.redirect('/');
  }
});

router.post('/register',
  passport.authenticate('local-register', {
    // 성공시, 메인 페이지 이동
    successRedirect: '/',
    // 실패시, 회원가입 페이지 이동
    failureRedirect: '/account/register',
    failureFlash: true
  })
);

module.exports = router;