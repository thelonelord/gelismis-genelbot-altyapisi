const Discord = require("discord.js");
const a = require("../../ayarlar.json");
const client = new Discord.Client();

exports.run = (client, message) => {
    var baliklar = [
      "Sazan Tuttun!",
      "Köpek Balığı Tuttun.",
      "Uskumru Tuttun",
      "Kedi balığı tuttun",
      "Balon balığı tuttun",
      "Mezgit Tuttun!",
      "Gümüş Balığı Tuttun",
      "Lüfer Balığı Tuttun",
      "Papağan Balığı Tuttun",
      "Japon Balığı Tuttun Yemeyi Düşünmüyorsun Herhalde?",
      "Hamsi Tuttun!",
      "Levrek Tuttun!",
      "Hiçbirşey Tutamadın Maalesef! :wastebasket:",
      "Alabalık Tuttun! :fish:",
      "Su Şişesi Buldun",
      "Ayakkabı Tuttun :mans_shoe:",
      "Teneke Yakaladın.",
      "Maalesef Balık Oltadan Kaçtı! :wastebasket:",
      "İstavrit Tuttun! "
    ];
    var balik = baliklar[Math.floor(Math.random() * baliklar.length)];
    message.channel.send(new Discord.MessageEmbed()
                 .setColor(a.renk).setDescription(`🎣 ${balik}`));
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["balık tut", "balık-tut", "balık-tut", "balık tut", "balık"],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: "balıktut",
  description: "Balık Tutarsın.",
  usage: "balıktut"
};
