const { router } = require('../common');
const account    = require('./account/index');
const todo       = require('./todo/index');
const email      = require('./email');

router.get('/', (req, res) => {
  console.log('index.js loaded', req.user);
  // console.log(req.session);
  
  let user = req.user ? req.user : null;

  //  __dirname : 현재 실행 중인 폴더 경로
  res.status(200).render('index.hbs', {
    wiseSaying: '변명 중에서도 가장 어리석고 못난 변명은 "시간이 없어서" 라는 변명이다.',
    user: user ? user.user_id : null
  })
});

router.use('/account', account);
router.use('/todo',    todo)
router.use('/email',   email);

module.exports = router;