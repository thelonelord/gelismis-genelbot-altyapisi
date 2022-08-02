const talkedRecently = new Set();
exports.run = (Bot, Mesaj, Yapılandırmalar) => {
  const Discord = require("discord.js");
  //const talkedRecently = new Set();

  if (talkedRecently.has(Mesaj.author.id)) {
    return Mesaj.channel.send(
      new Discord.MessageEmbed()

        .setDescription(
          `Bu komutu tekrar kullanabilmek için 10 saniye beklemelisin`
        )
        .setColor("#0000c8")
    );
  } else {
    talkedRecently.add(Mesaj.author.id);
    setTimeout(() => {
      Mesaj.delete();

      talkedRecently.delete(Mesaj.author.id);
    }, 10000);
  }
  /*
  const talkedRecently = new Set();

 if (talkedRecently.has(message.author.id)) {
           return message.channel.send(new Discord.MessageEmbed()

.setDescription(`Bu komutu tekrar kullanabilmek için 5 saniye beklemelisin`)
.setColor("#0000c8")
);
    } else {


        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
         
          talkedRecently.delete(messageconst talkedRecently = new Set();

 if (talkedRecently.has(message.author.id)) {
           return message.channel.send(new Discord.MessageEmbed()

.setDescription(`Bu komutu tekrar kullanabilmek için 5 saniye beklemelisin`)
.setColor("#0000c8")
);
    } else {


        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
         
          talkedRecently.delete(message.author.id);
        }, 5000);
const talkedRecently = new Set();

 if (talkedRecently.has(message.author.id)) {
           return message.channel.send(new Discord.MessageEmbed()

.setDescription(`Bu komutu tekrar kullanabilmek için 5 saniye beklemelisin`)
.setColor("#0000c8")
);
    } else {


        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
         
          talkedRecently.delete(message.author.id);
        }, 5000);.author.id);
        }, 5000);
    }*/

  const Sayı = Yapılandırmalar[0];

  Mesaj.delete();

  if (Sayı < 1001) {
    if (Sayı < 101) Mesaj.channel.bulkDelete(Sayı);
    if (Sayı > 100 && Sayı < 201)
      Mesaj.channel.bulkDelete(100), Mesaj.channel.bulkDelete(Sayı - 100);
    if (Sayı > 200 && Sayı < 301)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 200);
    if (Sayı > 300 && Sayı < 401)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 300);
    if (Sayı > 400 && Sayı < 501)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 400);
    if (Sayı > 500 && Sayı < 601)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 500);
    if (Sayı > 600 && Sayı < 701)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 600);
    if (Sayı > 700 && Sayı < 801)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 700);
    if (Sayı > 800 && Sayı < 901)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 800);
    if (Sayı > 900 && Sayı < 1001)
      Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(100),
        Mesaj.channel.bulkDelete(Sayı - 900);

    Mesaj.channel.send(`${Sayı} mesaj başarıyla silindi!`);
  } else {
    Mesaj.channel.send(
      "Lütfen 1 ile 1000 arasında silinecek mesaj sayısı girin."
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil2"],
  permLevel: 2
};

exports.help = {
  name: "sil",
  description: "1000 adede kadar mesaj siler.",
  cooldown: 10
};
