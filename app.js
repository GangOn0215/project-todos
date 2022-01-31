const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;
const mysql = require('mysql');
let mysql_json_file = require('./private/database.json');
mysql_json_file = JSON.parse(JSON.stringify(mysql_json_file));

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: mysql_json_file.id,
  password: mysql_json_file.password,
  database: 'test_account'
});

connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",  //기본 레이아웃 설정

    //레이아웃 디렉토리 설정
    layoutDir: __dirname + "/views/layouts"
  })
);
app.set('view engine', 'hbs')

app.listen(port, () => {
  console.log(`Start! express server on port ${port}!!`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  //  __dirname : 현재 실행 중인 폴더 경로
  res.status(200).render('index.hbs', {
    wiseSaying: '변명 중에서도 가장 어리석고 못난 변명은 "시간이 없어서" 라는 변명이다.',
  })
});

app.get('/account/login', (req, res) => {
  res.status(200).render('account/login.hbs', {})
});

app.get('/account/register', (req, res) => {
  res.status(200).render('account/register.hbs', {});
});

app.get('/study/email', (req, res) => {
  res.status(200).render('tutorial/email_form.hbs', {});
})

app.post('/post/email', (req, res) => {
  res.status(200).render('tutorial/email.hbs', {
    user_email: req.body.email
  });
});

app.post('/post/ajax_send_email', (req, res) => {
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
      // console.log(rows[0].user_nickname);
      responseData = {
        'result': true,
        'nickname': rows[0].user_nickname
      }
      console.log(1);
    } else {
      console.log(`none: ${rows[0]}`);
    }

    res.json(responseData);
  });
});