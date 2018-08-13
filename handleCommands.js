const { stress, botch, roll, simple, sum, stressSum } = require('./dice.js');

const spreadArray = function (array) {
  return ('[' + array + ']');
}

module.exports = {
  botchCommand (message) {
    var botchResults = botch(content[1]);
    var output = spreadArray (botchResults[0]) + '\n';
    if (botchResults[1] === 0) {
      output += 'No Botches!';
    } else {
      output += 'Oh No! You got ' + botchResults[1] + ' botches!';
    }
    message.channel.send(output);
  },

  create (message) {
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

  simple (message) {
    message.channel.send(simple());
  },

  stress(message) {
    var rollResults = stress();
    if (rollResults === 'botch') {
      message.channel.send('You rolled a Zero! \nRoll For Botch!');
      return;
    }
    message.channel.send(spreadArray(rollResults) + ' = ' + stressSum(rollResults));
    console.log (rollResults);
  },

  ping(message) {
    message.channel.send("pong!");
  },

  list (message) {
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