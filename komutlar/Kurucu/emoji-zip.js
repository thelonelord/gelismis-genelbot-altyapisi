const Discord = require("discord.js");
const fs = require('fs');
const axios = require('axios');
const prettyMilliseconds = require('pretty-ms');
const AdmZip = require('adm-zip')


exports.run = async (client, message, args) => {
    const error = (str) => message.channel.send(new Discord.MessageEmbed().setColor('RED').setTitle('Hata').setDescription(str));

    const yuzdeHesapla = (p1, p2) => {
        const yapilan = p2 - p1;
        return ((yapilan * 100) / p2).toFixed(2)
    };

    const yaklasikSure = (count) => {
        const toplamSure = 2000 * count;
        const tahminiSureIng = prettyMilliseconds(toplamSure);
        const tahminiSureTr = tahminiSureIng
            .replace(/s/g, ' saniye')
            .replace(/m/g, ' dakika')
            .replace(/h/g, ' saat')
            .replace(/ms/g, ' milisaniye');


        return tahminiSureTr;
    };

    const downloadImage = (url, imagePath) =>
        axios({
            url,
            responseType: 'stream',
        }).then(
            response =>
                new Promise((resolve, reject) => {
                    response.data
                        .pipe(fs.createWriteStream(imagePath))
                        .on('finish', () => resolve())
                        .on('error', e => reject(e));
                }),
        );

    const name = args[0];
    if (!name) return error('Aratılacak emojinin adını girin.');
    const emojis = client.emojis.cache.filter(e => e.name.trim().toLowerCase() == name.trim().toLowerCase());

    if (emojis.size == 0) return error('Girilen isimde herhangi bir emoji bulunamadı.')
    message.channel.send(new Discord.MessageEmbed().setTitle('Onaylıyor musunuz?').setColor('GREEN').setDescription(`**${emojis.size} adet** emoji indirilip, ZIP dosyası olarak verilecek.`)).then(m => {
        m.react('✅');
        m.react('❌');
        const emojies = ['✅', '❌'];
        const filter = (reaction, user) => {
            return emojies.includes(reaction.emoji.name) && message.author.id == user.id;
        };

        const collector = m.createReactionCollector(filter, { max: 1, time: 30000 })
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case '✅':
                    m.reactions.removeAll();
                    fs.promises.mkdir('emojiler')
                    var yuklenen = 1; kalan = emojis.size;
                    emojis.forEach(async emoji => {
                        const timeout = setTimeout(async () => {
                            var emojiURL = emoji.url, emojiAd = emoji.name, emojiUzanti = emoji.url.split('.')[3].trim();
                            await downloadImage(emojiURL, `emojiler/${emojiAd}.${emojiUzanti}`);
                            await m.edit(new Discord.MessageEmbed().setTitle('Emoji İndirme').setColor('GREEN').addField('Toplam Emoji Sayısı', emojis.size, true).addField('Kaç Emoji Kaldı', kalan).addField('Yüzdelik', `Yüklenen: %${yuzdeHesapla(kalan, emojis.size)}`).setFooter(`yaklaşık ${yaklasikSure(kalan)} süre kaldı`))
                            await clearTimeout(timeout)
                            kalan = kalan - 1;
                            if (kalan == 0) {
                                const file = new AdmZip();
                                file.addLocalFolder('./emojiler', 'emojilerr');
                                fs.writeFileSync('/emoji.zip', file.toBuffer());
                                const embed = new Discord.MessageEmbed().setTitle('Emoji İndirme').setColor('GREEN').setDescription(`**İşlem tamamlandı!** Toplam **${emojis.size} adet** emoji indirildi.`)
                                m.edit(embed);
                                message.channel.send({
                                    files: [{ name: 'emojii.zip', attachment: '/emoji.zip' }]
                                }).then(() => {
                                    fs.promises.rmdir('emojiler', { recursive: true }).then(() => console.log("Emojler klasörü silindi"))
                                });
                            }
                        }, yuklenen * 2000);
                        yuklenen = yuklenen + 1;
                    });
                    break;
                case '❌':
                    m.reactions.removeAll();
                    m.edit(new Discord.MessageEmbed().setColor('RED').setDescription(`İşlem kullanıcı isteğiyle iptal edildi.`));
                    break;
            };
        });

        collector.on('end', collected => {
            if (collected.size == 0) {
                m.reactions.removeAll();
                m.edit(new Discord.MessageEmbed().setColor('RED').setDescription(`30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
            }
        });
    });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ea', 'emojiara'],
    permLevel: 5
};

exports.help = {
    name: 'emoji-ara',
    description: ''
};

