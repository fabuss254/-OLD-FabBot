const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send(message.content.substring(6));
  message.delete(100);
};

module.exports.help = {
  "name": "say"
}
