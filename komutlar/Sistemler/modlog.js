const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let prefix =
    (db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  
 
 let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
    let kanal = message.mentions.channels.first();
    if(!kanal) {
   const embed = new Discord.MessageEmbed()
   .setColor('#0000c8')
   .addField(`**Mod-Log Kanalını Etiketleyiniz.**`, `**Doğru Kullanım : ${prefix}modlog-kanal <#kanal>**`)
   message.channel.send(embed)
    };

    db.set(`modlogkanaly_${message.guild.id}`, kanal.id)
    const modlogkanal = message.guild.channels.cache.find(kanal => kanal.id === modlogs);
    {
     const embed = new Discord.MessageEmbed()
     .setColor('#0000c8')
     .setDescription(`**Mod-log Başarıyla Ayarlandı.**`)
     message.channel.send(embed)
   }
    
    } else {
      if(modlogs) {
        
        const modlogkanal = message.guild.channels.cache.find(kanal => kanal.id === modlogs);
        {
          const embed = new Discord.MessageEmbed()
          .setColor('#0000c8')

        .setDescription(`**Bu sunucuda daha önceden modlog kanalı ayarlanmış. Kapatmak için: **${prefix}modlog-kapat\n**Ayarlanan kanal:** \`${modlogkanal}\``)
        message.channel.send(embed)
        }
      }
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['modlog','modlog-kanal'],
    permLevel: 4
}

exports.help = {
    name: 'mod-log',
    description: 'Log kanalını belirler.',
    usage: 'modlog <#kanal>'
}

