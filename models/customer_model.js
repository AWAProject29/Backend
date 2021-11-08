const db = require('../database');

const customer = {

    getById: function(id, callback) {
      return db.query('select * from asiakas where id_asiakas=?', [id], callback);
    },

    getAll: function(callback) {
        return db.query('SELECT * from customer');
    },

    add: function(customer, callback) {
        return db.query(
            'insert into customer (firstname,lastname,email,password) values(?,?,?,?)',
            [customer.firstname, customer.lastname, customer.email, customer.password], callback
        );
    },

    delete: function(id, callback) {
        return db.query('delete from customer where id_customer=?', [id], callback);
      },

    update: function(id, customer, callback) {
        return db.query(
          'update customer set firstname=?,lastname=?, email=?, password=? where id_asiakas=?',
          [customer.etunimi, customer.lastname, customer.email, customer.password, id], callback
        );
    },

    //AddCustomer procedure work in progress.
    AddCustomer: function(procedure_params, callback) {
        return db.query(
          'CALL AddCustomer (?,?)',
          [procedure_params.id,],
          callback
        );

    }
};

module.exports = customer;
