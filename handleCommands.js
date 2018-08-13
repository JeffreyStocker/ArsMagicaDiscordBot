const { stress, botch, roll, simple, sum, stressSum } = require('./dice.js');
const { giveNotificationBack, rolledMessage, ...discordUtil } = require ('./dicordCommands');
const characterCommands = require ('./characterCommands');


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
  ... characterCommands
}


