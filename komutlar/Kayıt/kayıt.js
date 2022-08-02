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
      .setTitle(":radio_button: Kayıt Komutları")
      .setDescription(
        `**${prefix}kayıt-kanal** = Kayıt kanalını ayarlarsınız. **[Yapımda]**
**${prefix}kayıt-günlük** = Kayıt günlük kanalını ayarlarsınız.
**${prefix}erkek @kullanıcı** =  Etiketlenen üyeyi, kaydedip erkek rolü verir..
**${prefix}kız @kullanıcı** =  Etiketlenen üyeyi, kaydedip kız rolü veririr.
**${prefix}yetkili-rol** = Üyeleri kaydedebilecek olan rolü ayarlarsınız..
**${prefix}kız-rol** = Kız/kadın üyelere verilecek olan rolü ayarlarsınız.
**${prefix}erkek-rol** =  Erkek üyelere verilecek olan rolü ayarlarsınız.
**${prefix}alınacak-rol** = Kayıt olan kişiden alınacak rolü ayarlarsınız.
**${prefix}kayıt-sistemi-sıfırla** =  Kayıt sistemini sıfırlarsınız.`
      )

      .setColor(ayarlar.renk)
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Davet Et](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [:ballot_box:  Oy Ver](https://top.gg/bot/${client.user.id}/vote) | [📞 Destek Sunucusu](https://discord.gg/${client.ayarlar.desteksunucu})`,
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
  name: "kayıt"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
