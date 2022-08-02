const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.find(c => c.name === args.slice(0).join(" "));
  
  let kanal = message.mentions.channels.first()
  
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (!channel) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Sayaç Sistemi
Açmak İçin: **${prefix}sayaç-kanal #kanal**
Kapatmak İçin:**${prefix}sayaç-kanal sıfırla**`
        )
                .setColor("#0000c8")
    );
  }

  if (args[0] === "sıfırla") {
    if (db.has(`sKanal_${message.guild.id}`) === true) {
      db.delete(`sKanal_${message.guild.id}`);

      if (db.has(`sayac_${message.guild.id}`) === true) {
        db.delete(`sayac_${message.guild.id}`);
        message.channel.send(
          new Discord.MessageEmbed()
            .setDescription(
              `<a:yesil_onay:727045346852601908> Sayaç sistemi sıfırlandı.`
            )
                    .setColor("#0000c8")
        );
        return;
      }

      message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            `<a:yesil_onay:727045346852601908> Sayaç sistemi sıfırlandı.`
          )
                 .setColor("#0000c8")
      );
      return;
    }
    message.channel.send(new Discord.MessageEmbed()
                        .setDescription(`<a:neoncarpi:780444956849340416> Sayaç kanalı ayarlanmadığı için sıfırlanamaz.`)
                        );
    return;
  }

  db.set(`sKanal_${message.guild.id}`, channel.id);

let skanal = db.fetch(`sKanal_${message.guild.id}`)
  
  
  const mesajj = new Discord.MessageEmbed().setColor("#0000c8")
    .setDescription(`**<:onay:746367770731741205> Sayaç kanalı başarıyla bu kanala ayarlandı.Bu kanala ayarlanan sayaça ne kadar ulaşıldığını bildiren mesajlar atılacaktır.**`);
  
  client.channels.cache.get(skanal).send(mesajj);
  
  const embed = new Discord.MessageEmbed()
    .setDescription(
      `<a:yesil_onay:727045346852601908> Sayaç kanalı ${channel} olarak ayarlandı.`
    )
            .setColor("#0000c8");
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "sayaç-kanal-belirle",
    "sayaç-kanal",
    "sayaçkanal",
    "sayac-kanal",
    "sayackanal"
  ],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "sayaç-kanal-ayarla",
  description: "Sayaç kanalını ayarlar.",
  usage: "sayaç-kanal-ayarla <#kanal>"
};
