const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");
const client = new Discord.Client();
require("moment-duration-format");

const prefix = ayarlar.prefix;

exports.run = async (bot, msg, args) => {
  let user =
    msg.mentions.users.first() ||
    (await client.users.fetch(args[0]));
  let simdikitarih = moment.utc(msg.createdAt).format("DD MM YYYY");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  var kontrol;
  const gün = moment.duration(kurulus).format("D");

  if (kurulus < 1296000000) kontrol = "Güvenilir Değil";
  if (kurulus > 1296000000) kontrol = "Güvenilir";

  let userinfo = {};

  userinfo.avatar = user.displayAvatarURL();

  userinfo.id = user.id;

  userinfo.od1 =
    msg.guild.members.cache.get(user.id).user.presence.activites ||
    "Oynadığı bir oyun yok";

  userinfo.status = user.presence.status
    .toString()
    .replace("dnd", `Rahatsız Etmeyin`)
    .replace("online", `Çevrimiçi`)
    .replace("idle", `Boşta`)
    .replace("offline", `Çevrimdışı`);
  /*  .replace("invisible", `Görünmez`)
        .replace("streaming", `Yayında`)
        .replace("watching", `İzliyor`)*/

  userinfo.dctarih = moment
    .utc(msg.guild.members.cache.get(user.id).user.createdAt)
    .format("DD/MM/YYYY HH:mm");

  userinfo.dctarihkatilma = moment
    .utc(msg.guild.members.cache.get(user.id).joinedAt)
    .format("DD/MM/YYYY HH:mm");

  const uembed = new Discord.MessageEmbed()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .addField(`ID`, userinfo.id, true)
    .addField(`Discord İsmi`, `${user.username}`, true)
    .setColor("#0000c8")
    .addField(`Katılım Tarihi`, userinfo.dctarihkatilma, true)
    .addField(`Hesap Oluşturma Tarihi`, userinfo.dctarih, true)
    .addField(`Durum`, userinfo.status, true)
    .addField(`Güvenirlik Seviyesi (3)`, kontrol, true)

    .addField(
      `Roller:`,
      `${msg.guild.members.cache
        .get(user.id)
        .roles.cache.filter(r => r.name !== "@everyone")
        .map(r => r)
        .join(" , ") || "``Bu kullanıcıda hiçbir rol bulunmuyor.``"}`,
      false
    );

  msg.channel.send(uembed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kullanıcı", "kullanıcıbilgi", "profil", "user-info", "user"],
  kategori: "kişisel",
  permLevel: 0
};
exports.help = {
  name: "kullanıcı-bilgi",
  description: "İstediğiniz kullanıcını bilgilerini gösterir.",
  usage: "kullanıcı-bilgi"
};
