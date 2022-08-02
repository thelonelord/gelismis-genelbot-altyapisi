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
      .setTitle(":video_game: Eğlence Komutları")
      .setDescription(
        `**${prefix}yılan-oyunu** = Yılan oyunu oynarsın.
**${prefix}dördünü-birleştir** = Dördünü birleşir oynarsınız. (2 kişi gerekli)
**${prefix}sayı-tahmin** = Botun aklında tuttuğu sayıyı bilmeye çalışırsınız.
**${prefix}yazan-kazanır** = Botun verdiği kelimeyi ilk yazan kazanır oyunu.
**${prefix}adam-asmaca** = Adam asmaca oynarsın.
**${prefix}xox** = Etiketlediğiniz kullanıcı ile xox oynarsınız. **[BAKIM]**
**${prefix}mc-başarı** = Minecraft başarı yazısı yazdırırsın.
**${prefix}mizah** = Mizah oluşturursunuz.
**${prefix}trump** = Trump olarak tweet atarsınız.
**${prefix}kuş-dili** = Yazdığınız mesajı kuş diline çevirir.
**${prefix}romen** = Yazdığınız sayının romen karşılığını yazar.
**${prefix}ateş-et** = İstediğiniz kişinin kafasına sıkar.
**${prefix}espri** = Rastgele Espri Yapar.
**${prefix}mc-kutu** = Minecraft kutusu açarsın.
**${prefix}mc-iksir** = Rastgele minecraft iksiri elde edersin.
**${prefix}balık-tut** = Balık tutarsın.
`
      )

      .setColor(ayarlar.renk)
      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Davet Et](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [📬 Oy Ver](https://top.gg/bot/${client.user.id}/vote) | [📞 Destek Sunucusu](https://discord.gg/${client.ayarlar.desteksunucu})`,
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
  name: "eğlence"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
