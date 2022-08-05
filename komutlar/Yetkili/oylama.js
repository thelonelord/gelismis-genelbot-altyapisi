const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
  const ayarlar = require("../../ayarlar.json");
const db = require("quick.db")
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
    
    const aura = (abc) => {
        message.channel.send(
      new Discord.MessageEmbed().setColor(ayarlar.renk).setDescription("Bir hata oluştu.")
    );
    };

   
    try {
        const rif = args.join(' ').split('/')
        const you = rif[0].trim();
        if (!you) return aura('Komudu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`${prefix}oylama [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
        const auraa = rif[1].trim().split(',');
        const auraaa = auraa.length;
        if (auraaa > 10) return aura('Maksimum 10 seçenek koyabilirsiniz.');
        if (auraa.includes(' ')) return aura('Boş bir şık koyamazsınız.')
        
        const pollEmbed = new Discord.MessageEmbed().setTitle('Lütfen bekleyiniz ayarlamalar yapılıyor..');
        const emojies = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        message.channel.send(pollEmbed).then(async pollMsg => {
            for (let auraaaa = 0; auraaaa < auraaa; auraaaa++) {
                pollMsg.react(emojies[auraaaa]);
                pollEmbed.addField(`${emojies[auraaaa]} ${auraa[auraaaa].trim()}`, `\u200B`, true);
            };
            
            pollMsg.edit(pollEmbed.setTitle(you).setFooter('Seçeneğin emojisine tıklayarak oylamaya katılabilirsiniz.'));
        });
    } catch(err) {
        aura('Komudu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`${prefix}oylama [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
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
