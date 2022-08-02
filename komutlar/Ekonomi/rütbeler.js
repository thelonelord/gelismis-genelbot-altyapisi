const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let x = args[0];

  // let user = message.mentions.users.first();

  let elmas = await db.fetch(`elmascıklar_${message.author.id}`);
  // let altın = await db.fetch(`altıncıklar_${message.author.id}`);
  let para = await db.fetch(`elmascıklar_${message.author.id}`);

  let meslek = await db.fetch(`meslek_${message.author.id}`);
  let meslekA = await db.fetch(`meslekA_${message.author.id}`);

  let madenciA = "çaylak";
  let çiftçiA = "deneyimli";
  let tamirciA = "usta";
  let emlakçıA = "cadı";
  let mimarA = "efsun";
  let doktorA = "imparator";

  let çiftçiP = "500";

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  try {
    if (!x) {
      const e = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(":up: Rütbeler")
        .addField(
          `Çaylak`,
          `Gereken RC miktarı: **20**\nEk Kazanç: ₺300\n**${prefix}rütbe çaylak**`
        )
        .addField(
          `Deneyimli`,
          `Gereken RC miktarı: **50**\nEk Kazanç: ₺500\n**${prefix}rütbe deneyimli**`
        )
        .addField(
          `Usta`,
          `Gereken RC miktarı: **85**\nEk Kazanç: ₺700\n**${prefix}rütbe usta**`
        )
        .addField(
          `Cadı`,
          `Gereken RC miktarı: **125**\nEk Kazanç: ₺900\n**${prefix}rütbe cadı**`
        )
        .addField(
          `Efsun`,
          `Gereken RC miktarı: **250** \nEk Kazanç: ₺1200\n**${prefix}rütbe efsun**`
        )
        .addField(
          `İmparator`,
          `Gereken RC miktarı: **500**\nEk Kazanç: ₺1500\n**${prefix}rütbe imparator**`
        );

      message.channel.send(e);

      return;
    }

    if (x === "çaylak") {
      if (meslek > 0) {
        message.channel.send(`Bu rütbeyi daha önce satın almışsın`);
      } else if (meslek > 0) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`Zaten Çaylak Rütbesindesin.`)
          .setColor("RED");

        message.channel.send({ embed });
      } else if (para < 20) {
        message.channel.send(
          `Çaylak olmak için yeterli RC'en bulunmuyor. \n Gerekli olan RC: **20**.`
        );
      } else if (para > 20) {
        const madenciE = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Yeni rütbeniz **çaylak**\nRütbe hayırlı olsun`);

        message.channel.send(madenciE);
        db.add(`meslek_${message.author.id}`, 300);
        db.add(`elmascıklar_${message.author.id}`, -20);
        db.set(`meslekA_${message.author.id}`, madenciA);
      }
      return;
    }

    if (x === "deneyimli") {
      db.add(`meslek_${message.author.id}`, 1);

      if (meslek < 1) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek > 301) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(`Zaten deneyimli rütbesindesin.`);
      } else if (meslek > 499) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`Zaten deneyimli rütbesindesin`)
          .setColor("RED");

        message.channel.send({ embed });
        db.add(`meslek_${message.author.id}`, -1);
      } else if (para < 50) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(
          `Deneyimli olmak için yeterli RC'en bulunmuyor. \n Gerekli olan RC: **50 RC**.`
        );
      } else if (para > 50) {
        const madenciE = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Yeni Rütbeniz **Deneyimli**\nHayırlı olsun.`);

        message.channel.send(madenciE);
        db.delete(`meslekA_${message.author.id}`);
        db.add(`meslek_${message.author.id}`, 200);
        db.add(`elmascıklar_${message.author.id}`, -50);
        db.set(`meslekA_${message.author.id}`, çiftçiA);
        db.add(`meslek_${message.author.id}`, -1);
      }

      return;
    }

    if (x === "usta") {
      db.add(`meslek_${message.author.id}`, 1);

      if (meslek < 302) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek > 501) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(`Zaten usta rütbesindesin`);
      } else if (meslek > 699) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`Zaten usta rütbesindesin`)
          .setColor("RED");

        message.channel.send({ embed });
        db.add(`meslek_${message.author.id}`, -1);
      } else if (para < 85) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(
          `tamirci olmak için yeterli RC'en bulunmuyor. \n Gerekli olan RC: **85 RC**.`
        );
      } else if (para > 85) {
        const madenciE = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Yeni rütbeniz **usta**\nHayırlı olsun`);

        message.channel.send(madenciE);
        db.delete(`meslekA_${message.author.id}`);
        db.add(`meslek_${message.author.id}`, 200);
        db.add(`elmascıklar_${message.author.id}`, -85);
        db.set(`meslekA_${message.author.id}`, tamirciA);
        db.add(`meslek_${message.author.id}`, -1);
      }

      return;
    }

    if (x === "cadı") {
      db.add(`meslek_${message.author.id}`, 1);

      if (meslek < 302) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek < 502) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek > 901) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(`Zaten Cadı rütbesindesin.`);
      } else if (meslek > 899) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`Zaten Cadı rütbesindesin`)
          .setColor("RED");

        message.channel.send({ embed });
        db.add(`meslek_${message.author.id}`, -1);
      } else if (para < 125) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(
          `Efsun olmak için yeterli RC'en bulunmuyor. \n Gerekli olan para: **125 RC**.`
        );
      } else if (para > 125) {
        const emlakçıE = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Yeni rütben **Cadı**\nHayırlı olsun.`);

        message.channel.send(emlakçıE);
        db.delete(`meslekA_${message.author.id}`);
        db.add(`meslek_${message.author.id}`, 200);
        db.add(`elmascıklar_${message.author.id}`, -125);
        db.set(`meslekA_${message.author.id}`, emlakçıA);
        db.add(`meslek_${message.author.id}`, -1);
      }

      return;
    }

    if (x === "efsun") {
      db.add(`meslek_${message.author.id}`, 1);

      if (meslek < 302) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek < 502) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek < 702) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek > 1201) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(`Zaten Efsun rütbesindesin`);
      } else if (meslek > 1199) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`Zaten Efsun Rütbesindesin`)
          .setColor("RED");

        message.channel.send({ embed });
        db.add(`meslek_${message.author.id}`, -1);
      } else if (para < 250) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(
          `Efsun olmak için yeterli RC'en bulunmuyor.\n Gerekli olan RC: **250**.`
        );
      } else if (para > 250) {
        const mimarE = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Yeni rütben **efsun**\Hayırlı olsun`);

        message.channel.send(mimarE);
        db.delete(`meslekA_${message.author.id}`);
        db.add(`meslek_${message.author.id}`, 300);
        db.add(`elmascıklar_${message.author.id}`, -250);
        db.set(`meslekA_${message.author.id}`, mimarA);
        db.add(`meslek_${message.author.id}`, -1);
      }

      return;
    }

    if (x === "imparator") {
      db.add(`meslek_${message.author.id}`, 1);

      if (meslek < 302) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek < 502) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek < 702) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek < 902) {
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
        db.add(`meslek_${message.author.id}`, -1);
      } else if (meslek > 1501) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(
          `Lütfen rütbeleri sırasıyla ol\n **${prefix}rütbe** Yazarak rütbeni ve sırayı görebilirsin`
        );
      } else if (meslek > 1499) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`Zaten imparator rütbesindesin`)
          .setColor("RED");

        message.channel.send({ embed });
        db.add(`meslek_${message.author.id}`, -1);
      } else if (para < 500) {
        db.add(`meslek_${message.author.id}`, -1);
        message.channel.send(
          `Yeterli RC'en bulunmuyor.\n Gerekli olan RC: **500**.`
        );
      } else if (para > 500) {
        const doktorE = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Yeni rütben **İmparator**\nHayırlı olsun.`);

        message.channel.send(doktorE);
        db.delete(`meslekA_${message.author.id}`);
        db.add(`meslek_${message.author.id}`, 300);
        db.add(`elmascıklar_${message.author.id}`, -500);
        db.set(`meslekA_${message.author.id}`, doktorA);
        db.add(`meslek_${message.author.id}`, -1);
      }

      return;
    }
  } catch (err) {}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "rütbe",
  description: "Meslek sahibi olarak daha hızlı para kazanabilirsiniz",
  usage: "meslek"
};
