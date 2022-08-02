const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  var guild = message.guild;
  var banlayan = message.author.tag;
  var kisi =
    message.mentions.users.first() ||
    client.users.resolve(args[0]) ||
    client.users.cache.find(u => u.username === args[0]) ||
    client.users.cache.get(args[0]);
  if (!kisi)
    return message.reply(
      "Yasağını Kaldıracağım Kişiyi Belirtmen Gerekiyor `ID / @Kullanıcı`"
    );
  //var gun = args.slice(1).join(' ') ? `${args.slice(1).join(' ')}` :"";
  var neden = args.slice(1).join(" ");
  let banxx = await message.guild.fetchBans();

  if (!banxx.get(kisi.id)) return message.reply("Kişi Yasaklanmamış");

  if (neden) {
    try {
      await message.channel.send(
        `${kisi.tag} adlı kullanıcının yasağı kaldırıldı. \nSebebi: **${neden}**`
      );
      await guild.members.unban(kisi.id, neden);
    } catch (error) {
      message.reply("Error WH");
      console.log(error);
    }
  } else {
    try {
      await message.channel.send(
        `${kisi.tag} adlı kullanıcının yasağı kaldırıldı.`
      );
      await guild.members.unban(kisi.id, neden);
    } catch (error) {
      message.reply("Error (WH-2)");
      console.log(error);
    }
  }
};

exports.conf = {
  aliases: ["yasağı-kaldır","yasak-kaldır","yasaklama-kaldır"],
  permLevel: 2
};

exports.help = {
  name: "unban",
  description: "",
  usage: "unban"
};
