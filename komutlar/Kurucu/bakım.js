const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
 
  const ayarlar = require("../ayarlar.json");


  if (args[0] === "kapat") {
    let veri = await db.fetch(`botbakım`);
    if (!veri)
      return message.channel.send("Bot zaten bakımda değil. :x:");
    message.channel.send("Bot bakım modundan çıkarıldı.!");
    db.delete(`botbakım`);
    return;
  }

  if (args[0] === "aç") {
    let nani = args.slice(1).join(" ");
    let peep;
    peep = "Bot";
    if (!nani) return message.channel.send(":x: Bir bakım sebebi girmelisin.");

    let bakim = new Discord.MessageEmbed()
      .setTitle("Bot Bakıma Alındı!")
      .setDescription(
        "Şu andan itibaren botu bakıma aldınız.Sizin dışında hiçbir kullanıcı siz bakımı kapayana kadar hiçbir bot komutunu kullanamayacak. \n\n **kapamak için:** /bakım kapat \n\n Botu kullanmaya çalışan kişilere `" +
          nani +
          "` sebebi ile bakımda olduğumu belirteceğim."
      )
      .setColor("RED")
      .setFooter(peep + " Bot Bakım Sistemi");
    message.channel.send(bakim);
    message.delete();
    db.set(`botbakım`, nani);
    return;
  }
  message.reply("Bir değer belirtmelisin \n\n `aç` / `kapat`");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  // kategori: 'yapımcı',
  permLevel: 5
};

exports.help = {
  name: "bakım"
  //  description: '',
  //  usage: ''
};
