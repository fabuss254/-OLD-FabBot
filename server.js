/*
    Nom : Fabbot
    Description : Bot modulaire, permet d'utiliser des modules supplémentaire pour protéger et elargir sont serveur.
    Auteur : Fabuss254#9232
*/

//VARIABLE CONST

const Discord = require("discord.js");
const prefix = "f.";
const bot = new Discord.Client();
const debug = true;

//TRAITEMENT



//EVENEMENT

bot.on('ready', () => {
    bot.user.setStatus('Online'); // En ligne : 'Online' | Inactif : 'idle' | Ne pas déranger : 'dnd' | Invisible 'invisible'
    bot.user.setActivity(prefix + "help | " + bot.guilds.size + " serveurs | " + bot.users.size + " utilisateurs", {
        'type': 'STREAMING',
        'url': "https://twitch.tv/fabuss255"
    },
    console.log("\nBot connecté !"));
    console.log("\nInfos :\nNombre de serveurs : " + bot.guilds.size + "\nNombre d'utilisateurs : " + bot.users.size);
    var demarragelogs_embed = new Discord.RichEmbed()
        .setColor("#7289DA")
        .addField("LOGS", "Le bot vient de démarrer.")
        .setTimestamp()
    bot.users.get("178131193768706048").send(demarragelogs_embed);
})


bot.on("message", async message => {
  if (message.author.equals(bot.user)) return;
  var args = message.content.substring(prefix.length).split (" ");
  if (!message.content.startsWith(prefix)) return;
  switch (args[0].toLowerCase()) {
      case "say":
          message.channel.send(message.content.substring(6));
          message.delete(100);
          break;
          
      case default:
          message.channel.send("Commande inconnu");
          break;
  };
});


bot.login(process.env.TOKEN);

bot.on("error", err => {
    console.log(err);

})
