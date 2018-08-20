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


const restoreCharacterFromDB = function (characterData) {
  characterData.__proto__ = Character.prototype;
  return characterData;
};


const findChar = function (charId) {
  return db.get(charId);
};


const setChar = function (charData) {
};

const remove = function (charId) {
  return findChar(charId)
    .then(results => {
      results._deleted = true;
      return db.put(results);
    });
};

module.exports = {
  findChar,
  setChar,
  create,
  remove

};