const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  
  const ayarlar = require("../../ayarlar.json");
const db = require("quick.db")
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

   
   let split = '|';

    if(!args[0]) {
        return message.channel.send(`Örnek kullanımı\n${prefix}duyuru <duyuru içeriği>`);
    }

    args = args.join(' ').split(split);

    for (var i = 0; i < args.length; i++) args[i] = args[0].trim();

    if(args[2]) args[2] = parseInt(`0x${args[2]}`);

    let eh = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setTimestamp()
    .setDescription(args[0])
    .setTitle("📢 Duyuru")
    message.channel.send(eh);

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['duyuruyap','duyuru-yap','duyur'],
    permLevel: 2
}

exports.help = {
    name: 'duyuru',
    description: '',
    usage: 'duyuru'
}