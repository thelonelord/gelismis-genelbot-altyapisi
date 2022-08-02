const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
let oyndurum = new Set();
const kelime = require("../../jsonlar/kelimeler.json");
const a = require("../../ayarlar.json");
const talkedRecently = new Set();
exports.run = async (bot, message, args) => {
  // const talkedRecently = new Set();

  if (talkedRecently.has(message.author.id)) {
    return message.channel.send(
      new Discord.MessageEmbed()

        .setDescription(
          `Bu komutu tekrar kullanabilmek için 20 saniye beklemelisin`
        )
        .setColor(a.renk)
    );
  } else {
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      message.delete();

      talkedRecently.delete(message.author.id);
    }, 20000);
  }

  const msg = message;
  const db = require("quick.db");
  var en = require("../../language/english");
  var tr = require("../../language/turkish");
  var de = require("../../language/deutch");

  var dil = db.fetch(`language_${msg.guild.id}`);

  if (dil == "en") {
    var lang = en;
  }
  if (!dil) {
    var lang = tr;
  }

  if (oyndurum.has(message.channel.id))
    return message.reply(`${lang.dil.kanalb}`);

  try {
    const cevap = kelime[
      Math.floor(Math.random() * kelime.length)
    ].toLowerCase();
    let point = 0;
    let displayText = null;
    let tahmin = false;
    const confirmation = [];
    const yanlış = [];
    const display = new Array(cevap.length).fill("_");
    while (cevap.length !== confirmation.length && point < 6) {
      await message.channel.send(
        new Discord.MessageEmbed().setColor(a.renk)
       .setTitle(`:levitate: ${lang.dil.adam}`)
        .setDescription(`${
displayText === null
? `**${lang.dil.iyi}**`
: `**${lang.dil.daat}**`}
**${lang.dil.kelime}**:    \`${display.join(" ")}\`
**${lang.dil.yanlisharf}** ${yanlış.join(", ") ||
`${lang.dil.yokk}`}
\`\`\`
╔═════╗
║     ${point > 0 ? "😵" : ""}
║    ${point > 2 ? "┌" : " "}${point > 1 ? "()" : ""}${point > 3 ? "┐" : ""}
║     ${point > 4 ? "/" : ""} ${point > 5 ? "\\" : ""}
║
║
\`\`\``)
      );
      const filter = res => {
        const choice = res.content.toLowerCase();
        return (
          res.author.id === message.author.id &&
          !confirmation.includes(choice) &&
          !yanlış.includes(choice)
        );
      };
      const guess = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 300000
      });
      if (!guess.size) {
        await message.channel.send(new Discord.MessageEmbed()
                  .setColor(a.renk)                 .setDescription(`${lang.dil.zamann}`));
        break;
      }
      const choice = guess.first().content.toLowerCase();
      if (choice === "end") break;
      if (choice.length > 1 && choice === cevap) {
        tahmin = true;
        break;
      } else if (cevap.includes(choice)) {
        displayText = true;
        for (let i = 0; i < cevap.length; i++) {
          if (cevap.charAt(i) !== choice) continue;
          confirmation.push(cevap.charAt(i));
          display[i] = cevap.charAt(i);
        }
      } else {
        displayText = false;
        if (choice.length === 1) yanlış.push(choice);
        point++;
      }
    }
    oyndurum.delete(message.channel.id);
    if (cevap.length === confirmation.length || tahmin)
      return message.channel.send(`🎉 **${lang.dil.tebrik}**`);
    return message.channel.send(`:confused: ${lang.dil.akelime} **${cevap}**`);
  } catch (err) {
    oyndurum.delete(message.channel.id);
    return message.channel.send(`Bir hata oluştu`);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["adam-asmaca"],
  permlevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: "adamasmaca",
  description: "Adam asmaca oynarınız.",
  usage: "adamasmaca"
};
