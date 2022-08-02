const snekfetch = require('node-superfetch')
const Discord = require('discord.js')
const a = require('../../ayarlar.json')
const cd = new Set();
exports.run = (client, message, args) => {
  
  
    


 if (cd.has(message.author.id)) {
           return message.channel.send(new Discord.MessageEmbed()

.setDescription(`Bu komutu tekrar kullanabilmek için 5 saniye beklemelisin`)
.setColor("#0000c8")
);
    } else {


        cd.add(message.author.id);
        setTimeout(() => {
        message.delete();
         
          cd.delete(message.author.id);
        }, 5000);
    }
  
  
  let [title,ehe] = args.join(" ").split("-");
  if(!ehe) {
    [title,ehe] = ["Basarim Edinildi", title];
  }
  
  //if(['ç', 'ö', 'ü', 'ş', 'İ', 'I', 'ğ', 'Ç', 'Ö', 'Ü', 'Ş', 'Ğ'].includes(title)) return msg.channel.send('Türkçe karakter kullamayın');
  
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;
  if(args.join(" ").toLowerCase().includes("sword")) rnd = 34;
  if(title.length > 22 || ehe.lenght > 22 ) return message.edit(new Discord.MessageEmbed().setColor(a.renk).setDescription("<:engel8:855416305028300800> Malesef oluşturulacak başarım resmi 22 karakteri geçmemeli."))//.then(message.delete.bind(message), 2000);

  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(ehe)}`;

  snekfetch.get(url)
   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
//  message.delete();
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["mc-başarı"]
};

exports.help = {
  name: 'mcbaşarı',
  description: 'Minecraft başarımı gönderir.',
  usage: 'başarım Title|Text (/achievement Achievement Get|Used a Command!)'
};