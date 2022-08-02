const ms = require('ms');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {

    if(!args[0]){
        return message.channel.send('Çekiliş IDsi girmelisin.');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Bu ID ile çekiliş bulunmuyor`'+ args.join(' ') + '`.');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('Çekiliş kısa sürede bitecek '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' saniye...').then(a => a.delete({timeout: 10000}));
    })
    .catch((e) => {
        if(e.startsWith(`${giveaway.messageID} ID'li çekiliş zaten bitti.`)){
            message.channel.send('Bu çekiliş çoktan sona erdi!');
        } else {
            console.error(e);
            message.channel.send('Bir hata oluştu...');
        }
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çekiliş-sil'],
  permLevel: 4
  
};

exports.help = {
  name: 'çekiliş-bitir',
  description: 'çekiliş',
  usage: 'çekiliş-bitir'
};