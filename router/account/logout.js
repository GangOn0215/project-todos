const { router } = require('../../common');

router.post('/logout', (req, res) => {
  console.log('ajax logout');
  req.logout();
  res.redirect('/');
});

module.exports = router;