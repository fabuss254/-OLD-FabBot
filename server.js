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

//FIREBASE

var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_ACC)),
  databaseURL: "https://fabbot-7bc1d.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("Servers/485805329096114177");
ref.once("value", function(v) {
  console.log(v.val());
});

//RICH PRESENCES

var HelpEmbed = new Discord.RichEmbed()
.setTitle("__**Liste des commandes**__")
.setDescription("**Voici la listes des commandes disponibles au bot, trier par modules**")
.addField("Normal","**Cmd** - Donne la liste des commandes\n**Help <commande>** - Donne des infos suplémentaire sur une commande\n**Install <module>** - Installer un module (Voir si dessous pour la liste des modules disponibles)\n**Uninstall <module>** - Desinstaller un module")
.addField("VCS","**Send** - Envoyer un message simple dans le vcs\n**Channel** - Regler le salon qui est utiliser pour vcs")
.addField("Capcha","**Verify** - Demander une verification (manuelle)\n**Auto-Verif** - [ADMIN]Mettre le bot en verification automatique\n**SetRole** - [ADMIN]Regler le role aprés verification\n**WelcomeMessage** - [ADMIN]Regler le message de bienvenue (envoyer quand la verification automatique est activer)")
.addField("Musique","Work in progress...");
    
/*    
{
  "embed": {
    "title": "__**Liste des commandes**__",
    "description": "**Voici la listes des commandes disponibles au bot, trier par modules**",
    "color": 0,
    "author": {
      "name": "author name",
      "url": "https://discordapp.com",
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
      {
        "name": "Normal",
        "value": "**Help <commande>** - Donne des infos suplémentaire sur une commande\n**Install <module>** - Installer un module (Voir si dessous pour la liste des modules disponibles)\n**Uninstall <module>** - Desinstaller un module"
      },
      {
        "name": "VCS",
        "value": "**Send** - Envoyer un message simple dans le vcs\n**Channel** - Regler le salon qui est utiliser pour vcs"
      },
      {
        "name": "Capcha",
        "value": "**Verify** - Demander une verification (manuelle)\n**Auto-Verif** - [ADMIN]Mettre le bot en verification automatique\n**SetRole** - [ADMIN]Regler le role aprés verification\n**WelcomeMessage** - [ADMIN]Regler le message de bienvenue (envoyer quand la verification automatique est activer)"
      },
      {
        "name": "Musique",
        "value": "Work in progress..."
      }
    ]
  }
}
*/
//EVENEMENT

bot.on('ready', function(){
    bot.user.setStatus('Online'); // En ligne : 'Online' | Inactif : 'idle' | Ne pas déranger : 'dnd' | Invisible 'invisible'
    bot.user.setActivity(prefix + "cmd | " + bot.guilds.size + " serveurs | " + bot.users.size + " utilisateurs", {
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


bot.on("message", function(message){
  if (message.author.equals(bot.user)) return;
  var args = message.content.substring(prefix.length).split (" ");
  if (!message.content.startsWith(prefix)) return;
  switch (args[0].toLowerCase()) {
      case "say":
          message.channel.send(message.content.substring(6));
          message.delete(100);
          break;
          
      case "cmd":
          message.channel.send(HelpEmbed);
          message.delete(100);
          break;
          
      case "install":
          message.channel.send("Work in progress");
          message.delete(100);
          break;
          
      default:
          message.channel.send("Commande inconnu");
          break;
  };
});


bot.login(process.env.TOKEN);

bot.on("error", err => {
    console.log(err);

})
