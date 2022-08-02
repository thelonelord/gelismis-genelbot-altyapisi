const Discord = require("discord.js");
const a = require('../../ayarlar.json')

exports.run = (client, message, args) => {
  const db = require("quick.db");

  const members = message.guild.members.cache.filter(
    member =>
      member.user.presence.activites &&
      /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram|glitch.me|.biz)/g.test(
        member.user.presence.activites.name
      )
  );
  const memberss = message.guild.members.cache.filter(
    member =>
      member.user.username &&
      /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram|glitch.me|.biz)/g.test(
        member.user.username
      )
  );
  const embed = new Discord.MessageEmbed()
    .addField(
      "Oynuyor Mesajı Reklam İçeren Kullanıcılar",
      members
        .map(member => `${member} = ${member.user.presence.activites.name}`)
        .join("\n") || "Kimsenin Oynuyor Mesajı Reklam İçermiyor"
    )
    .addField(
      "Kullanıcı Adı Reklam İçeren Kullanıcılar",
      memberss
        .map(member => `${member} = ${member.user.username}`)
        .join("\n") || "Kimsenin Kullanıcı Adı Reklam içermiyor."
    )
    .setColor(a.renk);
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reklam-ara", "reklamara", "reklamtaraması"],
  permLevel: 2,
  kategori: "moderasyon"
};

exports.help = {
  name: "reklam-taraması",
  description:
    "Kullanıcıların oynuyor mesajlarındaki ve kullanıcı adlarındaki reklamları tarar.",
  usage: "reklam-taraması"
};
