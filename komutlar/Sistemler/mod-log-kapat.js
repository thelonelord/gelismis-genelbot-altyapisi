const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
   let prefix =
    (db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
   const embed = new Discord.MessageEmbed()
   .setColor('#0000c8')
   .setDescription(`**Bu sunucuda daha önceden modlog kanalı ayarlanmamış. Ayarlamak için:** \`${prefix}modlog-kanal <#kanal>\``)
   .setTimestamp() 
   message.channel.send(embed)
  } else {
    if(modlogs) {    
      db.delete(`modlogkanaly_${message.guild.id}`) 
      const embed = new Discord.MessageEmbed()
      .setColor('#0000c8')
      .setDescription('**Mod-log Kanalı Başarıyla Kapatıldı.**')
      .setTimestamp() 
      message.channel.send(embed)
     }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["modlog-kapat"],
    permLevel: 4
}

exports.help = {
    name: 'modlog-sıfırla',
    description: 'Sıfırlar.',
    usage: 'modlog-sıfırla'
}

