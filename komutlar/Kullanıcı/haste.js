const discord = require("discord.js");

const fetch = require("node-fetch");

const moment = require("moment");

const sourcebin = require("sourcebin_js");
exports.run = (client, message, args) => {
message.delete();
    const Content = args.join(" ");
    sourcebin
      .create([
        {
          title: "JavaScript Kodu",
          description: 'Kodu yazan"' + message.createdAt + '"',
          name: "Tarafından " + message.author.username,
          content: Content,
          languageId: "JavaScript"
        }
      ])
      .then(src => {
        let embed = new discord.MessageEmbed()
          .setTitle(`Sourcebin`)
          .setColor("RANDOM")
          .setDescription(`Kod:\n${Content}\n\n**[Tıkla](${src.url})**`);
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel.send(`Hata tekrar deneyin`);
      });
  
};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ["hastebin","sourcebin"],

  permLevel: 0,

  kategori: "taslak"

};

exports.help = {

  name: "haste",

  description: "Taslak",

  usage: "taslak"

}