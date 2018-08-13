const _ = require('lodash');

module.exports.rolls = rolls = function (lower = 0, upper = 9, count = 1, mod = 0) {
  var rollResults = [];
  for (let i = 0; i < count; i++) {
    rollResults.push(module.exports.roll(lower, upper) + mod);
  }
  // console.log(rollResults)
  return rollResults;
}

module.exports.roll = function (lower = 1, upper = 1, mod = 0) {
  return Math.floor((Math.random() * upper) + lower) + mod;
}

module.exports.countBotch = countBotch = function (rolls) {
  var botchCount = 0;
  for (let roll of rolls) {
    if (roll === 0) {
      botchCount++;
    }
  }
  return botchCount;
}


module.exports.botch = function (numberOfDice) {
  var rollResults = rolls(0, 9, numberOfDice);

  return [rollResults, countBotch(rollResults)];
}


module.exports.stress = function () {
  var rollResults = [module.exports.roll(0, 9)];
  if (rollResults[0] === 0) { return 'botch'; }
  while (rollResults[rollResults.length -1 ] === 1){
    rollResults.push(module.exports.roll(1, 10));
  }
  return rollResults;
}


module.exports.simple = function () {
  return module.exports.roll(1, 10);
}

module.exports.sum = function (sumArray = [], modfier = 0) {
  return sumArray.reduce((sum, val) => {
    val = Number (val);
    if (typeof val !== 'number') {
      return NaN;
    }
    return sum + val;
  }, 0) + modfier;
}

module.exports.stressSum = function (sumArray = [], modifier = 0) {
  var minimum = (sumArray.length) * 5;
  var calculated = _.last(sumArray) * Math.pow(2, sumArray.length - 1);
  if (sumArray.length === 1) {
    return module.exports.sum(sumArray) + modifier;
  }

  return (minimum > calculated) ? minimum + modifier : calculated + modifier;
}
