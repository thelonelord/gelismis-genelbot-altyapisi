const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, msg) => {
  const ayarlar = require("../../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  message.channel.send(
    new Discord.MessageEmbed()
.setTitle(":briefcase: Yetkili Komutları")
      .setDescription(
        `**${prefix}sil** = Yazdığınız miktarda mesaj siler.
**${prefix}sustur** = Etiketlediğiniz kullanıcıyı susturur.
**${prefix}susturma-kaldır** = Etiketlediğiniz kullanıcının susturmasını kaldırır.
**${prefix}at** = Etiketlediğiniz kişiyi sunucudan atar.
**${prefix}yasakla** = Etiketlediğiniz kişiyi sunucudan yasaklar.
**${prefix}yasak-kaldır** = Etiketlenen kişinin yasağını kaldırır.
**${prefix}uyar** = Etiketlenen kişiyi uyarır.
**${prefix}uyarı-kaldır** = Etiketlenen kişinin uyarılarını kaldırır.
**${prefix}uyarılar** = Etiketlenen kişinin uyarılarını gösterir.
**${prefix}yavaş-mod** = Kanalın yavaşmod süresini ayarlar.
**${prefix}isim-değiştir** =Etiketlediğinizin kişinin isminizi değiştirir.
**${prefix}kanal-bilgi** = Etiketlediğiniz kanal hakkında bilgi verir.
**${prefix}rol-bilgi** = Etiketlediğiniz veya ismini girdiğiniz rol hakkında bilgi verir. 
**${prefix}emojiler** =Sunucuda bulunan emojileri gösterir.
**${prefix}roller** = Sunucudaki tüm rolleri gösterir.
**${prefix}güvenlik-sorgu** = Etiketlediğniz kişinin güvenliğini sorgular.
**${prefix}sıfırla** = Bulduğunuz kanalı siler ve aynı özellikleriyle tekrar açar.
**${prefix}duyuru** = Girdiğiniz metinle duyuru yapar.
**${prefix}oylama** = Girdiğiniz metinle oylama yapar.
<a:takviye8:855424463909814313> **${prefix}snipe** = Son silinen mesajı gösterir.
**${prefix}sunucu-tanıt** = Sunucunuzu 12 saatte bir tanıtırsınız.
**${prefix}komut-kapat** = İsmini girdiğiniz komutun sunucunuzda kullanılmasını kapatır.
**${prefix}komut-aç**= İsmini girdiğiniz komutun sunucunuzda kullanılmasını açar.
**${prefix}reklam-taraması** = Kullanıcıların oynuyor mesajlarındaki ve kullanıcı adlarındaki reklamları tarar.
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
  name: "yetkili"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
