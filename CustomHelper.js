const handlebars = require('handlebars');

module.exports = () => {
  handlebars.registerHelper('isUser', (user, option) => {
    // 만약 user 데이터가 존재한다면 user 데이터를 return
    if(user) { return option.fn(user); }
  
    return option.inverse(this);
  });
}