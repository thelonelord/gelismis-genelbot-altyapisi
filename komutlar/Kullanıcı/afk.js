const Discord = require("discord.js");
const data = require("quick.db");
const ms = require("ms");
const moment = require("moment");
const a = require("../../ayarlar.json")
exports.run = async (client, message, args) => {
  
  const msg = message
const db = require("quick.db")
    var en = require("../language/english");
    var tr = require("../language/turkish");

    var dil = db.fetch(`language_${msg.guild.id}`)

if(dil == "en") {
    var lang = en
} 
if(!dil) {
  var lang = tr
}
  
  
  let sebep;
  if (!args[0]) sebep = `${lang.dil.nosebep}`;
  if (args[0]) sebep = args.slice(0).join(" ");

  let atılmaay = moment(Date.now() + 10800000).format("MM");
  let atılmagün = moment(Date.now() + 10800000).format("DD");
  let atılmasaat = moment(Date.now() + 10800000).format("HH:mm:ss");
  let atılma = `\`${atılmagün} ${atılmaay
    .replace(/01/, "Ocak")
    .replace(/02/, "Şubat")
    .replace(/03/, "Mart")
    .replace(/04/, "Nisan")
    .replace(/05/, "Mayıs")
    .replace(/06/, "Haziran")
    .replace(/07/, "Temmuz")
    .replace(/08/, "Ağustos")
    .replace(/09/, "Eylül")
    .replace(/10/, "Ekim")
    .replace(/11/, "Kasım")
    .replace(/12/, "Aralık")} ${atılmasaat}\``;

  moment.locale("tr");

  let display = message.guild.members.cache.get(message.author.id).displayName;
  data.set(`display.${message.author.id}.${message.guild.id}`, display);
  data.set(`afk.${message.author.id}.${message.guild.id}`, "K.u Moduna giriş yaptı.");
  data.set(`giriş.${message.author.id}.${message.guild.id}`, atılma);
  data.set(`sebep.${message.author.id}.${message.guild.id}`, sebep);

  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle(`${message.author.username}, ${lang.dil.afk2}`)
      .setColor(a.renk)
      .setDescription(`${lang.dil.afk} ${sebep}`)
  );
  message.guild.members.cache.get(message.author.id)
    .setNickname(`K.U - ${display}`);
};
exports.conf = {
  enabled: "true",
  guildOnly: "true",
  aliases: ["ku"],
  permLevel: 0
};

exports.help = {
  name: "afk"
};
