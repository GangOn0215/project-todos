const { router } = require('../../common');
const passport = require('passport');

router.get('/login', (req, res) => {
  if(!req.user) {
    const flashMessage = req.flash();
    let feedback = '';
    
    if(flashMessage.error) {
      feedback = flashMessage.error[0];
    }
    // console.log('flash message: ', flashMessage);
    
    res.status(200).render('account/login.hbs', {
      flashErrorMsg: feedback,
    });

    return;
  }

  res.redirect('/');

});

router.post('/login', 
  // 로그인 처리 (passport)
  passport.authenticate('local-login', {
    // 성공시, 메인 페이지 이동
    successRedirect: '/',
    // 실패시, 로그인 페이지 이동
    failureRedirect: '/account/login',
    failureFlash: true
  })
);

module.exports = router;