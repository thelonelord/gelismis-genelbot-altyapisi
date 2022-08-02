const ms = require('ms');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {

let messageID = args[0]
    if(!messageID){
        return message.channel.send(`Bir çekiliş ID'si **belirtmelisin!**`);
    }
client.giveawaysManager.reroll(messageID, {
    messages: {
        congrat: ":tada: Yeni kazanan(lar): {winners}! Tebrikler!",
        error: "Katılım yok, kazanan seçilemez!"
                    }   
}).catch((err) => {
    message.channel.send(`"+ messageID +" Id'li çekiliş bulunamadı`);
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çekiliş-reroll','çekilid-ys'],
  permLevel: 4
};

exports.help = {
  name: 'çekiliş-yenile',
  description: 'çekiliş',
  usage: 'çekiliş-tekrar'
};