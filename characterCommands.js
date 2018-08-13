const pouch = require('./pouch.js');
const Character = require('./ars magica/Character');


module.exports = {
  list (message, content) {
    pouch.listCharacters(message.author.id)
    .then(data => {
      let output = '';
      for (let [index, character] of Object.entries(data)) {
        index = +index + 1;
        output += index + ': ' + character.name + '\n';
      }
      message.channel.send(output);
    })
  },

  create (message, content) {
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
  },

}