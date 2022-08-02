const db = require("quick.db");
const a = require("../../ayarlar.json")
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  const a = require("../../ayarlar.json")
let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  if (message.author.id !== message.guild.owner.id)
    return message.channel
      .send(
        new Discord.MessageEmbed()
          .setDescription(
            "⛔ Bu komutu kullanmak için `Sunucu sahibi` olmalısın"
          )
          .setColor(a.renk)
      )
 

  
    let p = db.fetch(`prefix_${message.guild.id}`) || a.prefix;
  
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor(a.renk)
    //  .setTitle("Kanal Koruma sistemi!")
      .setDescription(
        `Bir kanal etiketlemelisin.`
      );

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`kanalk_${message.guild.id}`)
  if (args[0] == "koruma") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor(a.renk)
     //   .setTitle("kanal Koruma sistemi!")
        .setDescription("Sistem zaten açık olduğundan tekrar ayarlanamaz.");

      message.channel.send(embed);
      return;
    } else {
      db.set(`kanalk_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor(a.renk)
       // .setTitle("Kanal Koruma sistemi!")
        .setDescription(`**Kanal Koruma Sistemi**, açıldı`);

      message.channel.send(embed);
    }
  } else if (args[0] == "sıfırla") {
    db.delete(`kanalk_${message.guild.id}`);
    
    const embed = new Discord.MessageEmbed()
      .setColor(a.renk)
  
      .setDescription(`**Kanal Koruma Sistemi**, sıfırlandı.`);

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["channel"],
  permLevel: 4,
  kategori: "sunucu"
};

exports.help = {
  name: "kanal",
  description: "kanal koruma",
  usage: "kanal-koruma"
};