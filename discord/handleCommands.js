const characterCommands = require ('./characterCommands');
const diceCommands = require('./diceCommands');

module.exports = {
  ...diceCommands,
  ...characterCommands
}


