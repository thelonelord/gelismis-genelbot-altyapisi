
const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')

module.exports = async member => {
    const db = require("quick.db")
    let userr = member.client.users.cache.get(member.id);
  let memberChannel = await db.fetch(`gcc_${member.guild.id}`)
  
    // Async function
    // Destructure the guild property from the member object
    const { guild } = member
    // Access the channel ID for this guild from the cache
    //const channelId = getChannelId(guild.id)
    // Access the actual channel and send the message
   
    // Create a canvas and access the 2d context
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')
    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/854725634441216000/854728139728224266/20210616_171635.jpg")
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)
    // Load the user's profile picture and draw it
    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'jpg',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)
    // Display user text
    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '35px sans-serif'
    let text = `Hoşgeldin ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)
    // Display member count
    ctx.font = '30px sans-serif'
    text = `#${guild.memberCount}. Üye`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)
    // Attach the image to a message and send it
    const attachment = new MessageAttachment(canvas.toBuffer())
   if (!member.guild.channels.cache.get(memberChannel)) return;  member.guild.channels.cache.get(memberChannel).send(attachment);
  
}