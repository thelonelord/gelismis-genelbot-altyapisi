const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../../ayarlar.json')

exports.run = async (client, message, args) => {
      let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

 //   if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Bu komutu kullanabilmek için "Sunucuyu Yönet" Yetkisine Sahip Olmalısın!')  

   let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.join(' '))
  let newRole;
  let tworole;
  if (!rol){
    const hata = new Discord.MessageEmbed()
//    .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`Rol belirtmeniz gerekiyor! \n\n**Örnek Kullanım:** \n\`\`\`${prefix}isim-yetkili-role @roletiket\`\`\``) 
    .setColor('RED')
 //   .setTimestamp()
    return message.channel.send(hata)
      }
  else newRole = message.mentions.roles.first().id
  let isim = message.mentions.roles.first().name  
    db.set(`kayıtisim.${message.guild.id}`, isim)
  let otorol = await db.set(`isimyetkiliRol.${message.guild.id}`, newRole)
  if (!message.guild.roles.cache.get(newRole)) {
    const hata = new Discord.MessageEmbed()
   // .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`Etiketlediğiniz rol bulunamadı, etiketlediğiniz rolün etiketlenebilirliğinin aktif olduğundan emin olunuz`) 
    .setColor('RED')
//    .setTimestamp()
    return message.channel.send(hata)
      } 
const embed = new Discord.MessageEmbed()
//.setAuthor(`Başarılı!`, message.author.avatarURL())
.setDescription(`İsim kayıt sistemin de kullanılacak olan **yetkili** rolü <@&${newRole}> olarak seçildi!`)
//.setTimestamp()
.setColor("GREEN")

 return message.channel.send(embed)

};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['isimyetkilirol','yetkili-rol','isimyetkilirol','isimyetkili'],
    permLevel: 8
}

exports.help = {
    name: 'isim-yetkili-role',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'teyit-kayıtsız-rol'
}