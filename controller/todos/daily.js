const connection = require('../../models/DB');

/**
 * 
 * @param {*} uid 
 * uid: primary key
 * get user todo data's
 * 
 */

// Promise 처리
function readTodoDatas(uid) {
  return new Promise((reslove, reject) => {
    try {
      let query = connection.query('select * from todos where mem_id=?', [uid], (err, rows) => {
        if(err) throw err;
    
        return reslove(rows);
      });
    } catch(err) {
      return reject(err);
    }
  });
}

module.exports = {
  readTodoDatas,
}