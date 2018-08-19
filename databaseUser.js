var PouchDB = require('pouchdb');
var db = new PouchDB('./database/users');
var moment = require('moment');

PouchDB.plugin(require('pouchdb-find'));


const getUser = function (id) {
  new Promise ((resolve, revoke) => {
    db.get(id)
      .then (resolve)
      .catch (err => {
        revoke(err);
      });
  });
};



module.exports = {
  getUser
};