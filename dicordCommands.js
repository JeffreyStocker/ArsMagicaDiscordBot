module.exports = {
  giveNotificationBack(messageObject, messageToReturn) {
    messageObject.channel.send(messageObject.author + '\n' + messageToReturn);
  },

  rolledMessage(messageObject, messageToReturn) {
    messageObject.channel.send(messageObject.author + ' rolled: ' + messageObject.content.slice(1) + '\n' + messageToReturn);
  },

  reply (messageObject, messageToReturn) {
    messageObject.reply(messageToReturn)
  },

  getNickname (messageObject) {
    return messageObject.channel.members.get(messageObject.author.id).nickname;
  },

  sendMessage (messageObject, messageToReturn) {
    messageObject.channel.send(messageToReturn);
  }
}