var PouchDB = require('pouchdb');
var db = new PouchDB('./database/users');
var moment = require('moment');
const User = require ('./Users');

PouchDB.plugin(require('pouchdb-find'));

const postUser = function (name, id) {
  var user = new User (name, id);
  return new Promise ((resolve, revoke) => {
    db.put(user)
      .then ((info) => {
        user._rev = info.rev;
        resolve(user);
      })
      .catch ( revoke(err) );
  });
};

const getUser = function (id) {
  return new Promise ((resolve, revoke) => {
    db.get(id)
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
    db.put(user).catch(err => {
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
  putUser,
};


const handleCollision = function (doc) {
  return new Promise ((resolve, revoke) => {
    db.get(doc._id).then(returnedDoc => {
      doc._rev = returnedDoc._rev;
      return db.put(doc);
    }).then (resolve)
      .catch(revoke);
  });
};