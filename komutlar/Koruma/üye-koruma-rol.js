const Discord = require('discord.js');
const database = require('quick.db');
const db = require('quick.db')
const a = require("../../ayarlar.json");

exports.run = (client, message, args) => {
   let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
   const pr = new Discord.MessageEmbed()
     .setColor(a.renk)
     .setDescription(
       `⛔ Ne yazıkki koruma komutları premium paketine özeldir. Premium ile ilgili bilgileri öğrenmek için ${prefix}premium.`
     );
   let kod = db.fetch(message.guild.id);
   if (kod) {
   } else {
     return message.channel.send(pr);
   }

   if (message.author.id !== message.guild.owner.id)
     return message.channel.send(
       new Discord.MessageEmbed()
         .setDescription(
           "⛔ Bu komutu kullanmak için `Sunucu sahibi` olmalısın."
         )
         .setColor(a.renk)
     );

  function embedCreate(color, description) {
    const embed = new Discord.MessageEmbed()
    .setColor(color)
    //.setTitle(title)
    .setDescription(description)
    return message.channel.send(embed);
  };

  //if(!message.member.hasPermission('ADMINISTRATOR')) return embedCreate('RED', 'Başarısız!', 'Bu komutu kullanmak için yeterli yetkin bulunmuyor.');
  if(!args[0] && !database.fetch(`fake-role.${message.guild.id}`)) return embedCreate(a.renk, '🔖 Bir rol etiketlemeli yada ID`sini girmelisin');
  if(args[0] && database.fetch(`fake-role.${message.guild.id}`)) {
    database.delete(`fake-role.${message.guild.id}`);
    return embedCreate(a.renk, 'Üye koruma rolü sıfırlandı.');
  };

  let role = message.guild.roles.cache.get(args[0]);
  if(!role) {
    if(message.mentions.roles.first()) {
      role = message.mentions.roles.first();
    };
  };

  if(!role) return embedCreate(a.renk, '❓ Belirttiğin rolü bu sunucuda bulamıyorum.');

  database.set(`fake-role.${message.guild.id}`, role.id);
  return embedCreate(a.renk, `:gear: Üye koruma rolü **${role.name}** olarak ayarlandı.`);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['üyekoruma rol','üye-koruma-rol','üye-koruma rolü'],
  permLevel: 4
};
 
exports.help = {
  name: 'üyekoruma-rolü'
};