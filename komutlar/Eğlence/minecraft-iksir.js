const Discord = require("discord.js");
const db = require("quick.db");
const a = require("../../ayarlar.json")

const cevaplar = [
  "İyileştirme iksiri",
  "Ateş Direnci iksiri",
  "Yenileme iksiri",
  "Çeviklik iksiri",
  "Gece Görüş iksiri",
  "Suda Nefes alma iksiri",
  "Sıçrama iksiri",
  "Zehir iksiri",
  "Zayıflık iksiri",
  "Görünmezlik iksiri",
  "Hasar iksiri",
  "Şans iksiri",
  "Kaplumbağa Terbiyecisi iksiri"

  /*"Hız 2!",

    "Hız 1!",

    "Acele 2!",

    "Dayanaklılık 3!",

    "Wither zehri!",

    "Zehir!",

    "Açlık!",

    "Zıplama arttırma!", 

    "Zıplama arttırma 2!", 

    "Suda nefes alma 2!", 

    "Yavaşlık 2!", 
  
     "Can arttırma 2!", 
      "Anında sağlık 2!", 
  "Şans!", 
  "Boş", 
  "Anında hasar!", */
];

exports.run = function(client, message, args) {
  var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
  db.add(`iksir.${message.author.id}`, 1);
  message.channel.send(new Discord.MessageEmbed().setColor(a.renk).setDescription(`${cevap} çıktı`));
};

exports.conf = {
  enabled: true,

  guildOnly: true,

  aliases: [],

  permLevel: 0
};

exports.help = {
  name: "mc-iksir",

  description: "",

  usage: ""
};
