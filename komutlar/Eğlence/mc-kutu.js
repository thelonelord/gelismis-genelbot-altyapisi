const Discord = require("discord.js");
const a = require("../../ayarlar.json")

const cevaplar = [
  "Elmas kılıç (Keskinlik 3, Kırılmazlık 2)",

  "Elmas Kazma (Verimlilik 5, Kırılmazlık 3, Tamir 1)",

  "Elmas balta (Verimlilik 1, Kırılmazlık 1)",

  "Elmas kürek (Verimlilik 2, Kırılmazlık 2)",

  "(1 Adet) Nether yıldızı",

  "(1 Adet) Netherit",

  "(16 Adet) Ender gözü",
  "(64 Adet) Tuğla",

  "Full elmas set",

  "(1 Adet) Kağıt",

  "(1 Adet) Fener",

  "(1 Adet) Spawner",

  "(36 Adet) Altın",
  "(3 Adet) Elmas",
  "(23 Adet) Demir",
  "(56 Adet) Kömür",
  "(45 Adet) Redstone",
  "(49 Adet) Lapis"
];

exports.run = function(client, message, args) {
  var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

 message.channel.send(new Discord.MessageEmbed().setColor(a.renk).setDescription(`Kasadan ${cevap} çıktı`));
};

exports.conf = {
  enabled: true,

  guildOnly: true,

  aliases: ["mc-kutu"],

  permLevel: 0
};

exports.help = {
  name: "mc-kasa",

  description: "",

  usage: ""
};
