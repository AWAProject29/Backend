const db = require('../database');

const customer = {

    getById: function(id, callback) {
      return db.query('select * from customer where idcustomer=?', [id], callback);
    },

    getAll: function(callback) {
        return db.query('SELECT * from customer', callback);
    },

    add: function(customer, callback) {
        return db.query(
            'insert into customer (firstname,lastname,email,password) values(?,?,?,?)',
            [customer.firstname, customer.lastname, customer.email, customer.password], callback
        );
    },

    delete: function(id, callback) {
        return db.query('delete from customer where idcustomer=?', [id], callback);
      },

    update: function(id, customer, callback) {
        return db.query(
          'update customer set firstname=?,lastname=?, email=?, password=? where idcustomer=?',
          [customer.etunimi, customer.lastname, customer.email, customer.password, id], callback
        );
    },

    //AddCustomer procedure work in progress.
    AddCustomer: function(procedure_params, callback) {
        return db.query(
          'CALL AddCustomer (?,?,?,?)',
          [procedure_params.firstname, procedure_params.lastname, procedure_params.email, procedure_params.pw],
          callback
        );

    }
};

module.exports = customer;
