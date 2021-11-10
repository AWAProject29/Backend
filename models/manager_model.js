const db = require('../database');

const manager = {

    getById: function(id, callback) {
      return db.query('select * from manager where idmanager=?', [id], callback);
    },

    getAll: function(callback) {
        return db.query('SELECT * from manager', callback);
    },

    add: function(manager, callback) {
        return db.query(
            'insert into manager (firstname,lastname,email,password) values(?,?,?,?)',
            [manager.firstname, manager.lastname, manager.email, manager.password], callback
        );
    },

    delete: function(id, callback) {
        return db.query('delete from manager where idmanager=?', [id], callback);
      },

    update: function(id, manager, callback) {
        return db.query(
          'update manager set firstname=?,lastname=?, email=?, password=? where idmanager=?',
          [manager.etunimi, manager.lastname, manager.email, manager.password, id], callback
        );
    }

};

module.exports = manager;