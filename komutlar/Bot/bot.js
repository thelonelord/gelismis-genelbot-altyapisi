const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, msg) => {
  const ayarlar = require("../../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  /*var s = 'tr'
  var a = client.commands.get('yardım').help.name
    if(db.has(`dil_${msg.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('yardım').help.enname
    }
    const dil = client[s]
    const o = a*/

  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle(":robot: Bot Komutları")
      .setDescription(
        `**${prefix}bağlantılar** = Botun bağlantılarını gösterir.
**${prefix}öneri** = Bot için öneri bildirirsiniz
**${prefix}hata-bildir** = Botla ilgili hataları bildirirsiniz.
**${prefix}yenilikler**  = Bota eklenen yenilikleri gösterir.
**${prefix}premium** = Premium paketinin özelliklerini gösterir.
**${prefix}shard** = Botun Shard bilgilerini gösterir.
**${prefix}gecikme** = Botun gecikme süresini gösterir.
**${prefix}oy** = Bota oy vererek, botun yaygınlaşmasına yardımcı olabilirsin. [Yakında]

`
      )

      .setColor(ayarlar.renk)
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Davet Et](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [:ballot_box: Oy Ver](https://top.gg/bot/${client.user.id}/vote) | [📞Destek Sunucusu](https://discord.gg/${client.ayarlar.desteksunucu})`,
        false
      )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["boat"],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "bot"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: ""
};
