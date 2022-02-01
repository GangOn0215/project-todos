const { router } = require('../common');
const account    = require('./account/index');
const email      = require('./email');

router.get('/', (req, res) => {
  //  __dirname : 현재 실행 중인 폴더 경로
  res.status(200).render('index.hbs', {
    wiseSaying: '변명 중에서도 가장 어리석고 못난 변명은 "시간이 없어서" 라는 변명이다.',
  })
});

router.use('/account', account);
router.use('/email', email);

module.exports = router;