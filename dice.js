
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

module.exports.sum = function (sumArray = []) {
  return sumArray.reduce((sum, val) => sum + val, 0);
}

module.exports.stresSum = function (sumArray = []) {
  var count = 1;
  var sum = 0;
  for (let val of sumArray) {
    if (val === 1) {
      count ++;
      sum += 10;
    } else {
      sum += val;
    }
  }
  sum = sum * Math.pow(count, 2);
  return (count * 5 > sum) ? (count * 5) : (sum);
}
