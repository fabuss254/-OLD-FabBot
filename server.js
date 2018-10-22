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

const db = admin.firestore();
const settings = {timestampsInSnapshots: true};

db.settings(settings);

//RICH PRESENCES

var HelpEmbed = new Discord.RichEmbed()
.setTitle("__**Liste des commandes**__")
.setDescription("**Voici la listes des commandes disponibles au bot, trier par modules**")
.addField("Normal","**Cmd** - Donne la liste des commandes\n**Help <commande>** - Donne des infos suplémentaire sur une commande\n**Install <module>** - Installer un module (Voir si dessous pour la liste des modules disponibles)\n**Uninstall <module>** - Desinstaller un module")
.addField("VCS","**Send <msg>** - Envoyer un message simple dans le vcs\n**Channel** - Regler le salon qui est utiliser pour vcs\n")
.addField("Capcha","**Verify** - Demander une verification (manuelle)\n**Auto-Verif** - [ADMIN]Mettre le bot en verification automatique\n**SetRole** - [ADMIN]Regler le role aprés verification\n**WelcomeMessage** - [ADMIN]Regler le message de bienvenue (envoyer quand la verification automatique est activer)")
.addField("Musique","Work in progress...");

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
          
      case "dev":
          if (message.author.id != "178131193768706048"){message.channel.send("Tu n'as pas la permission de faire cette commande!")}else{
          if (args[1] && args[1].toLowerCase() == "data"){
              if (args[2]){
                  var docRef = db.collection("Servers").doc(args[2]);
                  docRef.get().then(function(doc) {
                      if (doc.exists) {
                                message.channel.send("**Document Trouver** \n \n" + JSON.stringify(doc.data()));
                            } else {
                                message.channel.send("Le serveur n'existe pas dans la base de donnée!");
                            }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
              }else{
                  var docRef = db.collection("Servers").doc(message.guild.id);
                  docRef.get().then(function(doc) {
                      if (doc.exists) {
                                message.channel.send("**Document Trouver** \n \n" + JSON.stringify(doc.data()));
                            } else {
                                message.channel.send("Le serveur n'existe pas dans la base de donnée!");
                            }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
              };
           }else if(args[1] && args[1].toLowerCase() == "getinfo"){
               if (args[2]){
                  var docRef = db.collection("Servers").doc(args[2]);
                  docRef.get().then(function(doc) {
                      if (doc.exists) {
                                message.channel.send("**Document Trouver** \n \n" + doc.data().AdminInfo);
                            } else {
                                message.channel.send("Le serveur n'existe pas dans la base de donnée!");
                            }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
              }else{
                  var docRef = db.collection("Servers").doc(message.guild.id);
                  docRef.get().then(function(doc) {
                      if (doc.exists) {
                                message.channel.send("**Document Trouver** \n \n" + doc.data().AdminInfo);
                            } else {
                                message.channel.send("Le serveur n'existe pas dans la base de donnée!");
                            }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
              };
           }else if(args[1] && args[1].toLowerCase() == "setinfo"){
              var docRef = db.collection("Servers").doc(message.guild.id);
              docRef.set({
                      "AdminInfo": message.content.substring(14)
                    }, {merge: true});
                   
               message.channel.send("Success!").then(function(message){message.delete(5000)});
          }else if(args[1] && args[1].toLowerCase() == "leaveserver"){
               if(args[2]){
                   if(bot.guilds.get(args[2])){
                      bot.guilds.get(args[2]).leave().then(function(){
                        message.channel.send("Serveur quitter!");
                      });
                   }else{
                      message.channel.send("Serveur introuvable!")
                   };
               };
          }else if(args[1] && args[1].toLowerCase() == "listservers"){
              bot.guilds.array().forEach(function(v,i){
                  console.log(v.id + " | " + v.name)
              });
              
              message.channel.send("Liste des serveurs afficher dans les logs du bot");
          }};
          break;
          
      case "install":
          if (message.member.hasPermission("ADMINISTRATOR", false, true, true)){
              if (!args[1]){
                  message.channel.send("Merci de donner le module à installer, **Liste des modules disponible**:\nVCS")
              }else{
                  if(args[1].toLowerCase() == "vcs"){
                      var docRef = db.collection("Servers").doc(message.guild.id);
                      docRef.get().then(function(doc){
                          if (doc.data().Modules.VCS == false){
                              message.channel.send("Activation du module...").then(function(message){
                                docRef.set({
                                    Modules: {VCS: true},
                                    VCS: {Channel: message.channel.id}
                                  }, {merge: true}).then(function(){
                                    message.edit("Module installer! Ce channel va être utiliser comme salon vcs, si vous souhaitez changer, faite 'f.VCSChannel' dans le channel souhaitée.");
                                  });
                              });
                          }else{
                              message.channel.send("Module deja installer! Faite 'uninstall VCS' pour le desinstaller!")
                          }
                      });
                      
                  }else{
                      message.channel.send("Module non reconnu!")
                  }
              }
          }else{
              message.channel.send("Tu n'as pas la permission d'utiliser cette commande!").then(function(message){message.delete(5000)});
          };
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
