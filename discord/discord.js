const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path');
const commands = require (path.join(__dirname + '/handleCommands'));

client.on('ready', () => {
  console.log('I am ready!');
});

var removeEmptyArraySpots = function (array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '') {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
};

var processContent = function (message) {
  var msg = message.content.trim();
  var [com, ...content] = msg.split(' ');
  return [com, content.join(' ')];
};

client.on('message', (message) => {
  var [com, content] = processContent(message);

  if (!!com && com.startsWith(process.env.COMMAND || '!')) {
    com = com.slice(1).toLowerCase();
    if (commands.hasOwnProperty(com)) {
      try {
        commands[com](message, content);
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
    console.log ('Error: ', err);
  });

client.on('error', function (err) {
  if (err.message = 'read ECONNRESET') {
    console.log('diconnected');
  } else {
    console.log (err.message);
  }
});