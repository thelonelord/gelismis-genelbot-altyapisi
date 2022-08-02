const Discord = require('discord.js');
const database = require('quick.db');
const db = require('quick.db')
const a = require("../../ayarlar.json")

exports.run = (client, message, args) => {

  function embedCreate(color, description) {
    
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
    
    const embed = new Discord.MessageEmbed()
    .setColor(color)
   // .setTitle(title)
    .setDescription(description)
    return message.channel.send(embed);
  };

 // if(!message.member.hasPermission('ADMINISTRATOR')) return embedCreate('RED', 'Başarısız!', 'Bu komutu kullanmak için yeterli yetkin bulunmuyor.');
  if(!args[0] && !database.fetch(`fake-channel.${message.guild.id}`)) return embedCreate(a.renk, 'Bir kanal etiketlemelisin yada ID`sini girmelisin.');
  if(args[0] && database.fetch(`fake-channel.${message.guild.id}`)) {
    database.delete(`fake-channel.${message.guild.id}`);
    return embedCreate(a.renk, ':gear: Üye koruma kanalı sıfırlandı.');
  };

  let channel = message.guild.channels.cache.get(args[0]);
  if(!channel) {
    if(message.mentions.channels.first()) {
      channel = message.mentions.channels.first();
    };
  };

  if(!channel) return embedCreate(a.renk, 'Belirttiğin kanalı bu sunucuda bulamıyorum.');

  database.set(`fake-channel.${message.guild.id}`, channel.id);
  return embedCreate(a.renk, `:gear: Üye koruma kanalı **#${channel.name}** olarak ayarlandı.`);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['üye-koruma-kanal','üyekoruma kanal'],
  permLevel: 4
};
 
exports.help = {
  name: 'üyekoruma-kanal'
};