const Discord = require("discord.js");
const data = require("quick.db");
const a = require("../../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          ":pencil: Kullanımı kapatılacak komutunun ismini girmelisin."
        )
        .setColor(a.renk)
    );

  let cmd;
  if (client.commands.has(args[0])) {
    cmd = client.commands.get(args[0]);
  } else if (client.aliases.has(args[0])) {
    cmd = client.commands.get(client.aliases.get(args[0]));
  }

  if (!cmd) return message.channel.send("Komut bulanamadı.");
  if (cmd === "komut-kapat")
    return message.channel.send("Bu komut zaten kapalı.");
  let nbr;
  data.set(`kapalı.${cmd.help.name}.${message.guild.id}`, "oq");
  if (cmd.conf.aliases) {
    nbr = " (" + cmd.conf.aliases.map(c => c).join(", ") + ")";
    cmd.conf.aliases.forEach(s => {
      data.set(`kapalı.${s}.${message.guild.id}`, "oq");
    });
  }

  const aa = Discord.MessageEmbed()
    .setDescription("<:tik8:855417324773179422> Komut kullanıma kapatıldı.")
    .setColor(a.renk);

  message.channel.send(aa);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "komut-kapat"
};
