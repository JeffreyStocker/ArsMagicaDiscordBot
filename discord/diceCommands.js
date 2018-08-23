const inspect = require('util').inspect;
const { rollStress, rollBotch, rollDie, rollDice, rollSimple, sum, stressSum } = require('./dice.js');
const discordCommands = require ('./dicordCommands');
const { giveNotificationBack, rolledMessage } = discordCommands;


const spreadArray = function (array) {
  return ('[' + array + ']');
};

const removeSpaces = function (rollString) {
  rollString.trim();
  rollString.replace (' ', '');
  return rollString;
};

const returnModifier = function returnModifier (rollString) {
  let add = rollString.match(/\+[0-9]*/g);
  let sub = rollString.match(/\-[0-9]*/g);

  add = add === null ? 0 : add.reduce((sum, val) => ( sum + Number(val) ), 0);
  sub = sub === null ? 0 : sub.reduce((sum, val) => ( sum + Number(val) ), 0);

  return add + sub;
};

const removeFirstLetter = function (str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.slice(1);
};

const returnFirstValOrDefaultIfNull = function returnFirstValOrDefaultIfNull(val, def = 1) {
  return val === null ? def : val[0];
};

const handleDiceMod = function (diceString, regStr, def) {
  return Number(removeFirstLetter(returnFirstValOrDefaultIfNull(diceString.match(regStr), def )));
};

const processRoll = function processRoll (content) {
  var output;
  content = removeSpaces(content);
  output = {
    modifier: Number(returnModifier(content)),
    diceCount: Number(returnFirstValOrDefaultIfNull(content.match(/^\d+/) )),
    diceSize: handleDiceMod(content, (/(d\d+|ds|ds)/), 'd1' ),
    repeat: handleDiceMod(content, /(x[0-9]+)/),
    explode: handleDiceMod(content, /(e[0-9]+)/, undefined),
    stress: handleDiceMod(content, /(s[0-9]+)/, undefined),
    botch: handleDiceMod(content, /(b[0-9]+)/, undefined),
  };
  if (output.diceSize === 0) {
    // [output.diceSize, output.diceCount, output.repeat] = [1, 1, output.diceCount + (output.repeat === 1 ? 0 : output.repeat)];
  }
  return output;
};

// console.log (processRoll ('1d4+5+10-3-10-99+11'))

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
  console.log ('processStressContent', newContent);
  return newContent;
};

const splitCommands = function (commandStr) {
  return commandStr.split(',');
};


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

  for (var i = 0; i < modArray.length; i += 2) {
    if (calcModifierArthFunctions.hasOwnProperty(modArray[i])) {
      calcModifierArthFunctions[modArray[i]] (modArray[i + 1]);
    }
  }
  if (isNaN(sum)) {
    return 0;
  }
  return sum;
};


var modifierMessage = function (modifier) {
  return modifier ? '+' + modifier : '';
};


var stressMessage = function(roll, modifier) {
  if (roll === 'botch') {
    return 'You rolled a Zero! Roll For Botch!';
  }

  return spreadArray(roll) + modifierMessage(modifier) + ' = ' + stressSum(roll, modifier);
};


module.exports = {
  botch (message, content) {
    var botchResults = rollBotch(content === '' ? 1 : content);
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

    for (var i = 1, stop = isNaN(count) ? 1 : count; i < stop + 1; i++) {
      output += i + '. ' + rollSimple() + '\n';
    }

    rolledMessage(message, output);
  },


  stressBackup(message, content) {
    var count, modifier;
    var processed = processStressContent(content);

    count = Number(processed[0]);
    modifier = calcModifier(processed.slice(1));

    console.log ('mod', modifier);
    let outGoingMessage = '';

    for (let i = 0; i < count; i++) {
      outGoingMessage += i + 1 + '. ' + stressMessage(rollStress(), modifier) + '\n';
    }
    console.log (outGoingMessage);
    rolledMessage(message, outGoingMessage);
  },

  stress(message, content) {
    var rollObj = {
      content: removeSpaces(content)
    };
    rollObj.commands = splitCommands(rollObj.content);
    rollObj.processedCommands = rollObj.commands.map( val => {
      let processed = processRoll (val);
      processed.diceSize = 10;
      return processed;
    });

    rollObj.rolls = rollObj.processedCommands.map (val => {
      var currentRolls = [];
      for (let i = 0; i < val.repeat; i++) {
        let rolls = rollDice(1, val.diceSize, val.diceCount);

        currentRolls.push(rolls.map(rollVal => {
          if (rollVal === 1) {
            let explosion = [1];
            let current = 1;
            while (current === 1) {
              current = rollDie(1, val.diceSize);
              explosion.push(current);
            }
            return explosion;
          } else if (rollVal === 10) {
            return 'botch';
          }
          return rollVal;
        }));
      }
      return currentRolls;
    });

    rollObj.sums = rollObj.rolls.map((rolls, index) => {
      return rolls.map((roll) => {
        return roll.reduce((sum, val) => {
          if (val === 'botch' || sum === 'botch') {
            return 'botch';
          }
          if (Array.isArray(val)) {
            return sum + stressSum(val) + rollObj.processedCommands[index].modifier;
          } else {
            return sum + val + rollObj.processedCommands[index].modifier;
          }
        }, 0);
      }, 0);
    });

    rollObj.messages = rollObj.rolls.map((rolls, commandIndex) => {
      var command = rollObj.processedCommands[commandIndex];
      var mod = command.modifier;
      var totalSum = 0;
      var hasBotch = false;

      var msg = rolls.reduce((msg, roll, rollIndex) => {
        var rollMessage;
        var rollSum = rollObj.sums[commandIndex][rollIndex];
        rollMessage = msg + `**${rollIndex + 1}**: ${JSON.stringify(roll)}${printMod(mod)} = ${rollSum}\n`;

        if (rollSum === 'botch') {
          hasBotch = true;
        } else {
          totalSum += rollSum;
        }

        if (command.repeat > 1) {
          return rollIndex + 1 !== rolls.length ? rollMessage : rollMessage + `**Total** = ${totalSum}`;
        }
        return rollMessage;
      }, `rolled :game_die: Stress! ${rollObj.commands[commandIndex]}\n`);
      return hasBotch ? msg + ' & You rolled a Zero! Roll For **Botch**!' : msg;
    });

    rollObj.messages.forEach(messageStr => { giveNotificationBack(message, messageStr); });
    console.log (rollObj);
  },


  ping(message, content) {
    giveNotificationBack(message, 'pong!');
  },

  rollBackup (message, content) {
    var rolls = [];
    var rollObj = processRoll(content);
    let x = 0;
    var output = '';

    while (x < rollObj.diceCount) {
      x++;
      rolls.push(rollDie(1, rollObj.diceSize));
    }
    let rollResult = rolls.reduce ((sum, val) => (sum + val), 0);

    let sum = rollResult + rollObj.modifier;
    output += `[${rolls}]${printMod(rollObj.modifier)} = ${sum}\n`;
    console.log (rollObj);
    rolledMessage(message, output);
  },

  roll (message, content) {
    var rollObj = {
      content: removeSpaces(content)
    };
    rollObj.commands = splitCommands(rollObj.content);
    rollObj.processedCommands = rollObj.commands.map(processRoll);
    rollObj.rolls = rollObj.processedCommands.map (val => {
      var currentRolls = [];
      for (let i = 0; i < val.repeat; i++) {
        currentRolls.push(rollDice(1, val.diceSize, val.diceCount));
      }
      return currentRolls;
    });

    rollObj.sums = rollObj.rolls.map((rolls, index) => {
      return rolls.map((roll) => {
        return roll.reduce((sum, val) => {
          if (Array.isArray(val)) {
            return sum + val.reduce ((sum, val) => (sum + val), 0) + rollObj.processedCommands[index].modifier;
          } else {
            return sum + val + rollObj.processedCommands[index].modifier;
          }
        }, 0);
      }, 0);
    });

    rollObj.messages = rollObj.rolls.map((rolls, commandIndex) => {
      var command = rollObj.processedCommands[commandIndex];
      var mod = command.modifier;

      let totalSum = 0;
      return rolls.reduce((msg, roll, rollIndex) => {
        var rollSum = rollObj.sums[commandIndex][rollIndex];
        var rollMessage = msg + `**${rollIndex + 1}**: ${JSON.stringify(roll)}${printMod(mod)} = ${rollSum}\n`;
        totalSum += rollSum;

        if (command.repeat > 1) {
          return rollIndex + 1 !== rolls.length ? rollMessage : rollMessage + `**Total** = ${totalSum}`;
        }
        return rollMessage;
      }, `rolled :game_die: ${rollObj.commands[commandIndex]}\n`);
    });

    rollObj.messages.forEach(messageStr => { giveNotificationBack(message, messageStr); });


    console.log(inspect(rollObj, { depth: 4 }));
  }

};


const printMod = function printMod (modifier) {
  if (modifier === 0) {
    return '';
  } else if (modifier > 0) {
    return '+' + modifier;
  } else if (modifier < 0) {
    return String(modifier);
  }
};

const getRolls = function (count, diceSize) {
  var rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(rollDie(1, diceSize));
  }
  return rolls;
};

const printRolls = function (rolls) {

};