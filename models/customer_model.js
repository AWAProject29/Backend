const db = require('../database');
const bcrypt = require('bcryptjs');

const customer = {

    getById: function(id, callback) {
      return db.query('SELECT * FROM customer WHERE idcustomer=?', [id], callback);
    },

    getAll: function(callback) {
        return db.query('SELECT * FROM customer', callback);
    },

    delete: function(id, callback) {
        return db.query('DELETE FROM customer WHERE idcustomer=?', [id], callback);
      },

    update: function(id, customer, callback) {
        return db.query(
          'UPDATE customer SET firstname=?,lastname=?, email=?, password=?, address=? WHERE idcustomer=?',
          [customer.firstname, customer.lastname, customer.email, customer.password, customer.address, id], callback
        );
    },

    //AddCustomer procedure
    addCustomer: function(procedure_params, callback) {

      // create hash of the password
      const salt = bcrypt.genSaltSync(6);
      const passwordHash = bcrypt.hashSync(procedure_params.password, salt);
      
        return db.query(
          'CALL addCustomer (?,?,?,?,?)',
          [procedure_params.firstname, procedure_params.lastname, procedure_params.email, passwordHash, procedure_params.address],
          callback
        );
    },

    checkAccount: function(procedure_params, callback) {
        return db.query(
          'CALL checkAccount (?,?)',
          [procedure_params.email, procedure_params.password],
          callback
        );
    }
  
};


module.exports = customer;
