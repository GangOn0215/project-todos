const { router } = require('../../common');
const timeZon = require('../../common/timezon');
const controllerTodos = require('../../controller/todos');

router.get('/weekly', async (req, res) => {
  console.log('weekly.js loaded, req.user: ', req.user);
  
  const reqUser = req.user;
  let   user_id = null;
  let   uid     = null;
  let   todos   = null;

  if(reqUser) {
    user_id = reqUser.user_id;
    uid     = reqUser.uid;
  }

  if(uid) {
    const day = timeZon.getWeekDay();
    const days = { firstDay: day.firstDay, lastDay: day.lastDay };

    console.log(days);
    let data = await controllerTodos.readTodoDatas(uid, days, 'todo_weekly');
    
    // 데이터 가공
    // console.log(data);
    
    todos = data.map((todo) => {
      return {
        id: todo.id,
        content: todo.todo_content,
        checked: todo.checked ? true : false
      };
    });

    console.log(todos);
  }

  res.status(200).render('todo/weekly.hbs', {
    user: user_id,
    todos: todos
  });
});

module.exports = router;