const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, params, args) => {
  
  db.delete(`gcc_${message.guild.id}`);

  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(
        "<a:yesil_onay:727045346852601908> Gelen giden kanalı,**Sıfırlandı**."
      )
            .setColor("#0000c8")
  );
};

exports.conf = {
  kategori: "ayarlar",
  aliases: [
    "resim-kanal-sil",
    "gelen-giden kapat",
    "gelen-giden sıfırla",
    "gkanal-kapat",
    "gkanal-sil",
    "hg-bb-sil",
    "gkanal-kapat",
    "hg-bb kapat"
  ],
  permLevel: 4
};

exports.help = {
  name: "hg-bb-kapat",
  description: "Resimli hoşgeldeldin güle güle kanalı ayarlar.",
  usage: "gkanal"
};
