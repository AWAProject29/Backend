const db = require('../database');

const menu = {

    getById: function(id, callback) {
        return db.query('select * from menu where idmenu=?', [id], callback);
      },
  
      getAll: function(callback) {
          return db.query('SELECT * from menu', callback);
      },
  
      add: function(menu, callback) {
          return db.query(
              'insert into menu (productname, productprice, productdescription ) values(?,?)',
              [menu.productname, menu.productprice], callback
          );
      },
  
      delete: function(id, callback) {
          return db.query('delete from menu where idmenu=?', [id], callback);
        },
  
      update: function(id, menu, callback) {
          return db.query(
            'update menu set productname=?, productprice=?, productdescription=? where idmenu=?',
            [menu.productname, menu.productprice, id], callback
          );
      }

}

module.exports = menu;