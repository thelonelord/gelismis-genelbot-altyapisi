const Discord = module.require("discord.js");
const ayarlar = require("../../ayarlar.json");
const prefix = ayarlar.prefix;
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  let kanal = message.guild.channels.cache.get(args[0]);

  if (!kanal) {
    message.channel.send("Örnek Kullanımı\n **/sesli-çekiliş <#kanalid>**");
  }
  if (kanal) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setColor("RANDOM")
      .setDescription(
        "Çekilişi Kazanan: " + kanal.members.random().user
          ? kanal.members.random().user
          : "Kanalda Kimse Yok"
      )
      .setTimestamp()
      .setFooter(`${client.user.tag} Çekiliş Sistemi`);
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sesliçekiliş", "ses-çekiliş"],
  permLevel: 3,
  kategori: "çekiliş"
};

exports.help = {
  name: "sesli-çekiliş",
  usage: "sesli-çekiliş",
  description: "Çekiliş yapar. (Sesli)"
};
