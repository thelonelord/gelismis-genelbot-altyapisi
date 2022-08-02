const { MessageEmbed, MessageAttachment } = require('discord.js'); 
const ayar = require("../../ayarlar.json")
exports.run = (client, message, args) => { 
 let y1 = new MessageAttachment(`https://flamingtext.com//net-fu/proxy_form.cgi?imageoutput=true&script=strongman-logo&text=${client.ws.ping}+MS`, 'ping.png') 
 let e2 = new MessageEmbed() 
 .attachFiles(y1) 
 .setColor(ayar.renk) 
 .setImage('attachment://ping.png')
 .setTitle("• Gecikme Bilgileri") 
//.setFooter(`${message.author.tag} Tarafından istendi.`, message.author.avatarURL())  
 message.channel.send(e2) 
}; 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ping"],
  permLevel: 0
};

exports.help = {
  name: "gecikme",
};