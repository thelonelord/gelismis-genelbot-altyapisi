const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  const secenekler = args.slice(0).join(" ");

  if (secenekler.length < 1)
    return message.reply(
      new Discord.MessageEmbed()

        .setDescription(
          `OtoRol Sistemi
Açmak İçin: ${prefix}otorol sistemi @rol #kanal
Kapatmak için ${prefix}otorol sistemi sıfırla`
        )
          .setColor("#0000c8")
    );

  if (args[0] === "sistemi") {
    // Ön Data
    db.set(`otorol_${message.guild.id}`, "acik");

    // Let Tanımları
    let kanal = message.mentions.channels.first();
    let rol = message.mentions.roles.first();

    if (!kanal) {
      const d1 = new Disord.MessageEmbed()
        .setDescription(
          `OtoRol Sistemi
Açmak İçin: ${prefix}otorol sistemi @rol #kanal
Kapatmak için ${prefix}otorol sistemi sıfırla`
        )
        .setColor("#0000c8")
      return message.channel.send(d1);
    }
    if (!rol) {
      const d2 = new Disord.MessageEmbed()
        .setDescription(
          `OtoRol Sistemi
Açmak İçin: ${prefix}otorol sistemi @rol #kanal
Kapatmak İçin: ${prefix}otorol sistemi sıfırla`
        )
       .setColor("#0000c8")
      return message.channel.send(d2);
    }

    if (rol && kanal) {
      // Data
      db.set(`okanal_${message.guild.id}`, kanal.id);
      db.set(`orol_${message.guild.id}`, rol.id);
let okanal = db.fetch(`okanal_${message.guild.id}`)
      // Mesaj
      const mesaj = new Discord.MessageEmbed().setColor("#0000c8")
    .setDescription(`**<:onay:746367770731741205> Otorol kanalı başarıyla bu kanala ayarlandı.Bu kanala üyelere rolün verildiği bildirimini göndereceğim**`)
    client.channels.cache.get(okanal).send(mesaj);
      
      const d4 = new Disord.MessageEmbed()
        .setDescription(
          `<a:yesil_onay:727045346852601908> Verilecek rol, ${rol} olarak ayarlandı.
Sunucuya katılan üyelere rolün verildiğini bildirilen kanal ${kanal} olarak ayarlandı.`
        )
        .setColor("#0000c8")

      message.channel.send(d4);
    }
  } else if (args[0] === "sıfırla") {
    // Kişi Eğer Sistemi Kapatırsa Datadaki Verileri Silelim CodeMareFi
    db.delete(`orol_${message.guild.id}`);
    db.delete(`okanal_${message.guild.id}`);

    const d5 = new Disord.MessageEmbed()
      .setDescription(`Otorol Sistemi, **Sıfırlandı.**`)
        .setColor("#0000c8")
    message.channel.send(d5);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Otorol", "OTOROL", "Otorol", "OTOROL", "otorol","otoroll"],
  permLevel: 0
};

exports.help = {
  name: "otorol"
};
