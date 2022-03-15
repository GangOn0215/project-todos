const query = require('../../models/DB');

const getMmembers = async () => {
  const users = await query('selectMembers');

  return users;
};

const getMember = async (username) => {
  const user = await query('selectMemberOne', username);

  return user;
};

const createMember = async (userOBJ) => {
  const result = await query('createMember', userOBJ);

  return result;
};

module.exports = {
  getMember,
  createMember
};