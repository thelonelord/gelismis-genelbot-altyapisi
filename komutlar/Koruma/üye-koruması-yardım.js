const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("quick.db")

exports.run = (client, message, params) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  const pr = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(
      `⛔ Ne yazıkki koruma komutları premium paketine özeldir. Premium ile ilgili bilgileri öğrenmek için ${prefix}premium.`
    );
  let kod = db.fetch(message.guild.id);
  if (kod) {
  } else {
    return message.channel.send(pr);
  }

  if (message.author.id !== message.guild.owner.id)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "⛔ Bu komutu kullanmak için `Sunucu sahibi` olmalısın."
        )
        .setColor(ayarlar.renk)
    );

  const a = new Discord.MessageEmbed().setColor(ayarlar.renk)
    .setDescription(`**${prefix}üyekoruması-süre <süre>** = Üye koruma süresini ayarlar.
**${prefix}üyekoruma-kanal #kanal** = Üye koruma kayıtlarının gönderileceği kanalı ayarlar.
**${prefix}üyekoruma-rolü @rol ** = Hesabı yeni oluşturulmuş kişilere verilecek rolü ayarlar.`);

  message.channel.send(a);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["member-security", "üyekoruması", "üye-koruma"],
  permLevel: 0,
  kategori: "taslak"
};

exports.help = {
  name: "üye-koruması",
  description: "Taslak",
  usage: "taslak"
};
