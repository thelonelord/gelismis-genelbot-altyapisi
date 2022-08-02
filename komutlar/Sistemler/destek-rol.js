const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let rol =
    message.mentions.roles.first() ||
    message.guild.roles.cache.find(r => r.name === args.slice(0).join(" "));

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (args[0] === "kapat") {
    if (db.has(`destekR_${message.guild.id}`) === true) {
      message.channel.send(`Destek rolü başarıyla kaldırıldı`);
      db.delete(`destekR_${message.guild.id}`);
      return;
    }
    message.channel.send(`Destek rolü ayarlanmamış.`);
    return;
  }

  if (!rol) {
    let e = new Discord.MessageEmbed()
      .setDescription("Lütfen bir rol adı yazınız veya etiketleyiniz")
      .setColor("RANDOM");
    message.channel.send(e);
    return;
  }

  var s = db.set(`destekR_${message.guild.id}`, rol.id);

  const embed = new Discord.MessageEmbed()

    .setDescription(
      `${client.emojis.cache.get(
        client.emojiler.evet
      )} Destek rolü başarıyla ayarlandı: ${rol}\nDestel rolünü silmek için **${prefix}destek-rol kapat** yazmanız yeterlidir.`
    )
    .setColor("RANDOM");
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["destek-rol", "destek-rol-ayarla"],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "destek-rol-ayarla",
  description:
    "Gelişmiş Destek Sistemindeki destek ekibi rolünü değiştirmenizi sağlar.",
  usage: "destek-rol-ayarla <@rol>"
};
