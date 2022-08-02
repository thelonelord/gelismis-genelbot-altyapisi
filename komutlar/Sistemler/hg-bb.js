const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, params, args) => {
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  let hgkanali = message.mentions.channels.first();
  if (!hgkanali)
    return message.channel.send(
      new Discord.MessageEmbed().setColor("#0000c8")
        .setDescription(`Gelen Giden Sistemi
Açmak İçin: **${prefix}gelen-giden #kanal**
Kapatmak İçin: **${prefix}gelen-giden sıfırla**`)
    );
  db.set(`gcc_${message.guild.id}`, message.mentions.channels.first().id);
  let kanal = await db.fetch(`gcc_${message.guild.id}`);

  const mesaj = new Discord.MessageEmbed().setColor("#0000c8")
    .setDescription(`**<:onay:746367770731741205> Gelen Giden bilgilendirme kanalı başarıyla bu kanala ayarlandı.
• Bu kanala sunucudan ayrılanlar ve sunucuya katılanlar bildirilecektir.**`);

  client.channels.cache.get(kanal).send(mesaj);

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("#0000c8")
      .setDescription(
        `<:onay:746367770731741205> Gelen giden kanalı <#${kanal}> olarak ayarlandı.`
      )
  );
};

exports.conf = {
  kategori: "ayarlar",
  aliases: [
    "welcome",
    "resim-kanal",
    "gkanal",
    "resimli-hoşgeldin-kanal",
    "hoşgeldin-ayarla",
    "welcome-set",
    "gelen-giden",
    "welcome-channel",
    "gelen-giden"
  ],
  permLevel: 4
};

exports.help = {
  name: "hg-bb",
  description: "Resimli hoşgeldin güle güle kanalı ayarlar.",
  usage: "gkanal"
};
