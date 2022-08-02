const Discord = require("discord.js");
const ms = require("parse-ms");

exports.run = async (client, message, args, bot) => {
  let okul = new Date("2022-01-01 00:00:00");
  let zaman = ms(okul - Date.now());

  let rzm = new Date("2022-05-12 00:00:00");
  let ramazan = ms(rzm - Date.now());

  let krb = new Date("2021-07-20 00:00:00");
  let kurban = ms(krb - Date.now());

  let zrf = new Date("2021-08-30 00:00:00");
  let zafer = ms(zrf - Date.now());

  let cmh = new Date("2021-10-28 00:00:00");
  let cumhur = ms(cmh - Date.now());

  message.channel.send(
    new Discord.MessageEmbed().setColor("#0000c8")
      .setDescription(`Yılbaşınına **${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika kaldı!
Ramazan bayramına **${ramazan.days}** gün **${ramazan.hours}** saat **${ramazan.minutes}** dakika kaldı!
Kurban bayramına **${kurban.days}** gün **${kurban.hours}** saat **${kurban.minutes}** dakika kaldı!
Zafer bayramına **${zafer.days}** gün **${zafer.hours}** saat **${zafer.minutes}** dakika kaldı!
Cumhuriyet bayramına **${cumhur.days}** gün **${cumhur.hours}** saat **${cumhur.minutes}** dakika kaldı!`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["takvim"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "bayramlar",
  enanme: "bayramlar",
  description:
    "Bayramlara kaç gün kaç saat kaç dakika kaç saniye kaldığını gösterir.",
  usage: "bayramlar"
};
