const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let u = message.author

  let balance = db.fetch(`paracık_${u.id}`);

  let altin = await db.fetch(`altıncıklar_${u.id}`);
  let altinim;
  if (altin == null) altinim = "0";
  else altinim = "" + altin + "";

  let elmas = await db.fetch(`elmascıklar_${u.id}`);
  let maaş = await db.fetch(`meslek_${u.id}`);
  let meslekA = await db.fetch(`meslekA_${u.id}`);
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  const embeddd = new Discord.MessageEmbed()

    .addField("RC'en:", `${elmas === null ? "0" : `${elmas}`}`, true)
    .addField(
      ":dollar: Paran:",
      `${balance === null ? "0" : `${balance} TL`}`,
      true
    )
    .addField(
      `:up: Rütbesi`,
      `Rütbesi: **${
        meslekA === null ? "Rütbesi Yok" : `${meslekA}`
      }**\n:money_with_wings: Ek kazancı: **${
        maaş === null ? "0" : `${maaş}`
      }** `
    )

    .setColor("#0000c8");

  message.channel.send(embeddd);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [
    "param",
    "envanter"
  ],
  permLevel: 0,
  kategori: "profil"
};

exports.help = {
  name: "paralarım",
  description: "Olan paranızı, altınlarınızı ve elmaslarınızı gösterir",
  usage: "paralarım"
};
