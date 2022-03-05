const { router } = require('../../common');

router.get('/weekly', (req, res) => {
  console.log('weekly.js loaded', req.user);
  let user_id = req.user ? req.user : null;
  // let todos = 
  res.status(200).render('todo/weekly.hbs', {
    user: user_id,
    // todos: todos
  })
});

module.exports = router;