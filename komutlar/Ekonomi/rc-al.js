const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let x = /(-)/;

  let miktar = args.slice(0).join(" ");
  if (!miktar) return message.reply("Alacağın miktarı yazmalısın.");

  if (miktar.match(x)) return message.reply("Matematik işlemi kullanmayın.");
  if (isNaN(args[0])) return message.channel.send("Lütfen bir sayı girin.");

  let para = await db.fetch(`paracık_${message.author.id}`);
  let altın = await db.fetch(`paracık_${message.author.id}`);

  let eksilcek = -250;
  let elmasMiktar = 1;
  let elmaspara = 50;
  let düşE = 49;

  if (altın < elmaspara * miktar) {
    message.channel.send(
      `:no_entry: ${miktar} RC almak için gerekli paran bulunmuyor. \n Gerekli para **${miktar *
        elmaspara} TL**`
    );
  } else if (altın > miktar * elmaspara) {
    const i = await db.add(
      `altıncıklar_${message.member.id}`,
      -miktar * elmaspara
    );
    db.add(`elmascıklar_${message.member.id}`, miktar);
    const aldıE2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `Başarıyla marketten **${miktar}** RC aldınız\n Hesabınızdan eksilen para miktarı: **${miktar *
          elmaspara} TL**`
      )
      .setTimestamp();
    message.channel.send(aldıE2);
  } else if ((altın = miktar * elmaspara)) {
    const i = await db.add(
      `altıncıklar_${message.member.id}`,
      -miktar * elmaspara
    );
    db.add(`elmascıklar_${message.member.id}`, miktar);
    const aldıE = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `Başarıyla marketten **${miktar}** RC aldınız\n Hesabınızdan eksilen para miktarı: **${miktar *
          elmaspara}**`
      )
      .setTimestamp();
    message.channel.send(aldıE);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rcal"],
  permLevel: 0,
  kategori: "profil"
};

exports.help = {
  name: "rc-al",
  description: "Altınınızla RC alıp marketten eşya satın alabilirsiniz.",
  usage: "elmasal"
};
