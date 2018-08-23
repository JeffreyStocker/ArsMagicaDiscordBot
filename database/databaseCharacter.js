const PouchDB = require('pouchdb');
const path = require('path');
const db = {db() { return Promise.resolve(); } };
const Character = require(path.join(__dirname + '/../ars magica/Character'));
PouchDB.plugin(require('pouchdb-find'));

const defaultLocation = path.join(__dirname + '/characters');
const init = function (characterDatabaseLocation = defaultLocation) {
  db.db = new PouchDB (characterDatabaseLocation);
};

const create = function (char) {
  return new Promise ((resolve, revoke) => {
    db.db.post(char).then (result => {
      resolve (result.id);
    })
      .catch (err => {
        revoke (err);
      });
  });
};

const getChar = function (charId) {
  return db.db.get(charId)
    .then (charData => {
      return Promise.resolve (Character.import(charData));
    })
    .catch ( err => {
      Promise.reject(null);
      console.log (err);
    });
};


const setChar = function (charData) {
  return db.db.put(charData)
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
      return db.db.put(results);
    });
};

module.exports = {
  getChar,
  setChar,
  create,
  remove,
  init
};