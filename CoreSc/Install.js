const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!arg[1]){
    message.channel.send("The install command is to install some modules of the bot on your server\nHere all the module available:\nCapcha | Privacy\n \nType f.help install <Module> to see what the module actually do.");
  };
};

module.exports.help = {
  "name": "install"
}
