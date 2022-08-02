const fs = require("fs");
const Discord = require("discord.js");
const db = require("quick.db");
const a = require("../ayarlar.json");
const chalk = require("chalk");

module.exports = async message => {
  let client = message.client;

  const ayarlar = client.ayarlar;

  if (!message.guild) return;

  let prefix;

  if (db.has(`prefix_${message.guild.id}`) === true) {
    prefix = db.fetch(`prefix_${message.guild.id}`);
  }

  if (db.has(`prefix_${message.guild.id}`) === false) {
    prefix = client.ayarlar.prefix;
  }

  var args = message.content.split(" ").slice(1);

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);

  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
    //   } else if (client.english.has(command)) {
    //   cmd = client.english.get(command);
  }

  /*let kmt = message.content.split(" ")[0].slice(prefix.length);

  let komut;
  if (client.commands.get(kmt)) {
    
    kmt = client.commands.get(kmt);
  }*/

  var dill = "tr";
  if (db.has(`dil_${message.guild.id}`) === true) {
    var dill = "en";
  }
  const dil = client[dill];
  if (db.has(`yasakK_${message.guild.id}`) === true) {
    if (db.fetch(`yasakK_${message.guild.id}`).includes(cmd.help.name))
      return message.channel.send(
        "<:hata:746320500359430184> Bu komut bu sunucuda **yasaklanmıştır!**"
      );
  }
  let veri = await db.fetch(`botbakım`);
  if (veri) {
    if (message.author.id !== "id girin") {
      let nani = new Discord.MessageEmbed()
        .setTitle("R8 Geçici Bir Süreliğine Kapalıdır.")
        .setDescription("Verdiğimiz rahatsızlıktan dolayı özür dileriz.")
        .addField("Bakım Sebebi:", veri)
        .setColor("RED");
      message.channel.send(nani);
      return;
    }
  }

  if (cmd) {
  } else {
    const bumu = [];
    client.commands.forEach(e => {
      bumu.push(e.help.name);
      e.conf.aliases.forEach(p => bumu.push(p));
    });

    const r = require("string-similarity").findBestMatch(command, bumu);

    const bu = new Discord.MessageEmbed()
      .setColor(a.renk)
      .setDescription(
        `${client.emojis.cache.get(
          client.emojiler.soru8
        )} Bu komutumu demek isteniniz: ${prefix}${r.bestMatch.target}`
      ); 
    message.channel.send(bu); 
  }

  if (cmd) {
   

    if (db.has(`karalist_${message.author.id}`) === true) {
      if (!client.users.cache.get("")) {
        let embed = new Discord.MessageEmbed()
          .setColor(a.renk)
          .setDescription(
            `${client.emojis.cache.get(
              client.emojiler.carpi8
            )} Karalistede olduğun için botun komutlarını kullanamazsın`
          );
        message.channel.send({ embed: embed });

        return;
      }
    }

    let i = await db.fetch(`ktr_${message.guild.id}`);
    let sunucu = db.fetch(`ktr_${message.guild.id}`);
    let logkanal = await db.fetch(`log_${message.guild.id}`);
    if (i) {
      if (message.member.hasPermission("ADMINISTRATOR")) {
      } else if (!sunucu) {
      } else if (!db.has(message.author.id)) {
        if (message.channel.id !== sunucu)
          return message.channel
            .send(
              `Hop!, <@${message.author.id}> Burası komut kanalı değil. <#` +
                sunucu +
                `> kanalına giderek komutlarımı ordan kullanabilirsin.`
            )
            .then(message.delete())
            .then(message => message.delete(10000));
      } else if (db.has(`üyelikk_${message.member.id}`)) {
        if (message.channel.id !== sunucu)
          return message.channel
            .send(
              `<a:mavi:632272730200473600> Usta, <@${message.author.id}> Burası komut kanalı değil. <#` +
                sunucu +
                `> kanalına giderek komutlarımı ordan kullanabilirsin. <a:mavi:632272730200473600>`
            )
            .then(message.delete())
            .then(message => message.delete(10000));
      }
    }

    if (cmd.conf.enabled === false) {
      if (
        !ayarlar.sahip.includes(message.author.id) &&
        !ayarlar.official_sahip.includes(message.author.id) &&
        !ayarlar.sahip2.includes(message.author.id) &&
        !ayarlar.sahip3.includes(message.author.id)
      ) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`<:engel8:855416305028300800> Bu komut bakımdadır.`)
          .setColor(a.renk);
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.bakim === false) {
      //if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.official_sahip.includes(message.author.id)) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`<:hata:746320500359430184> Bu komut bakımdadır.`)
        .setColor("RANDOM");
      message.channel.send({ embed });
      /*return
      }*/
    }

    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Mesajları Yönet iznine sahip olmalısın!`
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Üyeleri At iznine sahip olmalısın!`
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Üyeleri Yasakla iznine sahip olmalısın!`
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Yönetici iznine sahip olmalısın!`
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (
        !ayarlar.sahip.includes(message.author.id) &&
        !ayarlar.official_sahip.includes(message.author.id) &&
        !ayarlar.sahip2.includes(message.author.id) &&
        !ayarlar.sahip3.includes(message.author.id)
      ) {
        return;
      }
    }

    if (cmd.conf.permLevel === 6) {
      if (!message.member.hasPermission("MANAGE_ROLES")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Rolleri Yönet iznine sahip olmalısın!`
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 7) {
      if (!message.member.hasPermission("MANAGE_EMOJIS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Emojileri Yönet iznine sahip olmalısın!`
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 8) {
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Sunucuyu Yönet iznine sahip olmalısın!`
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 9) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<:hata:746320500359430184> Bu komutu kullanabilmek için Yönetici iznine sahip olmalısın!`
          )
          .setColor(a.renk);
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd) {
      const kapalımıkardesbu = await db.fetch(
        `kapalı.${cmd.help.name}.${message.guild.id}`
      );
      if (kapalımıkardesbu) return;
    }

    cmd.run(client, message, args);
  }
};
