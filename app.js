const dotenv = require ('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

const Character = require('./ars magica/Character');
const { stress, botch, roll, simple, sum, stresSum } = require('./dice.js');

const pouch = require('./pouch.js');

client.on("ready", () => {
  console.log("I am ready!");
});


var spreadArray = function (array) {
  return ('[' + array + ']');
}


client.on("message", (message) => {
  var botchResults, output;
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
  if (message.content.startsWith("!")) {
    var msg = message.content.slice(1);
    var content = msg.split(' ');
    if (content[0] === 'create') {
      message.channel.send('yep');
      let name = content[1];
      let author = message.author.id;
      if (!name) {
        message.channel.send('Please include a name for your character');
      } else {
        let char = new Character (name);
        pouch.setChar(author, char)
        // .then(results => {
        //   console.log ('results', results);
        // })
        // .catch(err => {
        //   console.log (err);
        // });
      }
    } else if (content[0] === 'roll') {
    } else if (content[0] === 'simple') {
      message.channel.send(simple());
    } else if (content[0] === 'stress') {
      // output = [1];
      rollResults = stress();
      if (rollResults === 'botch') {
        message.channel.send('You rolled a Zero! \nRoll For Botch!');
        return;
      }
      message.channel.send(spreadArray(rollResults) + ' = ' + stresSum(rollResults));
      console.log (rollResults);
    } else if (content[0] === 'botch') {
      botchResults = botch(content[1]);
      output = spreadArray (botchResults[0]) + '\n';
      if (botchResults[1] === 0) {
        output += 'No Botches!';
      } else {
        output += 'Oh No! You got ' + botchResults[1] + ' botches!';
      }
      message.channel.send(output);
    } else if (content[0] === 'help') {

    } else if (content[0] === 'list') {
      pouch.listCharacters(message.author.id)
      .then(data => {
        let output = '';
        for (let [index, character] of Object.entries(data)) {
          index = +index + 1;
          output += index + ': ' + character.name + '\n';
        }
        message.channel.send(output);
      })
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