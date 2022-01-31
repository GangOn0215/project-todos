const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
  // res.sendFile(__dirname + "/public/index.html");
});

app.get('/account/login', (req,res) => {
  // res.sendFile(__dirname + "/public/account/login.html");
  res.status(200).render('account/login.hbs', {})
});

app.get('/account/register', (req, res) => {
  res.status(200).render('account/register.hbs', {});
  // res.sendFile(__dirname + "/public/account/register.html");
});

app.get('/study/email', (req,res) => {
  res.status(200).render('tutorial/email_form.hbs', {});
})

app.post('/post/email', (req, res) => {
  // res.sendFile(__dirname + "/public/nodejs_tutorial/email_form.html");
  res.status(200).render('tutorial/email.hbs', {
    user_email: req.body.email
  });
});

app.post('/post/ajax_send_email', (req, res) => {
  console.log(req.body);
  //validation: 확인
  // check validation aboout input value => select db
  const responseData = {
    'result': true, 
    'email': req.body.email
  }
  res.json(responseData);
});