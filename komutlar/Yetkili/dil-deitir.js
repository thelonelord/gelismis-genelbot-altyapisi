const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  const msg = message;
  var en = require("../language/english");
  var de = require("../language/deutch");
  var tr = require("../language/turkish");

  var dil = db.fetch(`language_${msg.guild.id}`);

  if (dil == "en") {
    var lang = en;
  }

  if (dil == "de") {
    var lang = de;
  }

  if (!dil) {
    var lang = tr;
  }

  if (!args[0]) return message.reply(`${lang.dil.args0}`);

  if (args[0] == "değiştir" || args[0] == "set") {
    if (!args[1]) return message.reply(`${lang.dil.args1}`);

    if (args[1] == "tr") {
      if (!dil) return message.reply("Dil Zaten Türkçe Olarak Ayarlanmış");
      db.delete(`language_${msg.guild.id}`);
      return message.reply("Dil Başarıyla Türkçe Olarak Değiştirildi.");
    }

    if (args[1] == "de") {
      if (dil == "de") return message.reply("Language Is Already Set To DE");
      db.set(`language_${msg.guild.id}`, "de");
      return message.reply("Language Successfully Changed to DE");
    }

    if (args[1] == "en") {
      if (dil == en) return message.reply("Language Is Already Set To English");
      db.set(`language_${msg.guild.id}`, "en");
      return message.reply("Language Successfully Changed to English");
    }
  }

  if (args[0] == "sıfırla" || args[0] == "reset") {
    db.delete(`language_${msg.guild.id}`);
    return message.reply("Dil Başarıyla Sıfırlandı.");
  }

  if (args[0] == "yardım" || args[0] == "help") {
    message.reply(`${lang.dil.help}`);
  }
};

exports.conf = {
  aliases: ["language"],
  permLevel: 3
};

exports.help = {
  name: "dil",
  description: "Botun Dilini Değiştirir",
  usage: "ping"
};
