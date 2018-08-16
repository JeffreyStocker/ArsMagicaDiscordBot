

const RollSequence = function (message, content, {
  processCommandsFunc = processRoll,
  processRolls = (val) => {
    var currentRolls = [];
    for (let i = 0; i < val.repeat; i++) {
      currentRolls.push(rollDice(1, val.diceSize, val.diceCount));
    }
    return currentRolls;
  },
  processSums = (rolls, index) => {
    return rolls.map((roll) => {
      return roll.reduce((sum, val) => {
        if (Array.isArray(val)) {
          return sum + val.reduce ((sum, val) => (sum + val), 0) + rollObj.processedCommands[index].modifier;
        } else {
          return sum + val + rollObj.processedCommands[index].modifier;
        }
      }, 0);
    }, 0);
  },
  adjustProcessedCommands = (val) => val,
  processMessages = (rolls, commandIndex) => {
    var command = rollObj.processedCommands[commandIndex];
    var mod = command.modifier;

    let totalSum = 0;
    return rolls.reduce((msg, roll, rollIndex) => {
      var rollSum = rollObj.sums[commandIndex][rollIndex];
      var rollMessage = msg + `${rollIndex + 1}: ${JSON.stringify(roll)}${printMod(mod)} = ${rollSum}\n`;
      totalSum += rollSum;

      if (command.repeat > 1) {
        return rollIndex + 1 !== rolls.length ? rollMessage : rollMessage + `Total = ${totalSum}`;
      }
      return rollMessage;
    }, `rolled ${rollObj.commands[commandIndex]}\n`);
  },
  sendMessages = messageStr => { giveNotificationBack(message, messageStr); }
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