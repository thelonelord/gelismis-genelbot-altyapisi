const { MessageEmbed } = require('discord.js')
const Discord = require ('discord.js')
const db = require('quick.db')

   exports.run = async(client, message, args) => {
     
     const a = require("../../ayarlar.json")
let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

/*const pr = new Discord.MessageEmbed()
.setColor(a.renk)
.setDescription (`⛔ Ne yazıkki **Snipe** komutu premium paketine özeldir. Premium ile ilgili bilgileri öğrenmek için ${prefix}premium.`)
  let kod = db.fetch(message.guild.id);
  if (kod) {
  } else {
    return message.channel.send(pr);
  }*/

  
    const e = await db.fetch(`snipe.id.${message.guild.id}`)
    if(!e) {
    const c = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`:recycle: Henüz mesaj silinmemiş`)
.setColor(a.renk)
    message.channel.send(c);
          } else {
  let kullanıcı = client.users.cache.get(e);
  const fetche = await db.fetch(`snipe.mesaj.${message.guild.id}`)
  const msj = new MessageEmbed()
  .setAuthor(kullanıcı.username, kullanıcı.avatarURL())
  .setDescription(`:recycle: Son Silinen mesaj: ` + fetche)
.setColor(a.renk)
  message.channel.send(msj) }
}
exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}
exports.help = {
  name: "snipe",
  description: 'Son silinen mesajı yakalar.',
  usage: 'snipe'
} 