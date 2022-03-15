const query = require('../../models/DB');

/**
 * 
 * @param {*} uid 
 * uid: primary key
 * get user todo data's
 * 
 */

const readTodoDatasAll = async () => {
  return query('selectTodosAll');
};

// uid: user primary id
// days: {firstday: any, lastday: any}
// periodicity: 주기성
const readTodoDatas = async (uid, days, periodicity) => {
  return query('selectBetweenTodos', uid, days, periodicity);
};

const createTodos = async (values) => {
  return query('createTodos', values);
};

const updateTodos = async (values) => {
  return query('updateTodos', values);
};

const deleteTodos = async (values) => {
  return query('deleteTodos', values);
};

module.exports = {
  readTodoDatasAll,
  readTodoDatas,
  createTodos,
  updateTodos,
  deleteTodos
};