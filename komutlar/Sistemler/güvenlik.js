const Discord = require("discord.js");
const db = require("quick.db");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  
  const a = require("../../ayarlar.json");
    const ayarlar = require("../../ayarlar.json");
  let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    
    
  if (message.author.id !== message.guild.owner.id)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "⛔ Bu komutu kullanmak için `Sunucu sahibi` olmalısın."
        )
        .setColor(a.renk)
    );
  
  
  let logk = message.mentions.channels.first();
  let logkanal = await db.fetch(`guvenlik3_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(
            `<a:neoncarpi:780444956849340416> Uygun Kullanım:\n${prefix}güvenlik <#kanal>`
          )
      );

    db.delete(`guvenlik3_${message.guild.id}`);

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `<a:yesil_onay:727045346852601908> Güvenlik Kanalı Başarıyla Kapatıldı`
        )
    );

    return;
  }

  if (!logk)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `<a:neoncarpi:780444956849340416> Uygun Kullanım:\n${prefix}güvenlik <#kanal>.`
        )
    );

  db.set(`guvenlik3_${message.guild.id}`, logk.id);

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Güvenlik kanalı ${logk} olarak ayarlandı\n`)
  );

  const mesaj = new Discord.MessageEmbed()
    .setColor("#0000c8")
    .setDescription(
      `**<:onay:746367770731741205> Güvenlik kanalı başarıyla bu kanala ayarlandı.Bu kanala yeni katılan üyelerin güvenilir olup olmadığını gösteren resim göndereceğim**`
    );
  client.channels.cache.get(logkanal).send(mesaj);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["güvenlik sistemi","güvenlik-sistemi"],
  kategori: "ayarlar",
  permLevel: 3
};

module.exports.help = {
  name: "güvenlik-kanal",
  description: "Güvenlik kanalı ayarlar",
  usage: "güvenlik"
};
