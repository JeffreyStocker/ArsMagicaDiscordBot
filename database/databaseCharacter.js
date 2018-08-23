var PouchDB = require('pouchdb');
var db = new PouchDB('./database/characters');
var Character = require('./ars magica/Character');

PouchDB.plugin(require('pouchdb-find'));

const create = function (char) {
  return new Promise ((resolve, revoke) => {
    db.post(char).then (result => {
      resolve (result.id);
    })
      .catch (err => {
        revoke (err);
      });
  });
};

const getChar = function (charId) {
  return db.get(charId)
    .then (charData => {
      return Promise.resolve (Character.import(charData));
    })
    .catch ( err => {
      Promise.revoke(null);
      console.log (err);
    });
};


const setChar = function (charData) {
  return db.put(charData)
    .then (result => {
      return Promise.resolve();
    })
    .catch ( err => {
      Promise.revoke(null);
      console.log (err);
    });
};

const remove = function (charId) {
  return getChar(charId)
    .then(results => {
      results._deleted = true;
      return db.put(results);
    });
};

module.exports = {
  getChar,
  setChar,
  create,
  remove

};