module.exports = {
  selectMembers: `select * from member`,
  selectMemberOne: `select * from member where user_id=?`,
  createMember: `insert into member set ?`,
  updateMember: `update member set ? where id=?`,
  deleteMember: `delete from member where id=?`,
  selectTodos: `select * from todos where mem_id=?`,
  createTodos: `insert into member set ?`,
  updateTodos: `update member set ? where id=?`,
  deleteTodos: `delete from member where id=?`,
};
