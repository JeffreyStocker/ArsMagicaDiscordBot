const dotenv = require ('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

const command = require ('./handleCommands');

client.on("ready", () => {
  console.log("I am ready!");
});

var removeEmptyArraySpots = function (array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '') {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}

var processContent = function (message) {
  var msg = message.content.trim();
  var [com, ...content] = msg.split(' ');
  return [com, content.join('')];
}

client.on("message", (message) => {
  var [com, content] = processContent(message);

  if (!!com && com.startsWith(process.env.COMMAND || '!')) {
    com = com.slice(1);
    if (command.hasOwnProperty(com)) {
      try {
        command[com](message, content);
      } catch (err) {
        console.log (err);
      }
    }
  }
});


client.login(process.env.DISCORD_TOKEN)
  .then(()=> {
    console.log ('Logged On');
  })
  .catch(err => {
    console.log ('Error: ', err)
  });

client.on('error', function (err) {
  if (err.message = 'read ECONNRESET') {
    console.log('diconnected');
  } else {
    console.log (err.message);
  }
})


process.stdin.resume();

var exitFunction = function (level, restart = false) {
  console.log('exiting at level:', level);
  client.destroy()
    .then (() => {
      restart ? process.kill(process.pid, 'SIGUSR2') : process.exit();
    });
}

process.on('SIGUSR1', exitFunction.bind(this, 'SIGUSR1') );
// process.on('SIGUSR2', exitFunction.bind(this, 'SIGUSR2') );
process.on('SIGTERM', exitFunction.bind(this, 'SIGTERM') );
process.on('SIGINT', exitFunction.bind(this, 'SIGINT') );
// process.on('uncaughtException', exitFunction.bind(this, 'uncaughtException', true));

// process.on('exit', exitFunction.bind(this, 'exit'))