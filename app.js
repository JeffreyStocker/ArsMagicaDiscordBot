const dotenv = require ('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

const Character = require('./ars magica/Character');
const command = require ('./handleCommands');
const pouch = require('./pouch.js');

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

  if (!!content[0] && content[0].startsWith("!")) {
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
  console.log ('Error: ', err)});