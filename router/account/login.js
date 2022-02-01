const { router } = require('../../common');

router.get('/login', (req, res) => {
  res.status(200).render('account/login.hbs', {})
});

module.exports = router;