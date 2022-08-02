const Discord = require("discord.js");
const modül = require("sozluk-api");
const a = require("../../ayarlar.json");
exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("Bir kelime girmelisin");
  let kelime = await modül.tdk(args[0]);
  const embed = new Discord.MessageEmbed()
    .setColor(a.renk)
    .setThumbnail(
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Türk_Dil_Kurumu_logo.png"
    )
    .addField(":bookmark: Anlam:", kelime.anlam)
    .addField(":notebook_with_decorative_cover: Lisan:", kelime.lisan)
    .addField(":orange_book: Örnek:", `${kelime.örnek} -**${kelime.Yazar}**`)
    .addField(":books: Atasözü:", kelime.Atasözü);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tdk-ara"],
  permLevel: 0,
  kategori: "genel"
};

exports.help = {
  name: "tdk",
  description: "Tdk'den kelime,sözcük ararsınız",
  usage: "tdk"
};
