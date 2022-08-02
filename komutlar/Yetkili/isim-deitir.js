const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("../../ayarlar.json");
const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {

  let isim = args.slice(1).join(" ");
  let kullanici = message.mentions.users.first();

  if (!kullanici)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#0000c8")

        .setDescription("Kişiyi Etiketlemelisin!")
    );

  if (!isim)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#0000c8")

        .setDescription("Kişinin Yeni İsmini Yazmalısın")
    );

  message.guild.members.cache.get(kullanici.id).setNickname(`${isim}`);
  return message.channel.send(
    new Discord.MessageEmbed()
      .setColor("#0000c8")
      .setTitle("İsim Değiştirildi!")
      .addField("İsmi Değiştirilen", `${kullanici.username}`)
      .addField("Yeni İsmi", `${isim}`)
      .setFooter("İsim Başarıyla Değiştirildi")
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isim-değiştir"],
  permLevel: 1
};

exports.help = {
  name: "isimdeğiştir",
  description: "Belirttiğiniz kullanıcının kullanıcı adını değiştirir.",
  usage: "isimdeğiştir @kullanıcı "
};
