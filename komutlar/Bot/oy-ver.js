const Discord = require("discord.js");
const a = require("../../ayarlar.json")
exports.run = (client, msg, arg) => {
  msg.channel.send(
    new Discord.MessageEmbed()
  .setColor(a.renk)
    .setDescription(
      "• Oy vererek botun yaygınlaşmasında yardımcı olabilirsin\n• [Oy Ver](https://top.gg/bot/${client.user.id}/vote)"
    )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oy"],
  permLevel: 0,
  kategori: "genel"
};

exports.help = {
  name: "oy-ver",
  description: "Oy Verme Linkine gidersiniz",
  usage: ""
};
