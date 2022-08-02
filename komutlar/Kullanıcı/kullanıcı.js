const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, msg) => {
  const ayarlar = require("../../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  message.channel.send(
    new Discord.MessageEmbed()
    .setTitle(`:bust_in_silhouette: Kullanıcı Komutları`)

      .setDescription(
        `**${prefix}kullanıcı-bilgi** = İstediğiniz kullanıcını bilgilerini gösterir.
**${prefix}yetkilerim** = Komutu kullandığınız sunucudaki ya da etiketlediğiniz kişinin sunucudaki yetkilerini gösterir.
**${prefix}ku** = K.U moduna girersiniz.
**${prefix}sunucu-bilgi** = Bulunduğun sunucu hakkında bilgi verir.
**${prefix}sunucu-resmi** = Bulduğunun sunucunun resmini gösterir.
**${prefix}avatar** = Etiketlediğiniz kişinin avatarını gösterir.
**${prefix}hesapla** = Belirtilen işlemi yapar.
**${prefix}tdk-ara** = Tdk'den kelime,sözcük ararsınız.
**${prefix}discrim** = Girdğiniz **0001** gibi hastag'ın kaç kişi kullandığını gösterir.
**${prefix}takvim** = Dini ve resmi günlere kalan süreyi gösterir.
<a:takviye8:855424463909814313> **${prefix}son-görülme** = Etiketlediğiniz kullanıcının en son ne zamam discorda girip çıktığını gösterir. **[BAKIM]**
**${prefix}mc-sunucu** = Ip adresini girdiğiniz minecraft sunucusunun bilgilerini gösterir.
**${prefix}roblox-bilgi** = Roblox ismini girdiğiniz kullanıcının bilgilerini gösterir.
**${prefix}şifre** = Belirttiğiniz miktarda şifre oluşturur.
**${prefix}söz** = Rastgele söz gönderir.
**${prefix}steam** = Belirttiğiniz oyundaki steam bilgilerini gösterir.
**${prefix}not oluştur <1> <2> <3> ** = Girdiğiniz bölmede not oluşturusunuz.
**${prefix}not sil <1> <2> <3> ** = Girdiğiniz bölmedeki notu silersiniz.
**${prefix}not oku <1> <2> <3> ** = Girdiğiniz bölmedeki notu okursunuz .
**${prefix}not tümü ** = Tüm notlarınızı görüntüler.`
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
  name: "kullanıcı"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
