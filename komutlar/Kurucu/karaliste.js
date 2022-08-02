const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let user = client.users.cache.get(args.slice(0).join(" "));
  if (!user) {
    let e = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("Kara listeye almak istediğin kullanıcının ID'ini yaz!");
    message.channel.send({ embed: e });
    return;
  }

  if (db.has(`karalist_${user.id}`) === true)
    return message.reply("Bu kullanıcı zaten kara listede!");

  db.set(`karalist_${user.id}`, "aktif");

  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(
      `${user.tag} adlı kullanıcı başarıyla kara listeye alındı!`
    );
  message.channel.send({ embed: embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["blacklist", "kara-liste"],
  permLevel: 5
  //kategori: "yapımcı"
};

exports.help = {
  name: "karaliste"
  //description: "Belirtilen kullancıyı kara listeye alır!",
  //  usage: "karaliste <kullanıcı ID>"
};
