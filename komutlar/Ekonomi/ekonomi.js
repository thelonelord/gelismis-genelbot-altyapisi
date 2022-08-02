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
.setTitle(":classical_building: Ekonomi Komutları")
      .setDescription(
    `**${prefix}rc-al** = Paranızla RC alıp marketten eşya satın alabilirsiniz.
**${prefix}rc-gönder** = Belirlediğiniz kullanıcıya RC gönderebilirsiniz.
**${prefix}envanter** = Envanterini gösterir.
**${prefix}günlük-ödül** = Günlük maaşınızı verir.
**${prefix}kazı-kazan** = Kazı kazan oynarsınız ve rastgele para çıkarırsın.
**${prefix}para-katla** = Para katlayarak kumar oynarsın.
**${prefix}market** = Rozet satın alırsınız.
**${prefix}rütbe** = Rütbe atlayarak daha hızlı gelişebilirsiniz.
**${prefix}para-gönder** = Etiketlediğiniz kişiye para gönderirsiniz.
`
      )

      .setColor(ayarlar.renk)
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Davet Et](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [:ballot_box: Oy Ver](https://top.gg/bot/${client.user.id}/vote) | [📞 Destek Sunucusu](https://discord.gg/${client.ayarlar.desteksunucu})`,
        false
      )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "ekonomi"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
