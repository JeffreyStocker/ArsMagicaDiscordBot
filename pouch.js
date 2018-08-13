var PouchDB = require('pouchdb');
var db = new PouchDB('users');
var moment = require('moment');

PouchDB.plugin(require('pouchdb-find'));

module.exports = {
  findBetweenTime: function(startTime = new Date(), endTime = new Date()) {
    return new Promise ((resolve, revoke) => {
      if (startTime.constructor.name !== 'Date' || endTime.constructor.name !== 'Date') { revoke(new Error('startTime and endTime must be Date Objects'))}
      if (startTime < endTime) {
        let temp = endTime;
        endTime = startTime;
        startTime = temp;
      }
      db.find({
        selector: {
          timeStamp: { $lte: startTime, $gte: endTime }
        }
      }, (err, docs) => {
        if (err) { revoke (err) }
        else { resolve(docs.docs) }
      });
    })
  },

  findBetweenTimePromise: function(startTime = new Date(), endTime = new Date()) {
    if (startTime.constructor.name !== 'Date' || endTime.constructor.name !== 'Date') { revoke(new Error('startTime and endTime must be Date Objects'))}
    if (startTime < endTime) {
      let temp = endTime;
      endTime = startTime;
      startTime = temp;
    }
    return db.find({
      selector: {
        timeStamp: { $lte: startTime, $gte: endTime }
      }
    })
  },

  insertAtTime: function (data) {
    return new Promise ((resolve, revoke) => {
      if (!data || typeof data !== 'object') { revoke(new Error ('Data to insert into database should be a object')); }
      data.timeStamp = new Date();
      db.post(data, (err, doc) => {
        if (err) {
          revoke(err);
        }
        resolve (doc);
      })
    })
  },

  getChar: function (userId, charName) {
    return new Promise((resolve, revoke) => {
      if (!userId || !charName) { revoke (new Error ('userId and charName must be supplied')); }
      module.exports.getUser(userId)
      .then(( docs ) => {

        var character;
        if (!docs || docs.length === 0) { resolve (null); }
        characters = docs.characters;
        if (!characters) { resolve (null); }
        resolve(characters.find( char => {
          if (char.name === charName) { return true }
          return false;
        }));
      })
      .catch (err => {
        revoke(err);
      });
    })
  },

  getUser: function (_id) {
    return db.get(_id);
  },

  findUser: function (_id) {
    return db.find( {selector: {userId: _id}} )
  },

  setChar: function (userId, charData) {
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
      return db.put(userData)
    })
    .then(results => {
      console.log (results)
    })
    .catch(err => {
      console.log (err)
    });
  },

  listCharacters (userId) {
    return new Promise ((resolve, revoke) => {
      module.exports.getUser(userId)
      .then(userData => {
        resolve(userData.characters);
       })
      .catch(err => { revoke(err); });
    });
  },

  setUser: function (userId, charData) {
    return db.put(userId, data)
  },


  count: function (){
    return db.info();
  },

  allDocs: function () {
    return db.allDocs({});
  }
}

// module.exports.count().then(data => console.log(data))

var test = async function () {
  try {
    var response = await db.put({
      _id: 'George',
      characters: [
        {name: 'Grog', type: 'warrior'}
      ]
    });
  } catch (err) {
    console.log(err);
  }
}


// test()

// module.exports.insertAtTime({type: 'test'})

// var mom = new moment().subtract(0, 'd')
// module.exports.findBetweenTime(new Date(0), mom.toDate())
// .then(doc => {
//   console.log ('doc', doc)
// })
// .catch(err => {
//   console.log ('err', err)
// });

// module.exports.getChar('George', 'Grog')
// .then(doc => {
//   console.log (doc)
// })