const Discord = require("discord.js");
const a = require("../../ayarlar.json");

exports.run = (client, message, args) => {
  let guild = message.guild;
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first() || client.message.author.id
  if (message.mentions.users.size < 1)
    return message
      .channel.send(new Discord.MessageEmbed().setColor(a.renk).setDescription("🔫 Ateş edeceğin kişiyi etiketlemelisin."))
      .catch(console.error);
  message.channel
    .send("Ateş ediliyor....")
    .then(nmsg => nmsg.edit("https://goo.gl/91Y2az"))
    .then(nmsg => nmsg.edit("https://goo.gl/fWHUqt"))
    .then(nmsg => nmsg.edit("https://goo.gl/fWHUqt"))
    .then(nmsg => nmsg.edit("https://goo.gl/91Y2az"))
    .then(nmsg => nmsg.edit("https://goo.gl/91Y2az"))
    .then(nmsg => nmsg.edit(`${Rastgele[ateşet]}`));
  var Rastgele = [
    "Reis sen ne yaptın? Adam öldü.",
    "Silahta mermi yok!",
    "Tetik takılı kaldı.",
    "Ateş etmeden önce o seni öldürdü.",
    "Silahı elinden düşürdün.",
    "Polisler seni yakaladı",
    "Dayanamayıp adam kendini öldürdü.",
    "Adam yoğun bakımda, Kaç.",
    "Iskaladın tekrar dene.",
    "Rüzgarın etkisiyle mermi sağa saptı."
  ];
  var ateşet = Math.floor(Math.random() * Rastgele.length);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ateş", "ateşet"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "ateş-et",
  description: "İstediğiniz kişinin kafasına sıkar.",
  usage: "ateş-et <@kullanıcı>]"
};
