const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
 if (message.author.id !== message.guild.owner.id)
    return message.channel
      .send(
        new Discord.MessageEmbed()

          .setDescription(
            "**Bu komutu kullanmak için `Sunucu sahibi` olmanız gerekiyor.**"
          )
          .setColor("RED")
      )
      .then(sil => sil.delete({ timeout: 3000 }));
  
      let kanal = message.mentions.channels.first() || message.channel.id || args[0]
      if(!kanal) return message.channel.send('Rol koruma kayıt kanalını etiketleyin.')
      db.set(`rolk_${message.guild.id}`, kanal.id)
      message.channel.send('Rol koruma sistemi aktif edildi, kayıt kanalı <#'+kanal+'> Olarak ayarlandı.')

      if(args[0] === 'sıfırla') {
        if(!db.fetch(`rolk_${message.guild.id}`)) message.channel.send('Rol koruma sistemi aktif edilmemiş.')
        db.delete(`rolk_${message.guild.id}`, kanal.id)
        message.channel.send('Rol koruma sistemi kapatıldı, kayıt kanalı sıfırlandı.')
      }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases:['rolkoruma'],
  permlevel: 0
};

exports.help = {
  name: "rol-koruma",
  description: 'Rol koruma sistemini açarsınız.',
  usage: 'rol-koruma'
}
