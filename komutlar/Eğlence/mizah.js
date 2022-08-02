const { MessageAttachment } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");


exports.run = async (client, message, args) => {
  
  const a = require("../../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || a.prefix;
  
  let yazı = args.slice(0).join(" ");
  if (!yazı) return message.channel.send(new Discord.MessageEmbed()
                                        .setColor(a.renk).setDescription(`:pencil: Oluşturulacak mizah yazısını girmelisin.\n${prefix}mizah Metin 1 , Metin 2`));
  if (!yazı.includes(","))
    return message.channel.send(
      `Metni  \`,\` (virgül) ile ayırmalısın.`
    );
  let s = yazı.split(",");
  let link = `https://api.devs-hub.xyz/drake?top=${s[0]}&bottom=${s[1]}`;
  let encode = encodeURI(link);

  message.channel.send(new MessageAttachment(encode, `mizah.png`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mizah"],
  permLevel: 0
};

exports.help = {
  name: "mizah-yap"
};
