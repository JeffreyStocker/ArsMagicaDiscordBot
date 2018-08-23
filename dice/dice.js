const _ = require('lodash');

const rollDice = function (lower = 0, upper = 9, count = 1, mod = 0) {
  var rollResults = [];
  for (let i = 0; i < count; i++) {
    rollResults.push(rollDie(lower, upper) + mod);
  }
  return rollResults;
};

const rollDie = function (lower = 1, upper = 1, mod = 0) {
  return Math.floor((Math.random() * upper) + lower) + mod;
};

const countBotch = function (rolls) {
  var botchCount = 0;
  for (let roll of rolls) {
    if (roll === 0) {
      botchCount++;
    }
  }
  return botchCount;
};


const rollBotch = function (numberOfDice) {
  var rollResults = rollDice(0, 9, numberOfDice);

  return [rollResults, countBotch(rollResults)];
};


const rollStress = function () {
  var rollResults = [rollDie(0, 9)];
  if (rollResults[0] === 0) { return 'botch'; }
  while (rollResults[rollResults.length - 1] === 1) {
    rollResults.push(rollDie(1, 10));
  }
  return rollResults;
};


const rollSimple = function () {
  return rollDie(1, 10);
};

const sum = function (sumArray = [], modfier = 0) {
  return sumArray.reduce((sum, val) => {
    val = Number (val);
    if (typeof val !== 'number') {
      return NaN;
    }
    return sum + val;
  }, 0) + modfier;
};

const stressSum = function (sumArray = [], modifier = 0) {
  var minimum = (sumArray.length) * 5;
  var calculated = _.last(sumArray) * Math.pow(2, sumArray.length - 1);
  if (sumArray.length === 1) {
    return sum(sumArray) + modifier;
  }

  return (minimum > calculated) ? minimum + modifier : calculated + modifier;
};


module.exports = {
  countBotch,
  rollDie,
  rollDice,
  rollBotch,
  rollStress,
  rollSimple,
  stressSum,
  sum,
};