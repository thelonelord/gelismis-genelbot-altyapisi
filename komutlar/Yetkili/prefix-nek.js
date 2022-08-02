const db = require("quick.db");
const Discord = require("discord.js");
exports.run = (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  if (args[0] === "sıfırla") {
    if (!prefix) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            `<a:neoncarpi:780444956849340416> Önek değiştirilmediği için sıfırlanamaz.`
          )
          .setColor("#0000c8")
      );
      return;
    }

    db.delete(`prefix_${message.guild.id}`);
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`Önek Sistemi, Sıfırlandı`)
        .setColor("#0000c8")
    );

    return;
  }

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Önek Sistemi
Değiştirmek İçin: **${prefix}ön-ek <yeniönek>**
Sıfırlamak İçin: **${prefix}ön-ek sıfırla**`
        )
        .setColor("#0000c8")
    );
  db.set(`prefix_${message.guild.id}`, args[0]);
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(
        `<a:yesil_onay:727045346852601908> Yeni Önek ${args[0]} olarak ayarlandı.
• Sıfırlamak için ${prefix}ön-ek sıfırla`
      )
      .setColor("#0000c8")
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["prefix-ayarla", "önek", "ön-ek"],
  kategori: "ayarlar",
  permLevel: 4
};

exports.help = {
  name: "prefix",
  description: "Botun prefixini ayarlar",
  usage: "prefix <prefix>"
};
