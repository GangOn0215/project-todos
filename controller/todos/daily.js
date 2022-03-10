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
}

const readTodoDatas = async (uid) => {
  return query('selectTodos', uid);
}

const createTodos = async (values) => {
  return query('createTodos', values);
}

const updateTodos = async (values) => {
  return query('updateTodos', values);
}

const deleteTodos = async (values) => {
  return query('deleteTodos', values);
}

module.exports = {
  readTodoDatasAll,
  readTodoDatas,
  createTodos,
  updateTodos,
  deleteTodos
}