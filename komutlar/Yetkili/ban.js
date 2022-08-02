const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  var guild = message.guild;
  var banlayan = message.author.tag;
  let banxx = await message.guild.fetchBans();
  if (!message.guild.me.permissions.has("BAN_MEMBERS"))
    return message.reply(
      "Kullanıcıyı Yasaklıyamıyorum Çünkü `Üyeleri Yasakla` Yetkim Yok."
    );

  var kisi =
    message.mentions.users.first() ||
    client.users.resolve(args[0]) ||
    client.users.cache.find(u => u.username === args[0]) ||
    client.users.cache.get(args[0]);
  if (!kisi)
    return message.reply(
      "Yasaklıyacağım Kişiyi Belirtmen Gerekiyor.\n`ID / @Kullanıcı`"
    );
  var sebeb = args.slice(1).join(" ");

  if (message.author == kisi) return message.reply("Kendini Yasaklayamazsın!");
  if (banxx.get(kisi.id)) return message.reply("Kişi Zaten Yasaklanmış!");

  var now = new Date();
  if (!sebeb) {
    try {
      kisi.send(`${kisi} **${guild}** adlı sunucudan yasaklandınız.`);
      message.channel.send(`**${kisi} yasaklandı.**`);
      guild.members.ban(kisi, { reason: sebeb /*, days: gun*/ });
    } catch (error) {
      message.reply("Error W");
      console.log(error);
    }
  } else {
    try {
      kisi.send(
        `${kisi} **${guild}** adlı sunucudan yasaklandınız. \nSebep: **${sebeb}**`
      );
      message.channel.send(`**${kisi} yasaklandı. \nSebep: ${sebeb}**`);
      guild.members.ban(kisi, { reason: sebeb /*, days: gun*/ });
    } catch (error) {
      message.reply("Error (W -2)");
      console.log(error);
    }
  }
};

exports.conf = {
  aliases: ["yasakla"],
  permLevel: 2
};

exports.help = {
  name: "ban",
  description: "",
  usage: "ban"
};
