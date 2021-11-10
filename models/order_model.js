const db = require('../database');

const order = {

    getById: function(id, callback) {
        return db.query('select * from order where idorder=?', [id], callback);
      },
  
      getAll: function(callback) {
          return db.query('SELECT * from order', callback);
      },
  
      add: function(order, callback) {
          return db.query(
              'insert into order (eta, status, deliverylocation, cost ) values(?,?,?,?)',
              [order.eta, order.status, order.deliverylocation, order.float], callback
          );
      },
  
      delete: function(id, callback) {
          return db.query('delete from order where idorder=?', [id], callback);
        },
  
      update: function(id, order, callback) {
          return db.query(
            'update order set eta=?, status=?, deliverylocation=?, cost=? where idorder=?',
            [order.eta, order.status, order.deliverylocation, order.cost, id], callback
          );
      }

}

module.exports = order;