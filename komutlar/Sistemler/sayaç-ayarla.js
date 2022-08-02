const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (!args[0]) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Sayaç Sistemi
Açmak İçin: **${prefix}sayaç-sayı <sayı>**
Kapatmak İçin: **${prefix}sayaç-sayı sıfırla**`
        )
        .setColor("#0000c8")
    );
  }

  //let profil = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));

  if (args[0] === "sıfırla") {
    if (db.has(`sayac_${message.guild.id}`) === true) {
      db.delete(`sayac_${message.guild.id}`);

      if (db.has(`sKanal_${message.guild.id}`) === true) {
        db.delete(`sKanal_${message.guild.id}`);
        message.channel.send(
          new Discord.MessageEmbed()
            .setDescription(
              `<a:yesil_onay:727045346852601908> Sayaç sistemi, **sıfırlandı**.`
            )
            .setColor("#0000c8")
        );
        return;
      }

      message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            `<a:yesil_onay:727045346852601908> Sayaç sistemi, **sıfırlandı**.`
          )
          .setColor("#0000c8")
      );
      return;
    }
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `<a:neoncarpi:780444956849340416> Sayaç sayısı ayarlanmadığı için sıfırlanamaz.`
        )
        .setColor("#0000c8")
    );
    return;
  }

  if (isNaN(args[0])) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `<a:yesil_onay:727045346852601908> Sayaç sistemi, **sıfırlandı**.`
        )
        .setColor("#0000c8")
    );
  }

  if (args[0] <= message.guild.members.cache.size) {
    // const embed = new Discord.MessageEmbed();
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`Lütfen sunucu sayısından daha yüksek bir değer girin`)
   .setColor("#0000c8")
    );
  }

  db.set(`sayac_${message.guild.id}`, args[0]);

  const embed = new Discord.MessageEmbed()
.setColor("#0000c8")
    .setDescription(
      `Sayaç başarıyla ayarlandı: ${
        args[0]
      }\nSayaç kanalı ayarlamak için ${prefix}sayaç-kanal #kanal`
    );
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sayaç-sayı", "sayac-sayi"],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "sayaç-ayarla",
  description: "Sayacı ayarlar.",
  usage: "saya-çayarla <sayı>"
};
