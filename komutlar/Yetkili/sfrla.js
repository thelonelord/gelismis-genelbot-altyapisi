const Discord = require("discord.js");
const talkedRecently = new Set()
exports.run = async (client, message, args) => {

  if (talkedRecently.has(message.author.id)) {
    return message.channel.send(
      new Discord.MessageEmbed()

        .setDescription(
          `Bu komutu tekrar kullanabilmek için 60 saniye beklemelisin`
        )
        .setColor("#0000c8")
    );
  } else {
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      message.delete();

      talkedRecently.delete(message.author.id);
    }, 60000);
  }

  const onayembed = new Discord.MessageEmbed()
    .setColor("#0000c8")

    .setFooter(
      "Onaylamak için ✅ emojisine, İptal etmek için ❌ emojisine tıklayabilirsin."
    ).setDescription(`:warning: Bu kanalı silip tekrar oluşturmaya emin misin?
• Belirtmek için 30 saniyeniz vardır.`);
  message.channel.send(onayembed).then(msg => {
    msg.react("✅").then(() => msg.react("❌"));

    const filter = (reaction, user) => {
      return (
        ["✅", "❌"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    msg
      .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === "✅") {
          message.channel.clone({ position: message.channel.position });
          message.channel.delete();
        } else {
          message.reply("Sıfırlama işlemi iptal edildi!");
          msg.delete({ timeout: 3000 });
        }
      })
      .catch(collected => {
        message.reply("Bir hata oluştu.");
      });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sıfırla"],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = {
  name: "nuke",
  description: "Bot bulunduğunuz kanalı siler ve yeniden oluşturur.",
  usage: "nuke"
};
