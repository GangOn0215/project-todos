let selectBetweenTodos = null;

const setTimeSQL = (uid, days, periodicity) => {
  selectBetweenTodos = `select * from todos where mem_id=${uid} and todo_created_at between '${days.firstDay} 00:00:00' and '${days.lastDay} 23:59:59' and ${periodicity}=1`
}
const getBetweenTodosSTR = () => {
  return selectBetweenTodos;
}

module.exports = {
  selectMembers:    `select * from member`,
  selectMemberOne:  `select * from member where user_id=?`,
  createMember:     `insert into member set ?`,
  updateMember:     `update member set ? where id=?`,
  deleteMember:     `delete from member where id=?`,
  
  selectTodosAll:     `select * from todos`,
  selectTodos:        `select * from todos where mem_id=?`,
  createTodos:        `insert into todos set ?`,
  updateTodos:        `update todos set ? where id=?`,
  deleteTodos:        `delete from todos where id=?`,

  setTimeSQL: setTimeSQL,
  getBetweenTodosSTR: getBetweenTodosSTR,
};