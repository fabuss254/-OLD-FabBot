/*
    Nom : Slenderbot
    Description : Le bot du serveur de la Slendarmy !
    Auteurs : ZENFIX#8575 | Fabuss254#9232
*/

//VARIABLE CONST

const Discord = require("discord.js");
const prefix = "f.";
const fs = require("fs");
const bot = new Discord.Client();
const debug = true;

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


bot.login(process.env.TOKEN);

bot.on("error", err => {
    console.log(err);

})
