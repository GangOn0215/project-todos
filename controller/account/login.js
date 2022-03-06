const query = require('../../models/DB');

const getMember = async (username) => {
  const user = await query('selectMemberOne', username);

  return user;
}

module.exports = {
  getMember
}