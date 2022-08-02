const Discord = require("discord.js");
const a = require("../../ayarlar.json");
const numaralar = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

exports.run = (client, message, args) => {
  const db = require("quick.db");

  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setDescription("🔢 Bir sayı yazmalısın.")
      .setColor(a.renk);
    message.channel.send({ embed });
    return;
  }

  if (isNaN(args[0])) {
    const embed = new Discord.MessageEmbed()
      .setDescription("🔢 Bir sayı yazmalısın")
      .setColor(a.renk);
    message.channel.send({ embed });
    return;
  }

  if (args[0] > 999999) {
    const embed = new Discord.MessageEmbed()
      .setDescription("<:engel8:855416305028300800> Çevirilecek roman sayısı uzunluğu`999999` karakteri aşmamalıdır.")
      .setColor(a.renk);
    message.channel.send({ embed });
    return;
  }

  const sayi = args[0];

  if (sayi === "0" || sayi === 0) {
    const embed = new Discord.MessageEmbed()
      .setDescription("🔢 Çevrilecek sayıyı 0'dan büyük yazmalısın.")
      .setColor(a.renk);
    message.channel.send({ embed });
    return;
  }

  let result = "";
  for (const [numeral, value] of Object.entries(numaralar)) {
    while (args[0] >= value) {
      result += numeral;
      args[0] -= value;
    }
  }
  const embed = new Discord.MessageEmbed()
    .addField("🔢 Yazılan Sayı", sayi)
    .addField(":repeat: Romen Karşılığı", result)
    .setColor(a.renk);
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["romen-sayı"],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: "romen",
  description: "Yazdığınız sayının romen karşılığını yazar.",
  usage: "romen <sayı>"
};
