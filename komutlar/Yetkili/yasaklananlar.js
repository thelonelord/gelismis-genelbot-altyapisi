const Discord = require("discord.js");
const a = require('../../ayarlar.json');
//const talkedRecently = new Set();

exports.run = async(client, message, args) => {
    
    
const bans = new Map();
            message.guild.fetchBans().then(g => {
                bans[g.id] = g;
                let banlist = (`${bans[g.id].map(ge => `\n ${ge.user.tag}`).join('\n')}`)
                        try {     
                let noembed = new Discord.MessageEmbed()
  .setColor(a.renk)
                .setTitle(":no_entry_sign: Yasaklananlar:")
                .setDescription(`• Sunucuda toplam ${g.size} kişi yasaklandı.`)
              //  .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : "https://images-ext-2.discord.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discord.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
              // .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
                if(banlist.length === 0) return message.channel.send(noembed)
                const embed = new Discord.MessageEmbed()
                .setTitle(":no_entry_sign: Yasaklananlar")
                    .setDescription(`• Sunucuda toplam ${g.size} kişi yasaklandı.\n${banlist}`)
                   // .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : "https://images-ext-2.discord.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discord.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
//   .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
                .setColor(a.renk)
                message.channel.send(embed)
                      } catch (err) {
        const embed = new Discord.MessageEmbed()
        .setDescription("Sunucuda bulunan yasaklananlar 1024 karakteri aştığı için gösteremiyorum.")
        //  .addField(`:no_entry_sign: Sunucuda Bulunan Yasaklılar`, '1024 karakter sınırına aşıldı.')
            .setColor(a.renk)
       /*   .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
            .setTimestamp()*/
        message.channel.send(embed)
                      }

        });
    }
                                           
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasak-listesi'],
  permLevel: 4
};

exports.help = {
  name: 'yasaklananlar',
  description: 'Sunucudaki Yasaklı Kullanıcıları Gösterir.',
  usage: 'banlist',
 
};
