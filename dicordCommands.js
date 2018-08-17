module.exports = {
  giveNotificationBack(messageObject, messageToReturn) {
    messageObject.channel.send(messageObject.author + ' ' + messageToReturn).catch(err => {
      console.log (err.message);
    });
  },

  rolledMessage(messageObject, messageToReturn) {
    messageObject.channel.send(messageObject.author + ' rolled: ' + messageObject.content.slice(1) + '\n' + messageToReturn).catch(err => {
      console.log (err.message);
    });
  },

  reply (messageObject, messageToReturn) {
    messageObject.reply(messageToReturn).catch(err => {
      console.log (err.message);
    });
  },

  getNickname (messageObject) {
    return messageObject.channel.members.get(messageObject.author.id).nickname.catch(err => {
      console.log (err.message);
    });
  },

  sendMessage (messageObject, messageToReturn) {
    messageObject.channel.send(messageToReturn).catch(err => {
      console.log (err.message);
    });
  },

  sendDm (messageObject, messageToReturn) {
    messageObject.author.send(messageToReturn).catch(err => {
      console.log (err.message);
    });
  }
};