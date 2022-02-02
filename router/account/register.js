const { router } = require('../../common');
const passport = require('passport');

router.get('/register', (req, res) => {
  res.status(200).render('account/register.hbs', {});
});

router.post('/register', 
  passport.authenticate('local-join', {
    // 성공시, 메인 페이지 이동
    successRedirect: '/',
    // 실패시, 회원가입 페이지 이동
    failureRedirect: '/account/register',
    failureFlash: false
  })
);
// router.post('/register', (req, res) => {
//   console.log(req.body);
//   const body = req.body;
//   const id = body.user_id;
//   const pw = body.user_pw;
//   const nickname = body.user_nickname;
//   const email = body.user_email;

//   const sql = { user_id: id, user_pw: pw, user_nickname: nickname, user_email: email };
//   const query = connect.query('insert into member set ?', sql, (err, rows) => {
//     if(err) { throw err; }
//     console.log("ok db insert: ", rows.insertId);
//   })
// })

module.exports = router;