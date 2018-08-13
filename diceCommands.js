const { stress, botch, roll, simple, sum, stressSum } = require('./dice.js');
const { giveNotificationBack, rolledMessage, ...discordUtil } = require ('./dicordCommands');

const spreadArray = function (array) {
  return ('[' + array + ']');
}

var calcModifier = function (modArray) {
  var sum = 0;

  var calcModifierArthFunctions = {
    '+' (val) {
      sum += Number(val);
    },
    '-' (val) {
      sum -= Number(val);
    },
    '*' (val) {
      sum *= Number(val);
    },
    '/' (val) {
      sum /= Number(val);
    },
    '\\' (val) {
      sum /= Number(val);
    }
  };

  for (var i = 0; i < modArray.length; i+=2) {
    if (calcModifierArthFunctions.hasOwnProperty(modArray[i])) {
      calcModifierArthFunctions[modArray[i]] (modArray[i + 1]);
    }
  }
  return sum;
}


var modifierMessage = function (modifier) {
  return modifier ? '+' + modifier : '';
}

var stressMessage = function(roll, modifier) {
  var modifierMessage;
  if (roll === 'botch') {
    return 'You rolled a Zero! Roll For Botch!';
  }

  return spreadArray(roll) + modifierMessage(modifier) + ' = ' + stressSum(roll, modifier);
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
    rolledMessage(message, output);
  },



  simple (message, content) {
    var output = '';
    var count = Number(content[1]) + 1;
    if (content[1] && content[1] > 1) {
      for (var i = 1; i < count; i++) {
        output += i + '. ' + simple() + '\n';
      }
    }
    rolledMessage(message, output);
  },

  stress(message, content) {
    if (content[1] && content[1] > 1) {
      let rolls = [];
      for (count of new Array(Number(content[1]))) {
        // let roll = stress();
        rolls.push(stress());
      }
      let outGoingMessage = '';

      for (let [count, roll] of Object.entries(rolls)) {
        count++;
        outGoingMessage += count + '. ' + stressMessage(roll, calcModifier(content.slice(2))) + '\n';
      }
      console.log (outGoingMessage)
      rolledMessage(message, outGoingMessage);
    } else {
      let roll = stress();

      rolledMessage(message, stressMessage(roll, calcModifier(content.slice(2))));
    }
  },

  ping(message, content) {
    giveNotificationBack(message, 'pong!');
  },
}


