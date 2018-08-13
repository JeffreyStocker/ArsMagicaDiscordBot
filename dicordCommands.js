module.exports = {
  giveNotificationBack(message, messageToReturn) {
    message.channel.send(message.author + '\n' + messageToReturn);
  },

  rolledMessage(message, messageToReturn) {
    message.channel.send(message.author + ' rolled: \n' + messageToReturn);
  },

  reply (message, messageToReturn) {
    message.reply(messageToReturn)
  },

  getNickname (message) {
    return message.channel.members.get(message.author.id).nickname;
  }
}