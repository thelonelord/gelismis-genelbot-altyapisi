const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, arg) => {
let kanal = message.mentions.channels.first()

if(arg[0] === 'sistemi') {
const system = await database.fetch(message.sd);
if(system && system == true) return message.channel.send('Sistem zaten açık görünüyor.');
//database.set(message.guild.id, true);
  database.set(`rsk_${message.guild.id}`, kanal.id)
message.channel.send('Gelişmiş reklam koruması aktif edildi. Sıfırlamak için /reklam sistemi sıfırla');
} else if(arg[0] === 'sistemi sıfırla') {
const system = await database.fetch(`rsk_${message.guild.id}`, kanal.id);
if(system && system == false) return message.reply('Sistem zaten kapalı görünüyor.');
database.delete(message.sd);
message.reply('Gelişmiş reklam koruması devre dışı bırakıldı.');
};

};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};
 
exports.help = {
  name: 'reklam'
};