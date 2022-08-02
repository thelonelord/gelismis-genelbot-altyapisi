const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (client, message) => {
  message.channel
    .send("R8'i yeniden başlatmak istediğinize emin misiniz?")
    .then(async msg => {
      await msg.react("✅");
      await msg.react("❌");
      let yesFilter = (reaction, user) =>
        reaction.emoji.name === "✅" && user.id === message.author.id;
      let noFilter = (reaction, user) =>
        reaction.emoji.name === "❌" && user.id === message.author.id;
      let yes = msg.createReactionCollector(yesFilter, {
        time: 1000 * 60
      });
      let no = msg.createReactionCollector(noFilter, {
        time: 1000 * 60
      });
      yes.on("collect", async reaction => {
        await reaction.users.remove(message.author);
        await msg.edit("✅ R8 yeniden başlatılıyor.");
        yes.stop();
        no.stop();
        process.exit(0);
      });
      no.on("collect", async reaction => {
        await reaction.users.remove(message.author);
        await msg.edit("❌ R8 yeniden başlatma iptal edildi.");
        yes.stop();
        no.stop();
      });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reboot"],
  permLevel: 5
};

exports.help = {
  name: "yeniden-başlat"
};
