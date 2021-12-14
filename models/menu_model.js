const db = require('../database');

const menu = {

    getById: function(id, callback) {
        return db.query('SELECT * FROM menu where idmenu=?', [id], callback);
      },
  
      getAll: function(callback) {
          return db.query('SELECT * FROM menu', callback);
      },
  
      add: function(menu, callback) {
          return db.query(
              'INSERT INTO menu (menudescription) VALUES(?)',
              [menu.menudescription], callback
          );
      },
  
      delete: function(id, callback) {
          return db.query('DELETE FROM menu WHERE idmenu=?', [id], callback);
        },
  
      update: function(id, menu, callback) {
          return db.query(
            'UPDATE menu SET menudescription WHERE idmenu=?',
            [menu.menudescription, id], callback
          );
      },

        //AddMenu procedure
        addMenu: function(procedure_params, callback) {
            return db.query(
              'CALL addMenu (?)',
              [procedure_params.menudescription], callback           
            );
        },
}

module.exports = menu;