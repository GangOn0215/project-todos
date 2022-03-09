const query = require('../../models/DB');

/**
 * 
 * @param {*} uid 
 * uid: primary key
 * get user todo data's
 * 
 */

const readTodoDatas = async (uid) => {
  return new Promise((resolve, reject) => {
    const todos = query('selectTodos', uid);
    
    resolve(todos);
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  readTodoDatas,
}