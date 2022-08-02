const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");
exports.run = (client, message, msg) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  message.channel.send(
    new Discord.MessageEmbed()
.setTitle(":gear: Sistem Komutları")
      .setDescription(
        `**${prefix}ayarlar** = Sunucu ayarlarını gösterir. **[BETA]**
**${prefix}büyükharf-engelle** = Büyük harf engelleme sistemini açıp kapatmanızı sağlar.
**${prefix}destek-kanal-ayarla** = Gelişmiş Destek Sistemindeki destek kanalını değiştirmenizi sağlar.
**${prefix}destek-rol-ayarla** = Gelişmiş Destek Sistemindeki destek ekibi rolünü değiştirmenizi sağlar.
**${prefix}gelen-giden** = Gelen Giden kanalını ayarla.
**${prefix}küfür-engelle** = Küfür engelleme sistemini açıp kapatmanızı sağlar.
**${prefix}reklam-engelle** = Discord Sunucu Reklamlarını Engelleme sistemini açıp kapatmanızı sağlar.
**${prefix}bağlantı-engelle** = Bağlantı Engelleme sistemini açıp kapatmanızı sağlar.
**${prefix}otorol sistemi** = Sunucuya birisi katıldığında verilecek rolü ayarlar.
**${prefix}cevap-sistemi** = Cevap sistemini açar.
**${prefix}sayaç-sayı** = Sayacı ayarlar.
**${prefix}sayaç-kanal** = Sayaç kanalını ayarlar.
**${prefix}etiket-sistemi** = Sunucuya katılan üyeyenin ismini etiket ekler. 
**${prefix}mod-log** = Günlük (log) kanallarının gönderileceği kanalı ayarlar. 
**${prefix}ön-ek** = Botun ön-ekini ayarlar.
**${prefix}dil değiştir** = Botun dilini değiştirir.

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
  aliases: ["sistemler"],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "ayarlamalı-komutlar"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
