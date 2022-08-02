const Discord = require("discord.js")
exports.run = (bot, message) => {
  const guildArray = bot.guilds.cache.array()
  while (guildArray.length) {
    const embed = new Discord.MessageEmbed();
    const guilds = guildArray.splice(0,25);
    for (const guild of guilds) {
      embed.setTitle("**Bulunan Sunucular:**")
      embed.addField(`${guild.name} - ÜYE SAYISI : ${guild.memberCount}`, guild.id);
      embed.setColor('#0DB5C7')
    }
    message.channel.send({embed: embed});
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucular'],
  permLevel: 8
};

exports.help = {
  name: "sunucular",
  description: "Botun bulunduğu tüm sunucular",
  usage: "sunucular"
};