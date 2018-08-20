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
        return userDb.putUser(user);
      })
      .then (results => {
        return characterDb.remove(char[1]);
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

  }

};