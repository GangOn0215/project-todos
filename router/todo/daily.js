const { router } = require('../../common');
const controllerDaily = require('../../controller/todos/daily');


router.get('/daily', async (req, res) => {
  console.log('test', req.body);
  console.log('daily.js loaded', req.user);
  const reqUser = req.user;
  let   user_id = null;
  let   uid     = null;
  let   todos   = null;

  console.log(reqUser);

  if(reqUser) {
    user_id = reqUser.user_id;
    uid     = reqUser.uid;
  }

  if(uid) {
    let data = await controllerDaily.readTodoDatas(uid);
    
    // 데이터 가공
    console.log(data);
    
    todos = data.map((todo) => {
      return {
        id: todo.id,
        content: todo.todo_content,
        checked: todo.checked ? true : false
      }
    });
  }

  res.status(200).render('todo/daily.hbs', {
    user: user_id,
    todos: todos,
    helpers: {
      json: function(context) {
        return JSON.stringify(context);
      }
    }
  });
});

module.exports = router;
