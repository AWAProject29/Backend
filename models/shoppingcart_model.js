const db = require('../database');

const shoppingcart = {

      getShoppingCartById: function(id, callback) {
        return db.query('SELECT * FROM shoppingcart WHERE idshoppingcart=?', [id], callback);
      },

      getAllShoppingCarts: function(callback) {
          return db.query('SELECT * FROM shoppingcart', callback);
      },

      //AddProduct procedure
      addToCart: function(procedure_params, callback) {
        return db.query(
          'CALL addToCart (?,?,?,?,?)',
          [procedure_params.idshoppingcart, procedure_params.idcartitem, procedure_params.cartitemname, procedure_params.cartitemprice, procedure_params.cartitemamount],
          callback
        );
      },

      addAmount: function(procedure_params, callback) {
          console.log("We're in addAmount function");
        return db.query(
          'UPDATE shoppingcart SET cartitemamount = cartitemamount+1 WHERE idcartitem = ?;',
          [procedure_params.idcartitem],
          callback
        );
      },

      //AddProduct procedure
      removeFromCart: function(procedure_params, callback) {
        console.log("We're in removeFromCart function");
        return db.query(
          'CALL decreaseAmount(?);',
          [procedure_params.idcartitem],
          callback
        );
      },

}

module.exports = shoppingcart;