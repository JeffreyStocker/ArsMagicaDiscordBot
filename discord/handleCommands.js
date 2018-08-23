const path = require ('path');
const characterCommands = require (path.join(__dirname + '/characterCommands'));
const diceCommands = require(path.join(__dirname + '/diceCommands'));

module.exports = {
  ...diceCommands,
  ...characterCommands
};


