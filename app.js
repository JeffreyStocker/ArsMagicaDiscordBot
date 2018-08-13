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
  var content = msg.split(' ');
  removeEmptyArraySpots(content);
  return content;
}

client.on("message", (message) => {
  var content = processContent(message);

  if (!!content[0] && content[0].startsWith(process.env.COMMAND || '!')) {
    content[0] = content[0].slice(1);
    if (command.hasOwnProperty(content[0])) {
      command[content[0]](message, content);
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


process.stdin.resume();

var exitFunction = function (level) {
  console.log('exiting at level:', level);
  client.destroy()
    .then (() => {
      process.exit();
    });
}

process.on('SIGUSR1', exitFunction.bind(this, 'SIGUSR1') );
process.on('SIGUSR2', exitFunction.bind(this, 'SIGUSR2') );
process.on('SIGTERM', exitFunction.bind(this, 'SIGTERM') );
process.on('SIGINT', exitFunction.bind(this, 'SIGINT') );

// process.on('exit', exitFunction.bind(this, 'exit'))