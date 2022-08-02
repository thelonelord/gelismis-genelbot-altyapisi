const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json")

exports.run = function(client, message, args) {
  let type = args.slice(0).join(" ");
return message.channel.send(
    new Discord.MessageEmbed()
   .setColor(ayarlar.renk) 
.setDescription(`📮 Lütfen bildireceğiniz öneriyi yazınız.`)
  );
  
  message.channel.send(
    new Discord.MessageEmbed()
     .setColor(ayarlar.renk)                  
    .setDescription(`Öneri gönderilsin mi?\nOnaylamak için **evet** yazın.`)
    )
    .then(() => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.channel.send(new Discord.MessageEmbed()
            .setDescription(`<:tik8:855417324773179422> Öneriniz iletilmiştir.`)
          );
          const embed2 = new Discord.MessageEmbed()
            .setColor("GREEN")
            .addField(`🆔 Kullanıcı ID`, message.author.id, true)
            .addField(`Kullanıcı Adı`, message.author.username, true)
            .addField(`Kullanıcı Tagı`, message.author.discriminator, true)
            .addField(`Sunucu`, message.guild.name, true)
            .addField("Öneri", type)
            .setTimestamp()
            .setFooter("Öneriyi gönderdiği saat ")
            .setThumbnail(message.author.avatarURL());

          client.channels.cache.get("kanalidniz").send(embed2);
        });
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "genel",
  permLevel: 0
};

exports.help = {
  name: "öneri",
  description: "Bot için tavsiye bildirirsiniz",
  usage: "tavsiye <tavsiyeniz>"
};
