const dotenv = require ('dotenv').config();
const path = require('path');

require(path.join(__dirname + '/database/databaseUser')).init();
require(path.join(__dirname + '/database/databaseCharacter')).init();

const discord = require (path.join(__dirname + '/discord/discord.js'));

process.stdin.resume();

var exitFunction = function (level, restart = false) {
  console.log('exiting at level:', level);
  client.destroy()
    .then (() => {
      restart ? process.kill(process.pid, 'SIGUSR2') : process.exit();
    });
};

process.on('SIGUSR1', exitFunction.bind(this, 'SIGUSR1') );
// process.on('SIGUSR2', exitFunction.bind(this, 'SIGUSR2') );
process.on('SIGTERM', exitFunction.bind(this, 'SIGTERM') );
process.on('SIGINT', exitFunction.bind(this, 'SIGINT') );
// process.on('uncaughtException', exitFunction.bind(this, 'uncaughtException', true));

// process.on('exit', exitFunction.bind(this, 'exit'))