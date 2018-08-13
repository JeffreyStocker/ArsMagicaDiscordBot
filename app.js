const dotenv = require ('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

const Character = require('./ars magica/Character');
const command = require ('./handleCommands');
const pouch = require('./pouch.js');

client.on("ready", () => {
  console.log("I am ready!");
});


client.on("message", (message) => {
  var botchResults, output;
  if (message.content.startsWith("ping")) {
    command.ping(message);
  }
  if (message.content.startsWith("!")) {
    var msg = message.content.slice(1);
    var content = msg.split(' ');

    if (content[0] === 'create') {
      command.create(message);
    } else if (content[0] === 'roll') {

    } else if (content[0] === 'simple') {
      command.simple(message);
    } else if (content[0] === 'stress') {
      command.stress(message);
    } else if (content[0] === 'botch') {
      command.botch(message);
    } else if (content[0] === 'help') {

    } else if (content[0] === 'list') {
      command.list(message);
    } else if (content[0] === 'select') {

    } else if (content[0] === 'selected') {
    } else if (content[0] === 'select') {
    } else if (content[0] === 'select') {
    } else if (content[0] === 'select') {
    } else if (content[0] === 'select') {
    } else if (content[0] === 'select') {
    } else if (content[0] === 'select') {
    } else if (content[0] === 'select') {
    } else if (content[0] === 'select') {
    }
  }

});


client.login(process.env.DISCORD_TOKEN)
.then(()=> {
  console.log ('Logged On');
})
.catch(err => {
  console.log ('Error: ', err)});