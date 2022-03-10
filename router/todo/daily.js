const { router } = require('../../common');
const controllerDaily = require('../../controller/todos/daily');
const timeZon = require('../../common/timezon');

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

router.get('/rest/daily/all', async (req, res) => {
  res.send(await controllerDaily.readTodoDatasAll());
})

router.get('/rest/daily', async (req, res) => {
  const user = req.body.param;
  const data = await controllerDaily.readTodoDatas(user.id);

  res.send(data);
});

router.post('/rest/daily/insert', async (req, res) => {
  // const
  const createQuery = req.body.param;
  createQuery.todo_created_at = timeZon();

  const result = await controllerDaily.createTodos(createQuery);
  
  console.log(result);
});

router.put('/rest/daily/update', async (req, res) => {
  const updateQuery = req.body.param;
  updateQuery[0].todo_last_update_at = timeZon();

  console.log(updateQuery);
  const result = await controllerDaily.updateTodos(updateQuery);

  console.log(result);
});

router.delete('/rest/daily/delete/:id', async (req, res) => {
  const {id} = req.params;    // 라우트 경로와 :id에 매핑되는 값

  const result = await controllerDaily.deleteTodos(id);

  console.log(result);
});

module.exports = router;