const Discord = require("discord.js");
const a = require("../../ayarlar.json");
const db = require("quick.db");

exports.run = (client, msg, params) => {
  let p = db.fetch(`prefix_${msg.guild.id}`) || a.prefix;

  const embed = new Discord.MessageEmbed()
    .setTitle("🆕 Yenilikler")
    .setColor(a.renk)
    .setDescription(
      `🔰 ${client.ayarlar.isim} Beta'yı denemek istermisin? premium ile beta özelliklere eriş!`
    ).setDescription(`Çok Yakında...`);

  msg.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["news"],
  permLevel: 0
  //  kategori: "taslak"
};

exports.help = {
  name: "yenilikler",
  description: "Taslak",
  usage: "taslak"
};
