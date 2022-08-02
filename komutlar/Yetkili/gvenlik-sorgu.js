const Discord = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(950, 280);
const ctx = canvas.getContext("2d");
const request = require("node-superfetch");

exports.run = async (client, message, args) => {
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");
  let uye = message.mentions.users.first() || message.author;

  let gkisi = client.users.cache.get(uye.id);
  const ktarih = new Date().getTime() - gkisi.createdAt.getTime();
  ctx.font = "italic 43px Arial";
  ctx.textalign = "center";
  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/847461445854953532/852821306936262666/20210611_110655.jpg"
  );
  const { body } = await request.get(
    gkisi.avatarURL({ format: "png" }) || gkisi.defaultAvatarURL
  );
  const pp = await Canvas.loadImage(body);
  const çerçeve = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/847461445854953532/852819939304013824/20210611_105909.jpg"
  );

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(çerçeve, 685, 15, 250, 250);
  ctx.drawImage(pp, 700, 30, 220, 220);

  var kontrol;
  if (ktarih > 1296000000) kontrol = ctx.fillStyle = "#12ff51";
  if (ktarih < 1296000000) kontrol = ctx.fillStyle = "#fa3455";
  var kontrol2;
  if (ktarih > 1296000000)
    kontrol2 = ctx.fillText("Bu Kullanıcı Güvenli ✅", 10, 180);
  if (ktarih < 1296000000)
    kontrol2 = ctx.fillText("Bu Kullanıcı Şüpheli ❌", 10, 180);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "italic 50px Arial";

  ctx.fillText(`${gkisi.tag}`, 10, 120);

  const sorgu = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "güvenlik-sorgu.png"
  );
  message.channel.send(sorgu);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "güvenlik-sorgu",
    "güvenliksorgu",
    "güvenilirliksorgu",
    "güvenilirlik-sorgu"
  ],
  kategori: "moderasyon",
  permLevel: 1
};

exports.help = {
  name: "güvenlik-sorgu",
  description: "Güvenliğinnizi / Seçtiğiniz kişinin güvenliğini sorgular.",
  usage: "güvenliksorgu [@kişi]"
};
