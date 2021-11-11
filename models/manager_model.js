const db = require('../database');

const manager = {

    getById: function(id, callback) {
      return db.query('select * from manager where idmanager=?', [id], callback);
    },

    getAll: function(callback) {
        return db.query('SELECT * from manager', callback);
    },

    delete: function(id, callback) {
        return db.query('delete from manager where idmanager=?', [id], callback);
      },

    update: function(id, manager, callback) {
        return db.query(
          'update manager set firstname=?,lastname=?, email=?, password=? where idmanager=?',
          [manager.etunimi, manager.lastname, manager.email, manager.password, id], callback
        );
    },

      //AddManager procedure
      AddManager: function(procedure_params, callback) {
        return db.query(
          'CALL AddManager (?,?,?,?,?)',
          [procedure_params.firstname, procedure_params.lastname, procedure_params.email, procedure_params.pw, procedure_params.managerauthentication],
          callback
          
        );
      },

      //Show Manager procedure
      ShowManager: function(callback) {
        return db.query(
          'CALL ShowManager()', callback
        )
      }


}

module.exports = manager;