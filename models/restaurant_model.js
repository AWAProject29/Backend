const db = require('../database');

const restaurant = {

    getById: function(id, callback) {
        return db.query('select * from restaurant where idrestaurant=?', [id], callback);
      },
  
      getAll: function(callback) {
          return db.query('Select * from restaurant', callback);
      },
  
      add: function(restaurant, callback) {
          return db.query(
              'insert into restaurant (restaurantname, address, restauranttype, pricelevel, operatinghours, restaurantdescription) values(?,?,?,?,?,?)',
              [restaurant.restaurantname, restaurant.address, restaurant.restauranttype, restaurant.pricelevel, restaurant.operatinghours, restaurant.restaurantdescription], callback
          );
      },
  
      delete: function(id, callback) {
          return db.query('delete from restaurant where idrestaurant=?', [id], callback);
        },
  
      update: function(id, restaurant, callback) {
          return db.query(
            'update restaurant set restaurantname=?, address=?, restauranttype=?, pricelevel=?, operatinghours=?, restaurantdescription=? where idrestaurant=?',
            [restaurant.restaurantname, restaurant.address, restaurant.restauranttype, restaurant.pricelevel, restaurant.operatinghours, restaurant.restaurantdescription, id], callback
          );
      },


    //Add restaurant procedure
    addRestaurant: function(procedure_params, callback) {
        return db.query(
          'CALL addRestaurant (?,?,?,?,?,?,?)',
          [procedure_params.restaurantname, procedure_params.address, procedure_params.restauranttype, procedure_params.pricelevel, procedure_params.operatinghours, procedure_params.restaurantimage, procedure_params.restaurantdescription],
          callback
        );
    },

    //Search Restaurants procedure
    // searchRestaurant: function(procedure_params, callback){
    //       return db.query(
    //           'Call searchRestaurant(?)',
    //           [procedure_params.searchstring, callback]
    //       );
    // },

    // //Show Restaurant procedure
    // showRestaurants: function(callback) {
    //        return db.query('CALL showRestaurants()', callback);
    // }
}

module.exports = restaurant;