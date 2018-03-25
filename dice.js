
module.exports.roll = roll = function (number = 1, size = 1, mod = 0) {
  var results = [];
  for (let i = 0; i < number; i++) {
    results.push(Math.floor((Math.random() * size) + 1 + mod));
  }
  // console.log(results)
  return results;
}

module.exports.countBotch = countBotch = function (rolls) {
  var botchCount = 0;
  for (let roll of rolls) {
    if (roll === 0) {
      botchCount++;
    }
  }
  return botchCount
}


module.exports.botch = function (numberOfDice) {
  var rolls = roll(numberOfDice, 10, -1);

  return [rolls, countBotch(rolls)];
}


module.exports.stress = function () {
  return roll(1, 10, -1)
}


module.exports.simple = function () {
  return roll(1, 10);
}