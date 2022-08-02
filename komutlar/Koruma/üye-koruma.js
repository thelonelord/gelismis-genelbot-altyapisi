const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {
  
   if (message.author.id !== message.guild.owner.user.id)
    return message.channel.send(
      new Discord.MessageEmbed()
      .setDescription(`<a:neoncarpi:780444956849340416> Bu komutu kullamabilmek için Sunucu Sahibi Olmanız Gerekiyor`)
    );
  
  let p = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  let ws = args[0];

  if (!ws)
    return message.channel.send(
      new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Doğru Kullanımı: ${p}üye-koruma aç @SahteKullanıcıRolü #Kanal`)
    );

  if (ws != "aç" && ws != "kapat")
    return message.channel.send(
      new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Doğru Kullanımı: ${p}üye-koruma aç @SahteKullanıcıRolü #Kanal`)
    );

  if (ws === "aç") {
    let role = message.mentions.roles.first();
    if (!role)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Doğru Kullanımı: ${p}üye-koruma aç @SahteKullanıcıRolü #Kanal`)
      );
    let channels = message.mentions.channels.first();
    if (!channels)
      return message.channel.send(
       new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Doğru Kullanımı: ${p}üye-koruma aç @SahteKullanıcıRolü #Kanal`)
      );
    var a = db.fetch(`koruma_${message.guild.id}`) === "acik";
    if (a)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Bu sistem zaten açık.`)
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setDescription(
          `Üye koruma sistemi başarıyla açıldı.Kanalı <#${channels.id}> olarak ayarlandı.`
        )
    );
    db.set(`koruma_${message.guild.id}`, "acik");
    db.set(`rol_${message.guild.id}`, role.id);
    db.set(`kanal_${message.guild.id}`, channels.id);
  }

  if (ws === "kapat") {
    var a = db.fetch(`koruma_${message.guild.id}`) === "kapali";
    if (a)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Bu sistem zaten kapalı.`)
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setDescription(`Koruma sistemini bu sunucuda deaktif hale getirdim!`)
    );
    db.set(`koruma_${message.guild.id}`, "kapali");
    db.delete(`kanal_${message.guild.id}`);
    db.delete(`rol_${message.guild.id}`);
  }
};

exports.conf = {
  aliases: ["üye-koruma2"],
  permLevel: 0
};

exports.help = {
  name: "koruma-üye3"
};
