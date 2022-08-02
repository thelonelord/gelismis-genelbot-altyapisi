const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');
const db = require('quick.db')

 

exports.run = async (client, message, args) => {
  
 let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
    
    if(!args[0]) return message.reply(`**Lütfen Aç/Kapat yazın.** \n> **Doğru Kullanım;** \`${prefix}anti-spam <aç/kapat>\``)

    if(args[1] === "aç") {
      message.reply("AntiSpam başarıyla açıldı.")
      db.set(`antispam_${message.guild.id}`, "acik")
      return;
    } else if(args[1] === "kapat") {
      message.reply("AntiSpam başarıyla kapatıldı!")
      db.delete(`antispam_${message.guild.id}`)
      return;
    }
    

      }
    

exports.conf = {
    enabled: true,
    guildOnly: false,
  aliases: ["anti-spam"],
    permLevel: 4
}

exports.help = {
    name: 'antispam',
    description: 'AntiSpam.',
    usage: 'antispam aç/kapat'
}