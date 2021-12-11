const db = require('../database');

const shoppingcart = {

      //AddProduct procedure
      addToCart: function(procedure_params, callback) {
        return db.query(
          'CALL addToCart (?,?,?,?,?)',
          [procedure_params.idshoppingcart, procedure_params.idshoppingcart, procedure_params.cartitemname, procedure_params.cartitemprice, procedure_params.cartitemamount],
          callback
        );
      },

      //AddProduct procedure
      removeFromCart: function(procedure_params, callback) {
        console.log("This is removeProduct at models: " + procedure_params);
        return db.query(
          'DELETE FROM product WHERE productid = ?', [procedure_params],
          callback
        );
      },

}

module.exports = shoppingcart;