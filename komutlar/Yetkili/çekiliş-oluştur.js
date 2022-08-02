const ms = require('ms')
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => { 
let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(`${prefix}çekiliş #kanal 1h 1 Steam Anahtar`);
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`${prefix}çekiliş #kanal 1h 1 Steam Anahtar`);
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners)){
        return message.channel.send(`${prefix}çekiliş #kanal 1h 1 Steam Anahtar`);
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send(`${prefix}çekiliş #kanal 1h 1 Steam Anahtar`);
    }

 client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: parseInt(args[2]),
            hostedBy: message.author,
            messages: {
            giveaway: "Çekiliş",
                giveawayEnded: "Çekiliş sona erdi!",
                timeRemaining: "Kalan süre: **{duration}**!",
                inviteToParticipate: "🎉 emojisine basarak katıl!",
                winMessage: "Tebrikler, {winners}! **{prize}** kazandınız!",
                embedFooter: "Çekiliş",
                noWinner: "Kimse kazanamadı!",
                hostedBy: "Çekiliş sponsoru: {user}",
                winners: "kazanan(lar)",
                endedAt: "Bitiş tarihi",
units: {
                    seconds: "Saniye",
                    minutes: "Dakika",
                    hours: "Saat",
                    days: "Gün",
                    pluralS: false 
                }
            }
        });

    message.channel.send(`**Çekiliş** ${giveawayChannel} kanalında oluşturuldu.`).then(a => a.delete({timeout: 10000}));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çekiliş','çekilis','çekiliş oluştur'],
  permLevel: 4
};

exports.help = {
  name: 'çekiliş-oluştur',
  description: 'Ã§ekiliÅŸ',
  usage: 'Ã§ekiliÅŸ-yap'
};
