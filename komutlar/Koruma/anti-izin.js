const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  
  
  const a = require("../../ayarlar.json")
let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
/*
const pr = new Discord.MessageEmbed()
.setColor(a.renk)
.setDescription (`⛔ Ne yazıkki koruma komutları premium paketine özeldir. Premium ile ilgili bilgileri öğrenmek için ${prefix}premium.`)
  let kod = db.fetch(message.guild.id);
  if (kod) {
  } else {
    return message.channel.send(pr);
  }
*/
  

  if (message.author.id !== message.guild.owner.id)
    return message.channel
      .send(
        new Discord.MessageEmbed()
          .setDescription(
            "⛔ Bu komutu kullanmak için `Sunucu sahibi` olmalısın."
          )
          .setColor(a.renk)
      )


  if (db.has(`antiraidK_${message.guild.id}`) === false) {
    return message.channel.send(
      `Bot koruması açılmamış.Açmak için **${prefix}anti-raid aç**`
    );
  }
  if (!args[1]) return message.reply("Lütfen Bot ID'si girin.");

  if (isNaN(args[1])) {
    return message.reply("Sadece ID Girin.");
  }
  if (args[0] == "ver") {
    client.users.cache.get(args[0]);
    db.set(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.reply(args[1] + "ID li bota izin verildi.");
  }
  if (args[0] == "kaldır") {
    db.delete(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.reply(args[1] + " ID li botun izni kaldırıldı.");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["botkoruma-izin"],
  permLevel: 4
};
exports.help = {
  name: "botkoruma-izni"
};
