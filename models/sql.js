module.exports = {
  selectMembers:    `select * from member`,
  selectMemberOne:  `select * from member where user_id=?`,
  createMember:     `insert into member set ?`,
  updateMember:     `update member set ? where id=?`,
  deleteMember:     `delete from member where id=?`,

  selectTodosAll:   `select * from todos`,
  selectTodos:      `select * from todos where mem_id=?`,
  createTodos:      `insert into todos set ?`,
  updateTodos:      `update todos set ? where id=?`,
  deleteTodos:      `delete from todos where id=?`,
};