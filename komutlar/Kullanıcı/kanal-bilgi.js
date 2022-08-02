const Discord = require("discord.js");

exports.run = (client, message, params, args) => {
  const Moment = require("moment");

  const channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]) ||
    message.channel;
  const date = `${Moment(channel.createdAt).format("LL")} | (${Moment(
    channel.createdAt
  ).fromNow()})`;
  const type = channel.type
    .replace("text", "Metin")
    .replace("voice", "Sesli")
    .replace("category", "Kategori");

  if (!channel) {
    return message.channel.send("Kanal etiketleyin veya ismini girin!");
  }

  const Embed = new Discord.MessageEmbed().setColor("BLUE").addFields([
    {
      name: "Kanal İsmi",
      value: channel.name
    },
    {
      name: "Kanal IDsi",
      value: channel.id
    },
    {
      name: "Kanal Türü",
      value: type
    },
    {
      name: "Kanalın Bulunduğu Kategori",
      value: channel.parent.name
    },
    {
      name: "Kanal Sırası",
      value: `${channel.position}/${message.guild.channels.cache.size}`
    },
    {
      name: "Kanal Yavaşmod Süresi",
      value: channel.rateLimitPerUser
        ? channel.rateLimitPerUser
        : "Bu kanalda yavaş mod yok!"
    },
    {
      name: "Kanal NSFW mi",
      value: channel.nsfw ? "Evet" : "Hayır"
    }//,

/*    {
      name: "Kanal Oluşturulma Tarihi",
      value: date
    }*/
  ]);

  message.channel.send(Embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["channel-info", "kanalbilgi"],
  permLevel: 0,
  kategori: "taslak"
};

exports.help = {
  name: "kanal-bilgi",
  description: "Taslak",
  usage: "taslak"
};
