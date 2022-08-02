const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, arg) => {
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
      //   .setDescription(``)
      .setImage("https://media.discordapp.net/attachments/72755362210542632/86557342532539348/image0-2.png")
      .setTitle(`${client.ayarlar.isim} Yardım Menüsü`)
     .setDescription(`• Bottaki bir hatayı ${prefix}hata-bildir ile bildirebilirsiniz. Bot için önerilerinizi, eklenmesini istediğiniz komutları ${prefix}öneri ile iletebilirsiniz. ${prefix}premium ile premium paketi alıp botun ek özelliklerini kullabilir ve maddi destekte bulunabiliriniz.`)
     //.addField("** **", "<a:maviyildiz:780445154422554644> Kategoriler")
      .addField(
        `:robot: ${prefix}bot`,
        `Bot Komutlarını gösterir`,
        true
      )

      .addField(
        `:bust_in_silhouette: ${prefix}kullanıcı`,
        `Kullanıcı Komutlarını gösterir`,
        true
      )

      .addField(
        `:video_game: ${prefix}eğlence`,
        `Eğlence Komutlarını gösterir`,
        true
      )
      .addField(
        `:briefcase: ${prefix}yetkili`,
        `Yetkili Komutlarını gösterir`,
        true
      )
      .addField(
        `:shield: ${prefix}koruma`,
        `Koruma Komutlarını gösterir`,
        true
      )
      .addField(
        `:gear: ${prefix}sistemler`,
        `Sistem Komutlarını gösterir`,
        true
      )

      .addField(
        `:radio_button: ${prefix}kayıt`,
        `Kayıt Komutlarını gösterir`,
        true
      )
      .addField(
        `:classical_building: ${prefix}ekonomi`,
        `Ekonomi Komutlarını gösterir`,
        true
      )
      //     .addField(`:no_entry_sign: ${prefix}yasaklı-tag`, `Botun Yasaklı Tag Komutlarını gösterir`, false)
      .setColor(ayarlar.renk)

      .addField(
        `» Bağlantılar`,
        `[📧 Sunucuna Davet Et](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [:ballot_box: Oy Ver](https://top.gg/bot/${client.user.id}/vote) | [📞 Destek Sunucusuna Katıl](https://discord.gg/${client.ayarlar.desteksunucu})`,
        false
      )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "yardım",
    "komutlar",
    "commands",
    "yardım menüsü",
    "yardım-menüsü",
    "komut-menüsü"
  ],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "help"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
