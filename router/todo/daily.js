const { router } = require('../../common');
const timeZon = require('../../common/timezon');
const controllerTodos = require('../../controller/todos');

router.get('/daily', async (req, res) => {
  console.log('daily.js loaded, req.user: ', req.user);
  const reqUser = req.user;
  let   user_id = null;
  let   uid     = null;
  let   todos   = null;

  // console.log(reqUser);

  if(reqUser) {
    user_id = reqUser.user_id;
    uid     = reqUser.uid;
  }

  if(uid) {
    const today = timeZon.getToday();
    const days = { firstDay: today, lastDay: today }
    let data = await controllerTodos.readTodoDatas(uid, days, 'todo_daily');
    
    // 데이터 가공
    // console.log(data);
    
    todos = data.map((todo) => {
      return {
        id: todo.id,
        content: todo.todo_content,
        checked: todo.checked ? true : false
      }
    });
  }

  res.status(200).render('todo/daily.hbs', {
    uid: uid,
    user: user_id,
    todos: todos,
    helpers: {
      json: function(context) {
        return JSON.stringify(context);
      }
    }
  });
});

router.get('/rest/daily/all', async (req, res) => {
  res.send(await controllerTodos.readTodoDatasAll());
})

router.get('/rest/daily', async (req, res) => {
  const user = req.body.param;
  const todayDate = timeZon.getToday();
  const days = { firstDay: todayDate, lastDay: todayDate };
  const data = await controllerTodos.readTodoDatas(user.id, days, 'todo_daily');

  res.send(data);
});

router.post('/rest/daily/insert', async (req, res) => {
  // const
  const createQuery = req.body;
  console.log(req.body);

  createQuery.todo_created_at = timeZon.getToday(true);

  const result = await controllerTodos.createTodos(createQuery);

  const responseData = {
    'result': true,
    'todo_id': result.insertId
  }
  
  res.json(responseData);
});

router.put('/rest/daily/update', async (req, res) => {
  const updateQuery = req.body.param;
  updateQuery[0].todo_last_update_at = timeZon.getToday(true);

  console.log(updateQuery);
  const result = await controllerTodos.updateTodos(updateQuery);

  console.log(result);
});

router.delete('/rest/daily/delete/:id', async (req, res) => {
  const {id} = req.params;    // 라우트 경로와 :id에 매핑되는 값

  const result = await controllerTodos.deleteTodos(id);

  console.log(result);
});

module.exports = router;