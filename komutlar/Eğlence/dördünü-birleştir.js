const Discord = require('discord.js')

const GameCord = require('gamecord-fork').djs

const db = require('quick.db')
const cd = new Set();
 exports.run = async (client, message, args) => {
  // const cd = new Set();

 if (cd.has(message.author.id)) {
           return message.channel.send(new Discord.MessageEmbed()

.setDescription(`Bu komutu tekrar kullanabilmek için 20 saniye beklemelisin`)
.setColor("#0000c8")
);
    } else {


        cd.add(message.author.id);
        setTimeout(() => {
        message.delete();
         
          cd.delete(message.author.id);
        }, 20000);
    }
   

    
    new GameCord.ConnectFour(message)
   .setTitle("Dördünü Birleştir")
   .setColor("#0000c8")

         .run()

}

exports.conf = {

    enabled: true,

    guildOnly: false,

    aliases: ['connectfour', 'connect-four4', 'dördünü-birleştir', 'dordunubirlestir', 'dördünübirleştir', 'dordunu-birlestir'],

    permLevel: 0

  };

   

  exports.help = {

    name: "connect-four",

    description: "",

    usage: ""

  };