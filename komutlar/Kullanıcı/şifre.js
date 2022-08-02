const Discord = require("discord.js");
const db = require("quick.db");
const a = require("../../ayarlar.json");
const generator = require("generate-password");

exports.run = function(client, message, args) {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  var uzunluk = args.slice(0).join(" ");

  if (!uzunluk)
    return message.channel.send(
      new Discord.MessageEmbed()
      .setColor(a.renk)
      .setDescription(
        `:1234: Şifrenizin karakter uzunluğunu sayı ile belirtmelisiniz.\nÖrnek: ${prefix}şifre 16`
      )
    );

  var password = generator.generate({
    length: uzunluk,
    numbers: true
  });
message.channel.send(
  new Discord.MessageEmbed()
  .setColor(a.renk)
  .setDescription("🔒 Şifreniz direk mesajınıza gönderildi.")
          
  
  )
  message.author.send(
    new Discord.MessageEmbed()
    .setColor(a.renk)
    .setDescription(`🔒 Şifren ${password}\n**Şifreni kimseyle paylaşma.**`));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["şifre-oluştur", "şifre"],
  permLevel: 0
};

exports.help = {
  name: "Şifre",
  description: "Rastgele bir şifre oluşturur.",
  usage: "Şifre "
};
