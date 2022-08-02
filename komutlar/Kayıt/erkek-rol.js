const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
          const ayarlar = require('../../ayarlar.json')
				    let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
        //    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Bu komutu kullanabilmek için "Sunucuyu Yönet" Yetkisine Sahip Olmalısın!')  

  const rol = message.mentions.roles.first()
  
  if (!rol)  {
    const hata = new Discord.MessageEmbed()
   // .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`Rol belirtmeniz gerekiyor! \n\n**Örnek Kullanım:** \n\`\`\`${prefix}erkek-rol <@Rol>\`\`\``) 
    .setColor('RED')
  //  .setTimestamp()
    return message.channel.send(hata)
      
  }
  db.set(`isimerkekRol.${message.guild.id}`, rol.id)
  const embed = new Discord.MessageEmbed()
 // .setAuthor(`Başarılı!`, message.author.avatarURL())
  .setDescription(`İsim kayıt sisteminde kullanılacak olan **erkek** rolü: <@&${rol.id}> olarak seçildi!`)
//  .setTimestamp()
  .setColor("GREEN")
  
   return message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek-rol"],
  permLevel: 0
};

exports.help = {
  name: 'isim-erkek-role',
  description: 'Kişi susturulunca verilecek rolü ayarlarsınız.',
  usage: 'mute-rol',
};