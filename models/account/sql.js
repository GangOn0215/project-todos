module.exports = {
  selectMembers:   `select * from member`,
  selectMemberOne: `select * from member where user_id=?`,
  createMember:    `insert into member set ?`,
  updateMember:    `update member set ? where id=?`,
  deleteMember:    `delete from member where id=?`
}