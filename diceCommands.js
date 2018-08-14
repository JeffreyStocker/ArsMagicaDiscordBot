const { stress, botch, roll, simple, sum, stressSum } = require('./dice.js');
const { giveNotificationBack, rolledMessage, ...discordUtil } = require ('./dicordCommands');

const spreadArray = function (array) {
  return ('[' + array + ']');
}

const removeSpaces = function (rollString) {
  rollString.trim();
  rollString.replace (' ', '');
  return rollString;
}

const returnModifier = function returnModifier (rollString) {
  let add = rollString.match(/\+[0-9]*/g);
  let sub = rollString.match(/\-[0-9]*/g);

  add = add === null ? 0 : add.reduce((sum, val) => ( sum + Number(val) ), 0);
  sub = sub === null ? 0 : sub.reduce((sum, val) => ( sum + Number(val) ), 0);

  return add + sub;
}

const processRoll = function processRoll (content) {
  var output = {
    modifier: returnModifier(content),
    diceCount: content.match(/^\d*/)[0] || 1
  };

  let diceSize = content.match(/(d\d*)/)[0] || 1;
  if (diceSize === null) {
    return null;
  } else {
    output.diceSize = diceSize.slice(1);
  }

  return output;
}

console.log (processRoll ('1d4+5+10-3-10-99+11'))

const processStressContent = function processStressContent (content = 1) {
  var reg = /[+,-]/g;
  content = removeSpaces(content);
  let newContent = content.replace (reg, (match, offset, string) => {
    return '|*|' + match + '|*|';
  });

  newContent = newContent.split('|*|').map((el) => (isNaN(Number(el)) ? el : Number(el)));

  if (newContent[0] === '' || newContent[0] === 0 ) {
    newContent[0] = 1;
  }
  console.log ('processStressContent', newContent)
  return newContent;
}

const arthmatic = [ '+', '-', '*', '/'];


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
  if (isNaN(sum)) {
    return 0;
  }
  return sum;
}


var modifierMessage = function (modifier) {
  return modifier ? '+' + modifier : '';
}


var stressMessage = function(roll, modifier) {
  if (roll === 'botch') {
    return 'You rolled a Zero! Roll For Botch!';
  }

  return spreadArray(roll) + modifierMessage(modifier) + ' = ' + stressSum(roll, modifier);
}


module.exports = {
  botch (message, content) {
    var botchResults = botch(content === '' ? 1: content);
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
    var count, modifier;
    var processed = processStressContent(content);

    count = Number(processed[0]);
    modifier = calcModifier(processed.slice(1));

    console.log ('mod', modifier)
    let outGoingMessage = '';

    for (let i = 0; i < count; i++) {
      outGoingMessage += i + 1 + '. ' + stressMessage(stress(), modifier) + '\n';
    }
    console.log (outGoingMessage)
    rolledMessage(message, outGoingMessage);
  },


  ping(message, content) {
    giveNotificationBack(message, 'pong!');
  },
}


