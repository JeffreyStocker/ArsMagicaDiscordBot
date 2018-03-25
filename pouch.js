var PouchDB = require('pouchdb');
var db = new PouchDB('users');

module.exports = {
  getChar: function () {

  },

  getUser: function () {

  },

  setChar: function (userId, charData) {
    return db.put(userId, data)
  },

  setUser: function (userId, charData) {
    return db.put(userId, data)
  },
}