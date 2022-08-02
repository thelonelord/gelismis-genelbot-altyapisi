const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  
  const ayarlar = require('../../ayarlar.json');
 let prefix =
    (db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  
  const db = require("quick.db");
if (!message.guild.me.permissions.has("KICK_MEMBERS"))


    return message.reply(

      "Kullanıcıyı Atamıyorum Çünkü `Üyeleri At` Yetkim Yok."

    );
  // if (!message.guild.members.cache.get(client.user.id).hasPermission("KICK_MEMBERS")) return message.reply('Gerekli izniniz bulunmuyor')
  //if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`);

  let user = message.mentions.users.first() || message.member.id;
  let reason = args.slice(1).join(" ");
  /*if (db.has(`log_${message.guild.id}`) === false)
    return message.reply("Mod log kanalı ayarlanmamış");*/
  let modlog = message.guild.channels.cache.get(
    db
      .fetch(`log_${message.guild.id}`)
      .replace("<#", "")
      .replace(">", "")
  );
  if (message.mentions.users.size < 1)
    return message.reply(
      new Discord.MessageEmbed()
        .setTitle("Komut : Atma")
        .setColor("RED")
        .setDescription(
          `İşlem Geçersiz\nUygun Kullanım ${prefix}at <@kullanıcı>,\n${prefix}at <@kullanıcı> <sebep>.`
        )
    );
  if (user.id === message.author.id)
    return message.reply("Kendini atamazsın.");
  /*if (user.roles.highest.position > message.member.roles.highest.position - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  //if (!message.guild.member(user).kickable) return message.channel.send(`Bu kişiyi sunucudan atamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);

  /*const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("İşlem", "KİCK")
    .addField("Kicklenen üye/tag", `${user.tag} (${user.id})`)
    .addField(
      "Kickleyen yetkili",
      `${message.author.username}#${message.author.discriminator}`
    )
    .addField("Kick sebebi", "```" + reason + "```");
  modlog.send(embed);*/

  message.guild.member(user).kick();

  const embed2 = new Discord.MessageEmbed()
    .setColor("#0000c8")
    .setDescription(`Üye başarıyla sunucudan atıldı`);
  message.channel.send(embed2);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kick"],
  permLevel: 2,
  kategori: "moderasyon"
};

exports.help = {
  name: "at",
  description: "İstediğiniz kişiyi sunucudan atar.",
  usage: "at <@kullanıcı> <sebep>"
};
