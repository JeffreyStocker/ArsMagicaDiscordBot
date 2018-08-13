const { stress, botch, roll, simple, sum, stressSum } = require('./dice.js');
const { giveNotificationBack, rolledMessage, ...discordUtil } = require ('./dicordCommands');

const spreadArray = function (array) {
  return ('[' + array + ']');
}

var stressMessage = function(roll) {
  if (roll === 'botch') {
    return 'You rolled a Zero! Roll For Botch!';
  }
  return spreadArray(roll) + ' = ' + stressSum(roll);
}

module.exports = {
  botch (message, content) {
    var botchResults = botch(content[1]);
    var output = spreadArray (botchResults[0]) + '\n';
    if (botchResults[1] === 0) {
      output += 'No Botches!';
    } else {
      output += 'Oh No! You got ' + botchResults[1] + ' botches!';
    }
    message.channel.send(output);
  },

  create (message, content) {
    message.channel.send('yep');
    let name = content[1];
    let author = message.author.id;
    if (!name) {
      message.channel.send('Please include a name for your character');
    } else {
      let char = new Character (name);
      pouch.setChar(author, char)
      // .then(results => {
      //   console.log ('results', results);
      // })
      // .catch(err => {
      //   console.log (err);
      // });
    }
  },

  simple (message, content) {
    message.channel.send(simple());
  },

  stress(message, content) {
    // var rollResults = stress();
    // if (rollResults === 'botch') {
    //   message.channel.send('You rolled a Zero! \nRoll For Botch!');
    //   return;
    // }
    // message.channel.send(spreadArray(rollResults) + ' = ' + stressSum(rollResults));
    // console.log (rollResults);
    if (content[1] && content[1] > 1) {
      let rolls = [];
      for (count of new Array(Number(content[1]))) {
        // let roll = stress();
        rolls.push(stress());
      }
      let outGoingMessage = '';

      for (let roll of rolls) {
        outGoingMessage += stressMessage(roll) + '\n';
      }
      console.log (outGoingMessage)
      rolledMessage(message, outGoingMessage);
    } else {
      let roll = stress();

      rolledMessage(message, stressMessage(roll));
    }
  },

  ping(message, content) {
    giveNotificationBack(message, 'pong!');
  },

  list (message, content) {
    pouch.listCharacters(message.author.id)
    .then(data => {
      let output = '';
      for (let [index, character] of Object.entries(data)) {
        index = +index + 1;
        output += index + ': ' + character.name + '\n';
      }
      message.channel.send(output);
    })
  },
}

