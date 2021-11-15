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
              'INSERT INTO menu (productname, productprice, productdescription ) VALUES(?,?)',
              [menu.productname, menu.productprice], callback
          );
      },
  
      delete: function(id, callback) {
          return db.query('DELETE FROM menu WHERE idmenu=?', [id], callback);
        },
  
      update: function(id, menu, callback) {
          return db.query(
            'UPDATE menu SET productname=?, productprice=?, productdescription=? WHERE idmenu=?',
            [menu.productname, menu.productprice, id], callback
          );
      }

}

module.exports = menu;