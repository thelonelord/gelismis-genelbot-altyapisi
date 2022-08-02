const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  const ayarlar = require("../../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Cevap Sistemi Açmak İçin: **${prefix}cevap-sistemi aç"**
Kapatmak İçin: **${prefix}cevap-sistemi kapat**`
        )
         .setColor("#0000c8")
    );

  if (args[0] == "aç") {
    db.set(`ss_${message.guild.id}`, "açık");
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `<a:yesil_onay:727045346852601908> Cevap sistemi,**Açıldı**
Artık üyeler selamlaşma,ayrılma içerikli mesaj attığında cevap vereceğim.`
        )
        .setColor("#0000c8")
    );
  }
  if (args[0] == "kapat" || args[0] == "sıfırla") {
    db.delete(`ss_${message.guild.id}`, "kapat");
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `<a:yesil_onay:727045346852601908> Cevap sistemi, **Kapatıldı**`
        )
      .setColor("#0000c8")
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sa", "as","cevap-sistemi","yanıt-sistemi"],
  kategori: "ayarlar",
  permLevel: 3
};

exports.help = {
  name: "sa-as",
  description: "Selamün aleyküm, Aleyküm selam",
  usage: "sa-as"
};
