const Discord = require("discord.js");
const fetch = require('node-fetch');
const client = new Discord.Client();
module.exports.run = async (client, message, args) => {
  const kullanıcı = message.mentions.users.first();

  if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`❌ • Kullanıcı etiketlemelisin!`)).then(msg => msg.delete({timeout: 5000}));

  await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${kullanıcı.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ communication_disabled_until: 0 }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${client.token}`,
    },
  });
  message.channel.send(new Discord.MessageEmbed().setDescription(`❌ • ${kullanıcı} isimli kullanıcının zaman aşımı kaldırıldı!`)).then(msg => msg.delete({timeout: 5000}));
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};
 
exports.help = {
  name: "untimeout",
  description: "Discord Timeout sistemiyle susturulan kullanıcının zaman aşımını kaldırır",
  usage: "(prefix)unmute @kullanıcı"
};