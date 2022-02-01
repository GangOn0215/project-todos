const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;

const router = require('./router/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
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


app.use(router);

app.get('/', (req, res) => {
  //  __dirname : 현재 실행 중인 폴더 경로
  res.status(200).render('index.hbs', {
    wiseSaying: '변명 중에서도 가장 어리석고 못난 변명은 "시간이 없어서" 라는 변명이다.',
  })
});