const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    
  let sv = client.guilds.cache.get(args[0]);
  if (!sv) return message.channel.send(`Sunucu ID'si girmelisin veya o sunucuda yetkim yok.`);
  sv.channels
    .random()
    .createInvite()
    .then(a => message.author.send(a.toString()));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: "davet"
};

