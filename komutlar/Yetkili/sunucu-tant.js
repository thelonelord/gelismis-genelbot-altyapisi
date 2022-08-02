const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const db = require("quick.db");
exports.run = async (client, message, args) => {

  let kullanildii = JSON.parse(fs.readFileSync("./sunucutanıt.json", "utf8"));
  if (!kullanildii[message.guild.id])
    kullanildii[message.guild.id] = {
      gunlukkullanim: 0
    };
  if (kullanildii[message.guild.id].gunlukkullanim == 0) {
    const embed = new Discord.MessageEmbed()
     // .setTitle("BAŞARILI")
   .setColor("#0000c8") 
    .setDescription(
        "Sunucunuz [Burada](https://discord.gg/B6NXcrQmcB) Tanıtıldı! \n\n 12 Saat Sonra Sunucunuzu Tekrardan Tanıtabilirsiniz."
      )
      .setColor("GREEN");
    message.channel.send(embed);
    message.channel.createInvite({ maxAge: 0 }).then(invite => {
      const embed = new Discord.MessageEmbed()
        .addField(` Sunucu Sahibi`, message.author.tag, true)
        .addField(` Sunucu İsmi`, message.guild.name, true)
        .addField(` Sunucudakı Üye Sayısı`, message.guild.members.cache.size, true)
        .addField(` Sunucu Davet Linki`, invite.url, true)
        .setColor("0000c8")
        .setThumbnail(message.guild.iconURL);
      client.channels.cache.get("846679284260274177").send(embed);
    });
    kullanildii[message.guild.id].gunlukkullanim = 1;

    fs.writeFile("./sunucutanıt.json", JSON.stringify(kullanildii), err => {
      if (err) console.error(err);
    });
    return;
  }
  setTimeout(async () => {
    kullanildii[message.guild.id].gunlukkullanim = 0;
    fs.writeFile("./sunucutanıt.json", JSON.stringify(kullanildii), err => {
      if (err) console.error(err);
    });
  }, ms("12h"));

  if (kullanildii[message.guild.id].gunlukkullanim == 1) {
    message.channel.send({
      embed: {
        description:
          "Her 12 saate bir sunucunu tanıtabilirsin."
      }
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucutanıt"],
  permLevel: 4
};
exports.help = {
  name: "sunucu-tanıt",
  description: "Sunuzunuzu Tanıtmak İçin En Uygun Kod!",
  usage: "sunucutanıt"
}; //sunucutanıt.json oluşturup içine {} yazın.
