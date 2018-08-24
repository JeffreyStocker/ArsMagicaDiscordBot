const processCommandsFunc = (req, res, processFunc = processRoll) => {
  if (!processFunc) {
    processFunc = processRoll;
  } else if (typeof processFunc !== 'function') {
    throw new Error('Map function must be a function for mapping an array');
  }
  processFunc();
};


const processRolls = (req, res, mapFunc) => {
  if (!mapFunc) {
    mapFunc = (val) => {
      var currentRolls = [];
      for (let i = 0; i < val.repeat; i++) {
        currentRolls.push(rollDice(1, val.diceSize, val.diceCount));
      }
      return currentRolls;
    };
  } else if (typeof mapFunc !== 'function') {
    throw new Error('Map function must be a function for mapping an array');
  }
  res.rolls = res.processedCommands.map (mapFunc);
};


const processSums = (req, res, mapFunc ) => {
  if (!mapFunc) {
    mapFunc = (rolls, index) => {
      return rolls.map((roll) => {
        return roll.reduce((sum, val) => {
          if (Array.isArray(val)) {
            return sum + val.reduce ((sum, val) => (sum + val), 0) + res.processedCommands[index].modifier;
          } else {
            return sum + val + res.processedCommands[index].modifier;
          }
        }, 0);
      }, 0);
    };
  } else if (typeof mapFunc !== 'function') {
    throw new Error('Map function must be a function for mapping an array');
  }
  res.rolls.map(mapFunc);
};


const adjustProcessedCommands = (req, res, mapFunc) => {
  if (!mapFunc) {
    mapFunc = (val) => val;
  } else if (typeof mapFunc !== 'function') {
    throw new Error('Map function must be a function for mapping an array');
  }
  res.rolls = res.processedCommands.map (mapFunc);
};


const processMessages = (req, res, mapFunc) => {
  if (!mapFunc) {
    mapFunc = (rolls, commandIndex) => {
      var command = res.processedCommands[commandIndex];
      var mod = command.modifier;

      let totalSum = 0;
      return rolls.reduce((msg, roll, rollIndex) => {
        var rollSum = res.sums[commandIndex][rollIndex];
        var rollMessage = msg + `${rollIndex + 1}: ${JSON.stringify(roll)}${printMod(mod)} = ${rollSum}\n`;
        totalSum += rollSum;

        if (command.repeat > 1) {
          return rollIndex + 1 !== rolls.length ? rollMessage : rollMessage + `Total = ${totalSum}`;
        }
        return rollMessage;
      }, `rolled ${res.commands[commandIndex]}\n`);
    };
  } else if (typeof mapFunc !== 'function') {
    throw new Error('Map function must be a function for mapping an array');
  }
  res.messages = res.rolls.map();
};


const sendMessages = (req, res, forEachFunc) => {
  if (!forEachFunc) {
    forEachFunc = messageStr => { giveNotificationBack(req, messageStr); };
  } else if (typeof forEachFunc !== 'function') {
    throw new Error('Map function must be a function for mapping an array');
  }
  res.messages.forEach(forEachFunc);
};


const RollSequence = function (message, content, {
  processCommandsFunc = processCommandsFunc,
  processRolls = processRolls,
  processSums = processSums,
  adjustProcessedCommands = adjustProcessedCommands,
  processMessages = processMessages,
  sendMessages = sendMessages
} = {}) {

  var rollObj = {
    content: removeSpaces(content)
  };

  rollObj.commands = splitCommands(rollObj.content);
  rollObj.processedCommands = rollObj.commands.map(processCommandsFunc);
  rollObj.processedCommands = rollObj.processedCommands.map(adjustProcessedCommands); //allows for manual adjustment of commands
  rollObj.rolls = rollObj.processedCommands.map (processRolls);

  rollObj.sums = rollObj.rolls.map(processSums);

  rollObj.messages = rollObj.rolls.map(processMessages);

  rollObj.messages.forEach(sendMessages);
};


module.exports = RollSequence;