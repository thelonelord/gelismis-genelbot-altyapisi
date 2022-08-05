const Discord = require("discord.js");
const db = require("quick.db");
const bot = new Discord.Client();
exports.run = async(client, message, args) => {
    let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
try { 

  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("**MESAJLARI_YÖNET** yetkim yok.");

const commands = [

`bot\` - Botlar tarafından gönderilen mesajları silin. (insanlarınkini silmez)`, 

`üye\` - Üyeler tarafından gönderilen mesajları silin. (Botları yoksayar)`,

`embedler\` - Embed içeren mesajları silin.`,

`dosyalar\` - Dosya/resim/ek içeren mesajları silin.`,

`etiketler\` - Üye/kullanıcı/kanal/rolden bahsetmeleri içeren mesajları silin.`,

`sabitlenmiş\` - Sabitlenmiş mesajları silin.`,

`metin\` - Yalnızca metin içeren mesajları silin. (Dosyaları/resimleri/ekleri, yerleştirmeleri yok sayar)`,

`içeren\` <metin> - Metin içeren mesajları sil.` ,

`içermiyen\` <metin> - Metin içermeyen mesajları silin.`,

`başlayan\` <metin> - Metin ile başlayan mesajları sil.`,

`biten\` <metin> - Metin ile biten mesajları sil.`

]

const embd = new Discord.MessageEmbed() 

.setColor("BLUE") 

.setTitle("Süpür | Sil | Temizle") 

.setDescription(`Bir kanaldan birkaç mesaj silin. (Sabitlenmiş mesajları yok sayar ve limit 100'dür)`) 

.addField("Kullanım", `\`${prefix}sil <miktar>\` - Mesaj siler.\n\`${prefix}sil <miktar> --${commands.join(`\n\`${prefix}sil <miktar> --`)}`) 

.setFooter(`${prefix}süpür, ${prefix}sil, ${prefix}temizle`) 

if(!args[0] || !args.length) return message.channel.send(embd);

let amount = Number(args[0],10) || parseInt(args[0]);

if(isNaN(amount) || !Number.isInteger(amount)) return message.channel.send("Silinecek mesaj sayısını yazın.");

if(!amount || amount < 2 || amount > 100) return message.channel.send("Lütfen 2 ile 100 arasında sayı girin.")

if(!args[1]) {

try {

  await message.delete()

await message.channel.bulkDelete(amount).then(async (m) => { 

  

   let embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:4000})); 

})

   } catch (e) { 

     console.log(e) 

     message.channel.send(`14 günden eski mesajları silemem.`)

     

   }

} else if(args[1]) {

  let msg;

  let data;

  let embed;

  switch(args[1]) {

    case "--bot":

     msg = await message.channel.messages.fetch({limit: amount})

    data = []

    msg.map(m => m).forEach(ms => {

      if(ms.author.bot && !ms.pinned) data.push(ms)

    })

   

   try {

     await message.delete()

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

      embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

     case "--üye":

     msg = await message.channel.messages.fetch({limit: amount})

     data = []

    msg.map(m => m).forEach(ms => {

      if(!ms.author.bot && !ms.pinned) data.push(ms)

    })

    

   try {

     

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

      embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

case "--embedler":

     msg = await message.channel.messages.fetch({limit: amount})

     data = []

    msg.map(m => m).forEach(ms => {

      if(ms.embeds.length && !ms.pinned) data.push(ms)

    })

    

   try {

     

      await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅  **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

case "--dosyalar":

     msg = await message.channel.messages.fetch({limit: amount})

     data = []

    msg.map(m => m).forEach(ms => {

      if(ms.attachments.first() && !ms.pinned) data.push(ms)

    })

    

   try {

  

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;case "--metin":

    msg = await message.channel.messages.fetch({limit: amount})

    data = []

    msg.map(m => m).forEach(ms => {

      if(!ms.attachments.first() && !ms.embeds.length && !ms.pinned) data.push(ms)

    })

    

   try {

     

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅  **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

  case "--etiketler":

     msg = await message.channel.messages.fetch({limit: amount})

  data = []

    msg.map(m => m).forEach(ms => {

      if((ms.mentions.users.first() || ms.mentions.members.first() || ms.mentions.channels.first() || ms.mentions.roles.first())&& !ms.pinned) data.push(ms)

    })

    

   try {

 

       await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅  **${m.size}**/**${amount}** mesaj silindi`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

case "--sabitlenmiş":

    msg = await message.channel.messages.fetch({limit: amount})

     data = []

    msg.map(m => m).forEach(ms => {

      if(ms.pinned) data.push(ms)

    })

    

   try {

     

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

      embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

case "--içeren":

     msg = await message.channel.messages.fetch({limit: amount})

    data = []

    msg.map(m => m).forEach(ms => {

if(!args[2]) return message.channel.send(embd);

      if(ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)

    })

    

   try {

    

     

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

case "--içermeyen":

    msg = await message.channel.messages.fetch({limit: amount})

     data = []

    msg.map(m => m).forEach(ms => {

if(!args[2]) return message.channel.send(embd);

      if(!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)

    })

    

   try {

     

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

case "--başlayan":

     msg = await message.channel.messages.fetch({limit: amount})

     data = []

    msg.map(m => m).forEach(ms => {

if(!args[2]) return message.channel.send(embd);

      if(ms.content.startsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)

    })

    

   try {

     

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

case "--biten":

     msg = await message.channel.messages.fetch({limit: amount})

     data = []

    msg.map(m => m).forEach(ms => {

if(!args[2]) return message.channel.send(embd);

      if(ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)

    })

    

   try {

     

     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

      

       embed = new Discord.MessageEmbed()

  .setColor('0x#00ffff')

  .setDescription(`✅ **${m.size}**/**${amount}** Mesaj silindi.`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 

      })

      

   } catch (e) { 

     console.log(e)

   message.channel.send(`14 günden eski mesajları silemem.`) 

   }

      break;

default:

return message.channel.send(embd) 

break;

}

} else {

 return message.channel.send(`Bir hata oluştu.`)

}

} catch (error) {

  console.log(error)

  message.channel.send(`Bir hata oluştu: \`${error}\``)

}
};







exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ["sil","temizle","clear"],

  permLevel: 4,

  kategori: "taslak"

};

exports.help = {

  name: "süpür",

  description: "Taslak",

  usage: "taslak"

}
