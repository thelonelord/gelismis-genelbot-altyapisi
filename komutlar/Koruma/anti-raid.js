const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  const a = require("../../ayarlar.json");
  let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
/*
  const pr = new Discord.MessageEmbed()
    .setColor(a.renk)
    .setDescription(
      `⛔ Ne yazıkki koruma komutları premium paketine özeldir. Premium ile ilgili bilgileri öğrenmek için ${prefix}premium.`
    );
  let kod = db.fetch(message.guild.id);
  if (kod) {
  } else {
    return message.channel.send(pr);
  }*/

  if (message.author.id !== message.guild.owner.id)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "⛔ Bu komutu kullanmak için `Sunucu sahibi` olmalısın."
        )
        .setColor(a.renk)
    );

  if (args[0] == "aç") {
    if (db.has(`antiraidK_${message.guild.id}`) === true) {
      return message.channel.send("Bot koruma zaten açık.");
    }
    db.set(`antiraidK_${message.guild.id}`, "anti-raid-aç");
    message.reply("Bot koruma sistemi açıldı.");
  }

  if (args[0] == "sıfırla") {
    if (db.has(`antiraidK_${message.guild.id}`) === false) {
      return message.channel.send(
        "Bot koruma zaten kapalı. Açmak için **${prefix}bot-koruma aç**"
      );
    }
    db.delete(`antiraidK_${message.guild.id}`, "anti-raid-aç");
    message.reply("Bot koruma sistemi başarıyla sıfırlandı.");
  }
  if (!args[0])
    return message.channel.send(new Discord.MessageEmbed() .setColor(a.renk)  .setDescription(`**${prefix}bot-koruma aç** = Sunucuya bot girmesini önleyen sistemi ayarlarsınız.
**Ayarlamak İçin** **${prefix}botkoruma-izni ver <Bot ID>** = Belirttiğiniz ID'deki bot sunucuya girebilmesini sağlar.
**Sıfırlamak İçin** **${prefix}botkoruma-izni kaldır <Bot ID>**.`) )
    
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bot-koruma"],
  permLevel: 0
};
exports.help = {
  name: "anti-raid"
};
