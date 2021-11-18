const db = require('../database');

const product = {

    getById: function(id, callback) {
        return db.query('SELECT * FROM product WHERE productid=?', [id], callback);
      },
  
      getAll: function(callback) {
          return db.query('SELECT * FROM product', callback);
      },
  
      add: function(product, callback) {
        return db.query(
            'insert INTO product (productname, productprice, productdescription) VALUES(?,?,?)',
            [product.productname, product.productprice, product.productdescription], callback
        );
    },
  
      delete: function(id, callback) {
          return db.query('DELETE FROM product WHERE idproduct=?', [id], callback);
        },
  
      update: function(id, product, callback) {
          return db.query(
            'UPDATE product SET productname=?, productprice=?, productdescription=? WHERE productid=?',
            [product.productname, product.productprice, product.productdescription, id], callback
          );
      },


      //AddProduct procedure
      addProduct: function(procedure_params, callback) {
        return db.query(
          'CALL addProduct (?,?,?,?)',
          [procedure_params.productname, procedure_params.productprice, procedure_params.productdescription, procedure_params.productimage],
          callback
          
        );
      },

}

module.exports = product;