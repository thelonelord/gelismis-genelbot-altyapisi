const Discord = require("discord.js");
const data = require("quick.db");
const a = require("../../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(a.renk)
        .setDescription(":pencil: Kullanımı açılacak komutun ismini girmelisin.")
    );

  let cmd;
  if (client.commands.has(args[0])) {
    cmd = client.commands.get(args[0]);
  } else if (client.aliases.has(args[0])) {
    cmd = client.commands.get(client.aliases.get(args[0]));
  }

  if (!cmd) return message.channel.send("Komut bulamadı.");
  if (cmd === "komut-aç") return message.channel.send("Komut kapatılmamış..");

  let nbr;
  data.delete(`kapalı.${cmd.help.name}.${message.guild.id}`);
  if (cmd.conf.aliases) {
    nbr = " (" + cmd.conf.aliases.map(c => c).join(", ") + ")";
    cmd.conf.aliases.forEach(s => {
      data.delete(`kapalı.${s}.${message.guild.id}`);
    });
  }
const emj = new Discord.MessageEmbed()
.setDescription("<:tik8:855417324773179422> Komut bkullanıma açıldı.")
.setColor(a.renk)




  message.channel.send(emj);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "komut-aç"
};
