module.exports = {
  giveNotificationBack(messageObject, messageToReturn) {
    messageObject.channel.send(message.author + '\n' + messageToReturn);
  },

  rolledMessage(messageObject, messageToReturn) {
    messageObject.channel.send(message.author + ' rolled: \n' + messageToReturn);
  },

  reply (messageObject, messageToReturn) {
    messageObject.reply(messageToReturn)
  },

  getNickname (messageObject) {
    return messageObject.channel.members.get(message.author.id).nickname;
  },

  sendMessage (messageObject, messageToReturn) {
    messageObject.channel.send(messageToReturn);
  }
}