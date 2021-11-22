const db = require('../database');
const bcrypt = require('bcryptjs');

const manager = {

    getById: function(id, callback) {
      return db.query('SELECT * FROM manager where idmanager=?', [id], callback);
    },

    getAll: function(callback) {
        return db.query('SELECT * FROM manager', callback);
    },

    add: function(procedure_params, callback) {
      return db.query('CALL addManager (?,?,?,?,?)',
      [procedure_params.firstname, procedure_params.lastname, procedure_params.email, procedure_params.pw, procedure_params.managerauthentication],
      callback)
    },

    delete: function(id, callback) {
        return db.query('DELETE FROM manager WHERE idmanager=?', [id], callback);
      },

    update: function(id, manager, callback) {
        return db.query(
          'UPDATE manager SET firstname=?,lastname=?, email=?, password=? WHERE idmanager=?',
          [manager.firstname, manager.lastname, manager.email, manager.password, id], callback
        );
    },

      //AddManager procedure
      addManager: function(procedure_params, callback) {
        
        // create hash of the password
        const salt = bcrypt.genSaltSync(6);
        const passwordHash = bcrypt.hashSync(procedure_params.password, salt);

        return db.query(
          'CALL addManager (?,?,?,?,?)',
          [procedure_params.firstname, procedure_params.lastname, procedure_params.email, passwordHash, procedure_params.managerauthentication],
          callback
          
        );
      }

}

module.exports = manager;