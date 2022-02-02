const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;
const passport = require('passport');
const passportConfig = require('./passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session');
const flash = require('connect-flash');

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

app.use(session({
  secret: 'ketboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passportConfig();

app.listen(port, () => {
  console.log(`Start! express server on port ${port}!!`);
});


app.use(router);