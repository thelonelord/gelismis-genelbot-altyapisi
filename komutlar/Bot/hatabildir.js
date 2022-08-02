const ayarlar = require("../../ayarlar.json");
const Discord = require("discord.js");
exports.run =  (bot, message, args) => {
  let bug = args.join(" ").slice(0);
  return message.channel.send(
    new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setDescription(":pencil: Bildireceğiz hatanın açıklamasını girmelisin.")
  );
  
  let user = message.author.username;
  let guild = message.guild.name;
  let guildid = message.guild.id;
  let kanal = message.channel.name;
  let kanalid = message.channel.id;
  let channel = bot.channels.cache.get("kanaliz");
  let embed = new Discord.MessageEmbed()
    .setTitle("Hata Bildirisi")
    .addField("Hata", bug)
    .addField("Bildiren", user, true)
    .addField("Sunucu", guild, true)
    .addField("Sunucu ID", guildid, true)
    .addField("Kanal", kanal, true)
    .addField("Kanal ID", kanalid, true)
    .setColor(ayarlar.renk);
  const embed2 = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription(
      `<:tik8:855417324773179422> Hata bildiriminiz iletilmiştir.`
    );
  message.channel.send(embed2);
  channel.send(embed).then(message => {});
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hatabildir", "bugreport", "bildir", "hata", "bug"],
  permLevel: 0,
  kategori: "genel"
};
exports.help = {
  name: "hata-bildir",
  description: "Botla ilgili hataları bildirirsiniz.",
  usage: "bug-bildir"
};
