const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, params, args) => {
  const ayarlar = require("../../ayarlar.json");
  let prefix =
    (await require("quick.db").fetch(`prefix.${message.guild.id}`)) ||
    ayarlar.prefix;

  db.delete(`isimerkekRol.${message.guild.id}`);
  db.delete(`isimkadınRol.${message.guild.id}`);
  db.delete(`isimkayıtsızRol.${message.guild.id}`);
  db.delete(`isimyetkiliRol.${message.guild.id}`);

  const embed = new Discord.MessageEmbed()

    .setDescription(`Tüm ayarlar kapatıldı!`)

    .setColor("GREEN");

  return message.channel.send(embed);
};

exports.conf = {
  aliases: ["kayıt-sistemi-sıfırla"],
  permLevel: 8
};

exports.help = {
  name: "kayıt-sistemi-kapat",
  description: "Sayaçı kapatırsınız.",
  usage: "sayaç"
};
