const Discord = require("discord.js");
const fetch = require('node-fetch');
const ms = require('ms');
const client = new Discord.Client();
module.exports.run = async (client, message, args) => {
		var yetkili = message.author;
		const süre = args[1];
		const sebep = args[2];
		const kullanıcı = message.mentions.users.first();
		
		if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`❌ • Kullanıcı etiketlemelisin!`)).then(msg => msg.delete({timeout: 5000}));
		if(!süre) return message.channel.send(new Discord.MessageEmbed().setDescription(`❌ • Bir süre belirtmelisin!`).setFooter("s: Saniye\nm: Dakika\nh: Saat\nd: Gün")).then(msg => msg.delete({timeout: 5000}));
		if(!sebep) return message.channel.send(new Discord.MessageEmbed().setDescription(`❌ • Bir sebep belirtmelisin!`)).then(msg => msg.delete({timeout: 5000}));

		const milliseconds = ms(süre);
		if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
			return message.channel.send(new Discord.MessageEmbed().setDescription(`❌ • \`10s - 24d\` arası bir süre girebilirsin!`).setFooter("s: Saniye\nm: Dakika\nh: Saat\nd: Gün")).then(msg => msg.delete({timeout: 5000}));
		}

		const tamSüre = new Date(Date.now() + milliseconds).toISOString();

		await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${kullanıcı.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ communication_disabled_until: tamSüre }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bot ${client.token}`,
			},
		});
		message.channel.send(new Discord.MessageEmbed().setDescription(`❌ • ${kullanıcı} isimli kullanıcı \`${sebep}\` sebebiyle ${süre} susturuldu!`)).then(msg => msg.delete({timeout: 5000}));
		
	};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 2
};
 
exports.help = {
  name: "timeout",
  description: "Discord Timeout sistemi ile bir sunucu üyesini susturmanızı sağlar",
  usage: "(prefix)mute @kullanıcı (süre) (sebep)"
};