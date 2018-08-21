const pouch = require('./pouch.js');
const Character = require('./ars magica/Character');
const characterDb = require ('./databaseCharacter');
const userDb = require ('./databaseUser');
const discordCommands = require ('./dicordCommands');
const User = require('./Users');

module.exports = {
  list (message, content) {
    // pouch.listCharacters(message.author.id)
    //   .then(data => {
    //     let output = '';
    //     for (let [index, character] of Object.entries(data)) {
    //       index = +index + 1;
    //       output += index + ': ' + character.name + '\n';
    //     }
    //     message.channel.send(output);
    //   });
    userDb.getUser(message.author.id)
      .catch (err => {
        if (err === null) {
          console.log ('user not found, now creating');
          var user = new User(message.author.name, message.author.id);
          return userDb.putUser(user);
        }
      })
      .then (user => {
        var characters = user.listChars();
        var reply = '\n';
        if (characters.length === 0) {
          discordCommands.reply(message, 'You do not have any characters');
        } else {
          for (let [index, char] of Object.entries(characters)) {
            reply += Number(Number(index) + 1) + `: ${char}\n`;
          }
          discordCommands.reply(message, reply);
        }
      })
      .catch (err => {
        console.log (err);
      });
  },

  create (message, content) {
    var charId;
    let name = content;
    let author = message.author.id;
    if (!name) {
      message.channel.send('Please include a name for your character');
    } else {
      let char = new Character (name, author);

      characterDb.create(char)
        .then(id => {
          charId = id;
          return userDb.getUser(author);
        })
        .catch (console.error)
        .then( user => {
          user.characters.push ([name, charId]);
          return userDb.putUser(user);
        })
        .then (result => {
          discordCommands.reply(message, `New Character: ${char.name} was created`);
        })
        .catch (err => {
          discordCommands.reply(message, `${char.name} failed to create`);
          console.error(err);
        });
    }
  },

  remove(message, indexOrChar) {
    var char;

    userDb.getUser(message.author.id)
      .then (user => {
        char = user.getChar(indexOrChar);
        if (!char) { throw new Error ('Invalid Character Selection'); }
        user.removeCharByName(char[0]);
        if (char[1] === user.currentChar[1]) {
          user.currentChar = null;
        }
        return Promise.all([userDb.putUser(user), characterDb.remove(char[1])]);
      })
      .then(results => {
        discordCommands.reply(message, char[0] + ' was deleted');
      })
      .catch(err => {
        console.error(err);
        discordCommands.reply (message, 'there was an error! ' + err.message);
      });
  },

  select (message, indexOrChar) {
    var char;
    userDb.getUser(message.author.id).then (user=> {
      char = user.setCurrentChar(indexOrChar);
      if (char === null) {
        discordCommands.giveNotificationBack(message, ' Invalid Selection');
        return Promise.reject('break');
      }
      return userDb.putUser(user);
    })
      .then (results => {
        discordCommands.giveNotificationBack(message, 'You have selected: ' + char[0]);
      })
      .catch (err => {
        if (err === 'break') { return; }
        console.log (err);
      });
  },

  selected (message) {
    userDb.getUser(message.author.id).then (user=> {
      var selected = user.getCurrentChar();
      if (selected === null) {
        discordCommands.giveNotificationBack(message, ' No Character Selected');
        return Promise.reject('break');
      }
      discordCommands.giveNotificationBack(message, ' You have ' + selected[0] + ' selected');
    })
      .catch (err => {
        if (err === 'break') { return; }
        console.log (err);
      });
  },

  set(message, attribuesStr) {
    var parsedAttributes = attribuesStr.split(' ');
    getCurrentChar(message.author.id)
      .then ((currentChar) => {
        return characterDb.findChar(currentChar[1]);
      })
      .then(char => {
        var success = [];
        var fail = [];
        for (let valIndex = 1, statNameIndex = 0; statNameIndex < parsedAttributes.length; val++, statNameIndex++) {
          var [stat, val] = [parsedAttributes[statNameIndex], parsedAttributes[valIndex]];
          var setResult = char.set(stat, val);
          setResults === null ? fail.push(stat) : success.push(stat);
        }
        // return characterDb.setChar(char);
      })
      .then (results => {
        discordCommands.giveNotificationBack(message, selected[0] + ' has been updated sucessfully');
      })
      .catch (err => {
        if (err === null) {
          return discordCommands.giveNotificationBack(message, ' No Character Selected');
        }
        console.log (err);
      });

  },

  stats(message) {
    getCurrentChar(message.author.id)
      .then (currentChar => {
        return characterDb.findChar(currentChar[1]);
      })
      .then(char => {
        var statOutput, techOutputs, formOutputs, attribOutputs;
        techOutputs = reduceToKeyValStringWithComma(char.techniques);
        formOutputs = reduceToKeyValStringWithComma(char.forms);
        attribOutputs = reduceToKeyValStringWithComma(char.attributes);
        statOutput = `: ${char.name} statistics are:
        Techniques: ${techOutputs}
        Forms: ${formOutputs}
        Attributes: ${attribOutputs}`;

        discordCommands.giveNotificationBack(message, statOutput);
      })
      .catch (err => {
        if (err === null) {
          return discordCommands.giveNotificationBack(message, ' No Character Selected');
        }
        console.log (err);
      });
  }

};

const getCurrentChar = function getCurrentChar (id) {
  return new Promise ((resolve, revoke) => {
    userDb.getUser(id).then (user=> {
      resolve(user.getCurrentChar());
    })
      .catch (err => {
        if (err.status === 404) { return revoke(null); }
        revoke(err);
      });
  });
};


const reduceToKeyValStringWithComma = function (targetObject, seperator = ', ') {
  return Object.entries(targetObject).reduce((msgStr, [key, val]) => {
    return msgStr + `${key}: ${val}${seperator}`;
  }, '');
};