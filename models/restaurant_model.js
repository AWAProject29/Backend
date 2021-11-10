const db = require('../database');

const restaurant = {

    getById: function(id, callback) {
        return db.query('select * from restaurant where idrestaurant=?', [id], callback);
      },
  
      getAll: function(callback) {
          return db.query('SELECT * from restaurant', callback);
      },
  
      add: function(restaurant, callback) {
          return db.query(
              'insert into restaurant (name, address, type, pricelevel, operatinghours, restaurantdescription) values(?,?,?,?,?,?)',
              [restaurant.name, restaurant.address, restaurant.type, restaurant.pricelevel, restaurant.operatinghours, restaurant.restaurantdescription], callback
          );
      },
  
      delete: function(id, callback) {
          return db.query('delete from restaurant where idrestaurant=?', [id], callback);
        },
  
      update: function(id, restaurant, callback) {
          return db.query(
            'update restaurant set name=?, address=?, type=?, pricelevel=?, operatinghours=?, restaurantdescription=? where idrestaurant=?',
            [restaurant.name, restaurant.address, restaurant.type, restaurant.pricelevel, restaurant.operatinghours, restaurant.restaurantdescription, id], callback
          );
      },

}

module.exports = restaurant;