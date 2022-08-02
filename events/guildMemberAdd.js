const fs = require("fs");
const Discord = require("discord.js");
const db = require("quick.db");
const chalk = require("chalk");
module.exports = async member => {
  let client = member.client;
  const ayarlar = client.ayarlar;

  //if (!client.users.cache.get(client.user.id).hasPermission("SEND_MESSAGES")) return message.reply(`Yeterli izinlere sahip değilim! \n**Gerekli Olan Yetki:** \n\`Mesaj Gönder\``)

  let prefix;

  if (db.has(`prefix_${member.guild.id}`) === true) {
    prefix = db.fetch(`prefix_${member.guild.id}`);
  }

  if (db.has(`prefix_${member.guild.id}`) === false) {
    prefix = client.ayarlar.prefix;
  }

  
    


  if (db.has(`sayac_${member.guild.id}`) === true) {
    if (db.has(`sKanal_${member.guild.id}`) === true) {
      const channel = db.fetch(`sKanal_${member.guild.id}`);

      if (db.has(`üyelikk_${member.user.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            `<a:sekilligalp:727045194033266730> Altın üye belirdi. \`${
              member.user.tag
            }\`, Ayağa kalkın \`${db.fetch(
              `sayac_${member.guild.id}`
            )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
              member.guild.members.cache.size}\` Kişi Kaldı <a:sekilligalp:727045194033266730>`);
        if (!member.guild.channels.cache.get(channel)) return;

        member.guild.channels.cache.get(channel).send(embed);
      } else
        member.guild.channels.
          cache.get(channel)
          .send(
            `**${member.user.tag}** Sunucuya katıldı! \`${db.fetch(
              `sayac_${member.guild.id}`
            )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
              member.guild.members.cache.size}\` üye kaldı!`
          );
    }
  }
};
