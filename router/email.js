const { router } = require('../common');
const connection = require('../models/DB');

router.get('/form', (req, res) => {
  res.status(200).render('tutorial/email_form.hbs', {});
})

router.post('/email', (req, res) => {
  res.status(200).render('tutorial/email.hbs', {
    user_email: req.body.email
  });
});

router.post('/ajax/send_email', (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  //validation: 확인
  // check validation aboout input value => select db
  let responseData = {
    'result': false,
    'nickname': 'none'
  }
  const query = connection.query(`select user_nickname from member where user_email="${email}"`, (err, rows) => {
    if (err) throw err;
    if (rows[0]) {
      // console.log(rows);
      responseData = {
        'result': true,
        'nickname': rows[0].user_nickname
      }
    } else {
      console.log(`none: ${rows[0]}`);
    }

    res.json(responseData);
  });
});

module.exports = router;