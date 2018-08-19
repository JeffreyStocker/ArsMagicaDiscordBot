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


const setChar = function (userId, charData) {
  var userData;
  db.get(userId)
    .catch(err => {
      if (err.status === 404) {
        charData.index = 0;
        return db.put({
          _id: userId,
          characters: [charData]
        });
      }
      console.log (err);
    })
    .then(userData => {
      if (!charData.index) {
        charData.index = userData.characters.length;
        userData.characters.push(charData);
      } else {
        userData.characters[charData.index];
      }
      return db.put(userData);
    })
    .then(results => {
      console.log (results);
    })
    .catch(err => {
      console.log (err);
    });
};

module.exports = {
  findChar,
  setChar

};