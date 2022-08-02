const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')

    , Image = Canvas.Image

    , path = require('path');
const { registerFont, createCanvas } = require('canvas')
registerFont('ay.otf', { family: 'SONGER' })

const snekfetch = require('node-superfetch');
const request = require('node-superfetch');

module.exports = async member => {
    var randomMsg = [];
    var randomMsg_integer = randomMsg[Math.floor((Math.random() * randomMsg.length))]

  let msj = await db.fetch(`girisM_${member.guild.id}`)
let user = member.client.users.cache.get(member.id);
  let memberChannel = await db.fetch(`gcc_${member.guild.id}`)
  
  const canvas = Canvas.createCanvas(1280, 720);
  const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/809498334946656276/849632925568860230/20210602_155631.jpg');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
 
   ctx.fillStyle = `#ffffff`;
  ctx.font = `80px "SONGER"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username.toUpperCase()}`, 640, 350);
 
 let avatarURL = member.user.avatarURL({ format: "jpg" }) || member.user.defaultAvatarURL
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
  
ctx.beginPath();
	ctx.lineWidth = 0;
  ctx.fill()
	ctx.lineWidth = 0;
	ctx.arc(580 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
	ctx.clip();
	ctx.drawImage(avatar, 580, 55, 110, 110);
  
  
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hosgeldin.png');
  if (!member.guild.channels.cache.get(memberChannel)) return


 const embed = new Discord.MessageEmbed()
  .setColor("#0000c8")

      .setDescription(
        `<a:sekilligalp:727045194033266730> ${member.user.username} Adlı Gold üye Katıldı. <a:sekilligalp:727045194033266730>`
      );
     if (db.has(`üyelikk_${user.id}`)) {
    if (!member.guild.channels.cache.get(memberChannel)) return;
  member.guild.channels.cache.get(memberChannel).send(attachment) 
         member.guild.channels.cache.get(memberChannel).send(embed)
     } else return


}