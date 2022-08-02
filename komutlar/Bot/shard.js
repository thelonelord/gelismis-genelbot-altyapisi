const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
    
    const ayar = require("../../ayarlar.json")
    
let shc = 0
let shard = await client.shard.broadcastEval(`[this.guilds.cache.size,this.channels.cache.size,this.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),this.voice.connections.size,this.ws.ping,this.uptime]`);
const embed = new Discord.MessageEmbed().setColor(ayar.renk)
shard.forEach((shard) => {
    shc = shc+1
	embed.addField("Shard "+shc,
    "Sunucu Sayısı: "+shard[0].toLocaleString()+
    "\nKanal Sayısı: "+shard[1].toLocaleString()+
    "\nKullanıcı Sayısı: "+shard[2].toLocaleString()+
    "\nGecikme: "+shard[4]+" ms"
                 
                 )});
    embed.setFooter(`• R8 Size ${message.guild.shardID+1}. sharddan hizmet veriyor.`);
    embed.setTitle('Shard istatistik')
message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["shard-bilgi","wings"],
    permLevel: 0
};
exports.help = {
    name: 'shard',
    description: '',
    usage: 'shard',
}; 
/*const Discord = require("discord.js");

exports.run = async (client, message, args) => {
let sh = await client.shard.broadcastEval(`[this.guilds.cache.size,this.shard.id,this.ws.ping]`);
const embed = new Discord.MessageEmbed().setColor("RANDOM")
sh.forEach((shard) => {
	embed.addField("Shard ID:",shard[0],true).addField("Shard Sunucu Sayısı:",shard[1],true).addField("Shard Pingconst Discord = require("discord.js");

exports.run = async (client, message, args) => {
let sh = await client.shard.broadcastEval(`[this.guilds.cache.size,this.shard.id,this.ws.ping]`);
const embed = new Discord.MessageEmbed().setColor("RANDOM")
sh.forEach((shard) => {
	embed.addField("Shard ID:",shard[0],true).addField("Shard Sunucu Sayısı:",shard[1],true).addField("Shard Ping:",shard[2],true)
});
message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'shard',
    description: '',
    usage: 'shard',
};const Discord = require("discord.js");

exports.run = async (client, message, args) => {
let sh = await client.shard.broadcastEval(`[this.guilds.cache.size,this.shard.id,this.ws.ping]`);
const embed = new Discord.MessageEmbed().setColor("RANDOM")
sh.forEach((shard) => {
	embed.addField("Shard ID:",shard[0],true).addField("Shard Sunucu Sayısı:",shard[1],true).addField("Shard Ping:",shard[2],true)
});
message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'shard',
    description: '',
    usage: 'shard',
}const Discord = require("discord.js");

exports.run = async (client, message, args) => {
let sh = await client.shard.broadcastEval(`[this.guilds.cache.size,this.shard.id,this.ws.ping]`);
const embed = new Discord.MessageEmbed().setColor("RANDOM")
sh.forEach((shard) => {
	embed.addField("Shard ID:",shard[0],true).addField("Shard Sunucu Sayısı:",shard[1],true).addField("Shard Ping:",shard[2],true)
});
message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'shard',
    description: '',
    usage: 'shard',
*//*:",shard[2],true)
});
message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'shard',
    description: '',
    usage: 'shard',
}; */