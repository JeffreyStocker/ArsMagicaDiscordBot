const PouchDB = require('pouchdb');
const path = require ('path');
const db = {db() { return Promise.resolve(); } };
// const moment = require('moment');
const User = require (path.join (__dirname + '/../Users'));

PouchDB.plugin(require('pouchdb-find'));

const defaultLocation = path.join(__dirname + '/users');
const init = function (characterDatabaseLocation = defaultLocation) {
  db.db = new PouchDB (characterDatabaseLocation);
};

const postUser = function (name, id) {
  var user = new User (name, id);
  return new Promise ((resolve, revoke) => {
    db.db.put(user)
      .then ((info) => {
        user._rev = info.rev;
        resolve(user);
      })
      .catch ( revoke(err) );
  });
};

const getUser = function (id) {
  return new Promise ((resolve, revoke) => {
    db.db.get(id)
      .then (user => {
        resolve(User.import(user));
      })
      .catch (err => {
        if (err.status === 404) {
          return revoke(null);
        }
        return revoke(err);
      });
  });
};

const putUser = function (user) {
  return new Promise ((resolve, revoke) => {
    db.db.put(user).catch(err => {
      if (err.status === 409) {
        return handleCollision(user);
      }
    }).then (results => {
      user._id = results.id;
      user._rev = results.rev;
      resolve(user);
    })
      .catch (err => {
        revoke(err);
      });
  });
};


module.exports = {
  getUser,
  init,
  putUser,
};


const handleCollision = function (doc) {
  return new Promise ((resolve, revoke) => {
    db.db.get(doc._id).then(returnedDoc => {
      doc._rev = returnedDoc._rev;
      return db.db.put(doc);
    }).then (resolve)
      .catch(revoke);
  });
};