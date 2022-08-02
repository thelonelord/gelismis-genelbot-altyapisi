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
      .setTitle(":shield: Koruma Komutları")
      .setDescription(`**${prefix}güvenlik-sistemi** =  Sunucuda katılan kişinin hesabının güvenli olup olmadığını gösteren sistemdir.
**${prefix}üye-koruma** = Sunucuya yeni hesap girmesini önler.
**${prefix}kanal koruma** = Sunucuda bir kanal silindiğinde yeniden oluşturulmasını sağlayan sistemidir.
**${prefix}bot-koruma** = Sunucuya bot girmesini önleyen sistemi açar.
**${prefix}yasaklı-tag** = Belirttiğiniz tagda kullanıcı sunucuya girerse belirttiğiniz rolü verir.`
      ) //**${prefix}üye-koruma** = Sunucuya giren kişinin hesabı yeni oluşturulmuş işe kullanıcıyı yasaklar. **${prefix}rol-koruma #kanal** Bir rol silindiğinde tekrar oluşturur ve kayıt kanalından size bildirir. **${prefix}reklam-sistemi #kanal** = Sunucunuzda reklam yapıldığında ayarlanan kanala kimin reklam yaptığını,hangi sunucun reklamını yapıldığını gönderir.

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
  aliases: ["security"],
  permLevel: 0
  //kategori:'seviye'
};

exports.help = {
  name: "koruma"
  //description: "Diğer seviye bilgi komutları hakkında bilgi verir",
  //usage: "seviye-bilgi"
};
