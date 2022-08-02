const Discord = require("discord.js");
const db = require("quick.db");
const data = require("quick.db");
const a = require("../../ayarlar.json");

exports.run = (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
 
  const sec = new Discord.MessageEmbed()
    .setDescription(
      `Etiket başarıyla \`${
        args[0]
      }\` olarak ayarlandı.`
    )
    .setColor(a.renk);

  const emb = new Discord.MessageEmbed()
    .setDescription(`**${prefix} etiket-sistemi <etiket> ** = Etiket sistemini ayarlarsınız.
**${prefix}etiket-sistemi-s ıfırla** = Etiket sistemini sıfırlar.`)
    .setColor(a.renk);

  if (!args[0]) return message.channel.send(emb);
  data.set(`yasaklı.tag.${message.guild.id}`, args[0] + " ");
  message.channel.send(sec);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "etiket-sistemi",
  description: "Yasaklı tagı ayarlarsınız"
};
