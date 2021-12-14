const db = require('../database');

const order = {

    getById: function(id, callback) {
        return db.query('SELECT * FROM order WHERE idorder=?', [id], callback);
      },
  
      getAll: function(callback) {
          return db.query('SELECT * FROM order', callback);
      },
  
      add: function(order, callback) {
          return db.query(
              'INSERT INTO order (eta, status, deliverylocation, cost ) VALUES(?,?,?,?)',
              [order.eta, order.status, order.deliverylocation, order.float], callback
          );
      },
  
      delete: function(id, callback) {
          return db.query('DELETE FROM order WHERE idorder=?', [id], callback);
        },
  
      update: function(id, order, callback) {
          return db.query(
            'UPDATE order SET eta=?, status=?, deliverylocation=?, cost=? WHERE idorder=?',
            [order.eta, order.status, order.deliverylocation, order.cost, id], callback
          );
      }

}

module.exports = order;