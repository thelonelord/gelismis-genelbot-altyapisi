const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (client, message) => {
  const db = require("quick.db");
const davett = new Discord.MessageEmbed()
    .setColor("#0000c8")
  .setFooter("💡 İpucu: Bottaki komutları öğrenmek için `r/yardım yazabilirsin.")
    .setAuthor(`${client.user.username}`, client.user.avatarURL())
    .setDescription(`[📧 Botu davet et](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\n[📞 Destek Sunucusu](${client.ayarlar.desteksunucu})\n[📮 Oy Ver](https://discordbots.org/bot/${client.user.id}/vote)
`);
  message.channel.send(davett);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["linkler", "destek", "destek-sunucu", "invite", "oyver","bağlantılar"],
  permLevel: 0,
  kategori: "genel"
};

exports.help = {
  name: "davet",
  description: "Botun davet linklerini gösterir.",
  usage: "davet"
};
