const { router } = require('../../common');

router.get('/daily', (req, res) => {
  console.log('daily.js loaded', req.user);
  let user_id = req.user ? req.user : null;
  // let todos = 
  res.status(200).render('todo/daily.hbs', {
    user: user_id,
    // todos: todos
  })
});

module.exports = router;