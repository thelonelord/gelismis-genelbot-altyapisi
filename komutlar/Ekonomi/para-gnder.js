const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let x = /(-)/;

  let user = message.mentions.users.first() || message.author.id;

  if (!user) return message.reply("Kime para göndereceiğimi etiketlemen lazım!");
  if (user.bot === true)
    return message.reply("Botlara para gönderemezsin!");

  let mesaj = args.slice(1).join(" ");
  if (!mesaj) return message.reply("Göndereceğin miktarı yazman gerek!");

  if (user.id === message.author.id)
    return message.reply(
      `${client.emojis.cache.get(
        client.emojiler.kendineParaYollama
      )} Kendine paramı yollayacaksın ciddimisin?`
    );

  if (isNaN(args[1])) return message.channel.send("Lütfen bir sayı gir.");
  if (mesaj.match(x)) return message.reply("Lütfen bir sayı gir.");

  let elmas = await db.fetch(`elmascıklar_${message.author.id}`);
  let altın = await db.fetch(`altıncıklar_${message.author.id}`);
  let para = await db.fetch(`paracık_${message.author.id}`);

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (para < mesaj) {
    let bulunanP = await db.fetch(`paracık_${message.author.id}`);
    message.channel.send(
      `Yeterince paran bulunmuyor, sende olan para:  ${
        bulunanP === null ? "0" : `${bulunanP}`
      }`
    );
  } else if (para > mesaj) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${user} Adlı kullanıcıya para gönderildi, gönderilen miktar: ${mesaj}`
      );
    message.channel.send(embed);
    db.add(`paracık_${user.id}`, mesaj);
    db.add(`paracık_${message.author.id}`, -mesaj);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["parayolla"],
  permLevel: 0,
  kategori: "profil"
};

exports.help = {
  name: "para-gönder",
  description: "İstediğiniz kişiye para gönderebilirsiniz.",
  usage: "para-gönder <@üye> <miktar>"
};
