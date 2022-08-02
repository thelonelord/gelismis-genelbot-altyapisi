const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message) => {
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  let args = message.content.split(" ").slice(1);
  const secenekler = args.slice(0).join(" ");

  if (secenekler.length < 1)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Reklam Engelleme Sistemi\nAçmak İçin **${prefix}reklam-engel aç**\nKapatmak İçin **${prefix}reklam-engel kapat**`
        )
      .setColor("#0000c8")
    );

  if (
    secenekler !== "aç" &&
    secenekler !== "kapat" &&
    secenekler !== "on" &&
    secenekler !== "off"&&
    secenekler !== "sıfırla"
  )
    return message.channe.send(
      new Discord.MessageEmbed()
       .setDescription(
          `Reklam Engelleme Sistemi\nAçmak İçin\n**${prefix}reklam-engel aç\nKapatmak İçin **${prefix}reklam-engel kapat**`
        )
      .setColor("#0000c8")
    );

  if (secenekler === "aç" || secenekler === "on") {
    var i = db.set(`re_${message.guild.id}`, "acik");

    const embed = new Discord.MessageEmbed()
    .setColor("#0000c8")
      .setDescription(
        `<a:yesil_onay:727045346852601908> Reklam engelleme sistemi, **Açıldı.**\n**Üyeleri Yasakla yetkisine sahip olanların reklamları engellenmiyecektir.**`
      );
    message.channel.send(embed);
  }

  if (secenekler === "kapat" || secenekler === "sıfırla") {
    db.delete(`re_${message.guild.id}`);

    message.channel.send(
      new Discord.MessageEmbed().setColor("#0000c8").setDescription(
        `<a:yesil_onay:727045346852601908> Reklam engelleme sistemi, **Kapatıldı.**`
      )
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "reklam-engel",
    "ad-engel",
    "ad-blok"
 
  ],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "reklam-engelle",
  description: "Link engelleme sistemini açıp kapatmanızı sağlar.",
  usage: "link-engelle <aç/kapat>"
};
