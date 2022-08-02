const Discord = require('discord.js');
const database = require('quick.db');
const a = require("../../ayarlar.json");
const db = require("quick.db")

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
   // .setTitle(title)
    .setDescription(description)
    return message.channel.send(embed);
  };

  /*if(!message.member.hasPermission('ADMINISTRATOR')) return embedCreate('RED', 'Başarısız!', 'Bu komutu kullanmak için yeterli yetkin bulunmuyor.');
  if(!args[0]) return embedCreate('RED', 'Başarısız!', 'Bir süre belirtmelisin.');
  */
  if(isNaN(args[0].split('')[0])) return embedCreate(a.renk, ':stopwatch: Geçerli bir süre belirlemelisiniz.\nm = dakika, h = saat, d = gün');
  if(!isNaN(args[0].split('')[1])) return embedCreate(a.renk, ':stopwatch: Geçerli bir süreli belirtmelisiniz.');

  if(!['d', 'w', 's', 'h', 'm', 'y'].includes(args[0].split('')[1])) return embedCreate(a.renk, ':stopwatch: Geçerli bir süre belirtmelisiniz.\nm = dakika, h = saat , d = gün');
  if(args[0].split('')[0] === '0') {
    database.delete(`fake-time.${message.guild.id}`);
    return embedCreate(a.renk, `:gear: Üye koruma süresi başarıyla sıfırlandı.`);
  } else {
    database.set(`fake-time.${message.guild.id}`, args[0]);
    return embedCreate(a.renk, ':gear: Üye koruma süresi **'+args[0]+'** olarak ayarlandı.');
  };

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['üyekoruması-süre','üyekoruma-süre'],
  permLevel: 4
};
 
exports.help = {
  name: 'üyekoruması süre'
};