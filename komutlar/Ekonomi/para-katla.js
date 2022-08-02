const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client, message, args) => {
  const para = args[0];
  if (!para) return message.reply("**Bir Para Miktarı Girmelisin.**")
  if (isNaN(para)) message.channel.send("**Bir Sayı Girmelisin!**")
let kontrol = db.fetch(`paracık_${message.author.id}`)
if(para > kontrol) return message.channel.send('Yeterli miktarda paran bulunmuyor.')

  var cf = [
      "yazı",
      "tura"
  ];
  let sonuç;
  var random = Math.floor(Math.random() * cf.length);
  const ikikatı = para * 2
  const isimyok = `:moneybag: **${message.author.username} Yatırdığın Para Miktarı: ${para.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".")} Coin\nDönüyor...**`
  if (cf[random] == "tura") {
  const ikikatı = para * 2
  sonuç = `:dollar: **Tebrikler Kazandın! ${message.author.username} Kazandığın Para Miktarı: ${ikikatı.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".")}!!**`
  db.add(`paracık_${message.author.id}`, ikikatı)
  } else {
      sonuç = `  Malesef kaybettin :(`
  db.subtract(`paracık_${message.author.id}`, para)
  }
  message.channel.send(isimyok).then(mesıc => {
      setTimeout(() => {
          mesıc.edit(isimyok + sonuç)
      }, 3000);
  })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["para-katla"],
  permLevel: 0
}
exports.help = {
  name : "coinflip",
  description: "coinflip"
}