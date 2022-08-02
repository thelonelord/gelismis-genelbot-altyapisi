const Discord = require("discord.js");
const data = require("quick.db");
const a = require("../../ayarlar.json")
exports.run = async (client, message, args) => {
    

  message.channel.send(
    new Discord.MessageEmbed().setDescription(
      "Etiket sistemi başarıyla sıfırlandı.")
        .setColor(a.renk)
    
  );
    data.delete(`yasaklı.tag.${message.guild.id}`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["etiket-sistemi-sıfırla"],
  permLevel: 4,
  kategori: "koruma"
};

exports.help = {
  name: "etiketsistemi-sıfırla",
  description: "Yasaklı tagı sıfırlar"
};
