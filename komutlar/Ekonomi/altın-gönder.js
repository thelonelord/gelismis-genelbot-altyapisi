const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let x = /(-)/;

  let user = message.mentions.users.first();

  if (!user)
    return message.reply("Kime altın göndereceğimi etiketlemen lazım!");
  if (user.bot === true)
    return message.reply("Botlara altın gönderemezin!");

  let mesaj = args.slice(1).join(" ");
  if (!mesaj) return message.reply("Göndereceğin miktarı yazman gerek!");

  if (user.id === message.author.id)
    return message.reply(
      `Kendine altın gönderemezsin`
    );

  if (mesaj.match(x)) return message.reply("Lütfen bir sayı gir");
  if (isNaN(args[1])) return message.channel.send("Lütfen bir sayı gir.");

  let altın = await db.fetch(`altıncıklar_${message.author.id}`);
  let elmas = await db.fetch(`altıncıklar_${message.author.id}`);
  let para = await db.fetch(`paracık_${message.author.id}`);

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (altın < mesaj) {
    let bulunanP = await db.fetch(`altıncıklar_${message.author.id}`);
    message.channel.send(
      `Yeterince altının bulunmuyor, sende olan altın:  ${
        bulunanP === null ? "0" : `${bulunanP}`
      }`
    );
  } else if (altın > mesaj) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${user} Adlı kullanıcıya altın gönderildi, gönderildi miktar: ${mesaj}`
      );
    message.channel.send(embed);
    db.add(`altıncıklar_${user.id}`, mesaj);
    db.add(`altıncıklar_${message.author.id}`, -mesaj);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["altınyolla"],
  permLevel: 0,
  kategori: "profil"
};

exports.help = {
  name: "altın-gönder",
  description: "İstediğiniz kişiye altın gönderebilirsiniz.",
  usage: "altın-yolla <@üye> <miktar>"
};
