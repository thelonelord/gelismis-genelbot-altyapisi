const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
  const ayarlar = require("../../ayarlar.json");
const db = require("quick.db")
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
    
    const laura = (abcdef) => {
        message.channel.send(
      new Discord.MessageEmbed().setColor(ayarlar.renk).setDescription("Bir hata oluştu.")
    );
    };

   
    try {
        const rifleman = args.join(' ').split('/')
        const youthanasia = rifleman[0].trim();
        if (!youthanasia) return laura('Komudu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`${prefix}poll [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
        const lauraa = rifleman[1].trim().split(',');
        const lauraaa = lauraa.length;
        if (lauraaa > 10) return laura('Maksimum 10 seçenek koyabilirsiniz.');
        if (lauraa.includes(' ')) return laura('Boş bir şık koyamazsınız.')
        
        const pollEmbed = new Discord.MessageEmbed().setTitle('Lütfen bekleyiniz ayarlamalar yapılıyor..');
        const emojies = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        message.channel.send(pollEmbed).then(async pollMsg => {
            for (let lauraaaa = 0; lauraaaa < lauraaa; lauraaaa++) {
                pollMsg.react(emojies[lauraaaa]);
                pollEmbed.addField(`${emojies[lauraaaa]} ${lauraa[lauraaaa].trim()}`, `\u200B`, true);
            };
            
            pollMsg.edit(pollEmbed.setTitle(youthanasia).setFooter('Seçeneğin emojisine tıklayarak oylamaya katılabilirsiniz.'));
        });
    } catch(err) {
        laura('Komudu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`${prefix}oylama [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oylama'],
  permLevel: 2
};

exports.help = {
  name: "poll"
};