/*
    Nom : Slenderbot
    Description : Le bot du serveur de la Slendarmy !
    Auteurs : ZENFIX#8575 | Fabuss254#9232
*/

//VARIABLE CONST

const Discord = require("discord.js");
const Settings = require("./Data/Settings.json");
const prefix = "f.";
const fs = require("fs");
const bot = new Discord.Client();
const debug = true;

//VARIABLE VAR

var doc = new GoogleSpreadsheet('1GGpZ4QhxwGumud1-FTLiMYeWxOO98dg3k9zpTuDQJDY');
let LocalData = []
bot.commands = new Discord.Collection();
var debug = true

var LocalConfig = {}
var Ready = {
    "Sheet1": false,
    "Sheet2": false
}

//TRAITEMENT

fs.readdir("./CoreSc/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./CoreSc/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

//EVENEMENT

bot.on('ready', () => {
    bot.user.setStatus('Online'); // En ligne : 'Online' | Inactif : 'idle' | Ne pas déranger : 'dnd' | Invisible 'invisible'
    bot.user.setActivity(prefix + "help | " + bot.guilds.size + " serveurs | " + bot.users.size + " utilisateurs", {
        'type': 'STREAMING',
        'url': "https://twitch.tv/ZENFIX_"
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
  if(message.author.bot) return;
  if(message.content.startsWith(prefix)){
      if (debug){
          if (message.author.id != "178131193768706048" && message.author.id != "274240989944610827" && message.author.id != "337863324983230474"){
              message.delete()
              var errorcommand_embed = new Discord.RichEmbed ()
                   .setColor("#FF0000")
                   .addField("Désolé !", "Il y a une erreur avec votre requête !")
                   .addField("Raison :", "• Le bot est actuellement en mode correction de bugs, ce qui signifie que seulement certaines personnes peuvent utiliser le bot actuellement.")
              message.channel.send(errorcommand_embed)
              return
          }
      }
      let args = message.content.split(" ");
      let commandfile = bot.commands.get(args[0].substring(prefix.length).toLowerCase());
      if(commandfile){ 
          commandfile.run(bot,message,args,prefix)
      }else{
          message.delete()
          var errorcommand_embed = new Discord.RichEmbed ()
               .setColor("#FF0000")
               .addField("Désolé !", "Il y a une erreur avec votre requête !")
               .addField("Raison :", "• La commande ``" + args[0] + "`` n'éxiste pas ! Vous pouvez faire ``" + prefix + "help`` pour obtenir la liste des commandes disponible !")
         message.channel.send(errorcommand_embed)
      };
  };
});

bot.on("guildMemberAdd", async Member => {
    if(Ready.Sheet1 && Ready.Sheet2){
        if (LocalConfig.LockJoin == "oui"){
            Member.send("Le serveur est en lockjoin pour une raison inconnu, merci de rejoindre le serveur plus tard!");
            Member.kick("Lockjoin actif");
        };
    };
});
/*
bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;
    var args = message.content.substring(prefix.length).split (" ");
    if (!message.content.startsWith(prefix)) return;
    switch (args[0].toLowerCase()) {


case "clearrole":
    if (message.guild.id === "337863843281764372"){
            if (message.author.id === message.guild.ownerID || message.author.id === "274240989944610827"){
                message.channel.send("***END NOW ?!***").then(msg => {
                    const collector = msg.createReactionCollector((reaction, user) => user.id === message.member.id);
                    collector.on('collect', r => {
                        collector.stop();
                        const Whitelist = ["178131193768706048","274240989944610827","299605581142949888","337863324983230474"]
                        const Mem = message.guild.members

                        Mem.forEach(function(v,i){
                            var IsWhitelist = false;
                            Whitelist.forEach(function(v2){
                                if (v.id === v2 || v.User.bot === true){
                                    IsWhitelist = true;
                                };
                            });
                            if (!IsWhitelist){
                                v.removeRoles(v.roles, "Commande .clearrole");
                                v.addRole("464451413947449354", "Commande .clearrole");
                            };
                        });
                    });
                    msg.react("✅")
                });
            }else{
                message.delete();
                message.channel.send("Tu n'as pas accés a cette commande");
            }
break;

            
        case "options":   
            if (!args[1]){
                var Label = new Discord.RichEmbed ()
                .setColor("#FFFFFF")
                .addField("Options du bot", "**``XpGainMin``** Modifier le nombre d'xp minimum gagner au cours de l'ecriture d'un message\n**``XpGainMax``** Modifier le nombre d'xp maximum gagner au cours de l'ecriture d'un message\n**``CanGetLevel``** Est ce que les membres du serveur peuvent gagner des niveaux? ``(oui/non)``\n**``LockJoin``** Kick les utilisateurs dés qu'ils rejoignent le serveur, permet de bloquer les raids bots")
                message.channel.send(Label);
            }else if(args[1].toLowerCase() == "cangetlevel"){
                
            }
            break;
            
        default:
            message.delete()
            var errorcommand_embed = new Discord.RichEmbed ()
                .setColor("#FF0000")
                .addField("Désolé !", "Il y a une erreur avec votre requête !")
                .addField("Raison :", "• La commande ``" + args[0] + "`` n'éxiste pas ! Vous pouvez faire ``" + prefix + "help`` pour obtenir la liste des commandes disponible !")
            message.channel.send(errorcommand_embed)
    }
});
*/
bot.login(process.env.TOKEN);
setAuth(function(){
    console.log("Connected to spreadsheet!")
});

bot.on("error", err => {
    console.log(err);

})
