const Discord = require("discord.js");

const GameCord = require("gamecord-fork").djs;

const db = require("quick.db");
const a = require("../../ayarlar.json")
const cd = new Set();

exports.run = async (client, message, args) => {
  // const cd = new Set();

  if (cd.has(message.author.id)) {
    return message.channel.send(
      new Discord.MessageEmbed()

        .setDescription(
          `Yılan oyunu komutunu tekrar kullanabilmek için 20 saniye beklemelisin`
        )
        .setColor(a.renk)
    );
  } else {
    cd.add(message.author.id);
    setTimeout(() => {
      message.delete();

      cd.delete(message.author.id);
    }, 20000);
  }

  /*   const title = new Discord.MessageEmbed()
    .setTitle(`Oyun bitti`)
   .setDescripton(`Skor ${score}`)*/

  new GameCord.SnakeGame(message)

    .setTitle("🐍 Yılan Oyunu")

    .setColor("#0000c8")

    .setTime(60000) 
    //.setGameOverTitle(title)
    .run();
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: ["snake", "yılan", "yılan-oyunu", "play-snake", "yılan-oyna"],

  permLevel: 0
};

exports.help = {
  name: "snake",

  description: "Bot i",

  usage: "istatistik"
};
