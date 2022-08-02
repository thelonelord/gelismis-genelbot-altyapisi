const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let x = /(-)/;
  let user = message.mentions.users.first() || message.author.id

  if (!user)
    return message.reply(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`RC göndereceğin kişiyi etiketle`)
    );
  if (user.bot === true)
    return message.reply("RC'yi botlara gönderemezsin");

  let mesaj = args.slice(1).join(" ");
  if (!mesaj)
    return message.reply(
      new Discord.MessageEmbed()
        .setDescription("Göndereceğin miktarı gir.")
        .setColor("RED")
    );

  if (user.id === message.author.id)
    return message.reply(
      `Kendine RC Gönderemezsin?`
    );

  if (mesaj.match(x)) return message.reply("Lütfen bir sayı gir.");
  if (isNaN(args[1])) return message.channel.send("Lütfen bir sayı gir.");

  let elmas = await db.fetch(`elmascıklar_${message.author.id}`);
  let altın = await db.fetch(`altıncıklar_${message.author.id}`);
  let para = await db.fetch(`paracık_${message.author.id}`);

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (elmas < mesaj) {
    let bulunanP = await db.fetch(`elmascıklar_${message.author.id}`);
    message.channel.send(
      `Yeterince RC'en bulunmuyor, sende olan RC:  ${
        bulunanP === null ? "0" : `${bulunanP}`
      }`
    );
  } else if (elmas > mesaj) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${user} Adlı kullanıcıya RC gönderildi, Gönderilen miktar: ${mesaj}`
      );
    message.channel.send(embed);
    db.add(`elmascıklar_${user.id}`, mesaj);
    db.add(`elmascıklar_${message.author.id}`, -mesaj);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rc-yolla", "rc-gönder"],
  permLevel: 0,
  kategori: "profil"
};

exports.help = {
  name: "rcgönder",
  description: "İstediğiniz kişiye RC gönderebilirsiniz.",
  usage: "elmas-yolla <@üye> <miktar>"
};
