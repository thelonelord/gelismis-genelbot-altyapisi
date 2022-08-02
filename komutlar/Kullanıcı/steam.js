
const Discord = require('discord.js')
var steam = require('steam-provider')
const ayarlar = require("../../ayarlar.json")
const db = require("quick.db")
var provider = new steam.SteamProvider();

exports.run = (client, message, args) => {
  
  let p = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
    let game = args[0]

const oyuni = new Discord.MessageEmbed()
 .setColor(ayarlar.renk)   
.setDescription(`:pencil: Steamda olan bir oyun ismi girmelisin\n${p}steam <oyun adı>`)    



    const oyunb = new Discord.MessageEmbed()
.setColor(ayarlar.renk)
.setDescription("💣 Ne yazıkki belirttiğiniz oyun steamda bulunamadı\nOyun isminin doğru olduğundan emin olunuz.")
 // let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png"

    if (!game) return message.channel.send(new Discord.MessageEmbed()
                                   .setColor(ayarlar.renk)    
.setDescription(`:pencil: Steamda olan bir oyun ismi girmelisin
${p}steam <oyun ismi>`)   
                                          )

    provider.search(game).then(result => {
        provider.detail(result[0].id, "turkey", "tr").then(results => {
            console.log(results)
            const embed = new Discord.MessageEmbed()
               // .setAuthor('Steam Mağazası:', steampng)
                .setColor(ayarlar.renk)
            //.setImage(`https://cdn.akamai.steamstatic.com/steam/apps/${result[0].id}/header.jpg?t=1625`)
                .setTitle(`📰 ${result[0].name} Adlı Oyunun Bilgileri`)
             //   .addField(`🆔 Oyunun ID'si:`, result[0].id)
                .setImage(results.otherData.imageUrl)
                .addField('🔗 Türleri:', results.genres)
                .addField(':ticket: Fiyatı:', `Normal Fiyat: **${results.priceData.initialPrice}** TL
İndirimli Fiyat: **${results.priceData.finalPrice}** TL`, true)
                .addField(':computer: Platformlar:', results.otherData.platforms, true)
                .addField('🏆 Metacritic Puanı:', results.otherData.metacriticScore ?? "Puanı Yok." ,true)
                .addField('🔖 Etiketleri:', results.otherData.features, true)
                .addField(':man_technologist: Geliştiricileri:', results.otherData.developer, true)
              //  .addField(':man_office_worker: Yayımcıları:', results.otherData.publisher)
                .setColor(ayarlar.renk)
            message.channel.send(embed).catch(e => {
             
              console.log(e)
                message.channel.send(oyunb)
            })
        })
    })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["steam-bilgi"],
  permLevel: 0
};

exports.help = {
  name: 'steam',
  description: 'Aradağınız oyunun steamdaki fiyatına bakmanızı sağlar',
  usage: 'steamfiyat PUBG'
};


/*const Discord = require('discord.js')
var steam = require('steam-provider')
var provider = new steam.SteamProvider();

exports.run = (client, message, args) => {
    let game = args[0]

    let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png"

    if (!game) return message.reply('Lütfen Steamde Olan Bir Oyunun Adını Yazın. Örnek: `steamfiyat PUBG`')

    provider.search(game).then(result => {
        provider.detail(result[0].id, "turkey", "tr").then(results => {
            console.log(results)
            const embed = new Discord.MessageEmbed()
                .setAuthor('Steam Store', steampng)
                .setColor("RANDOM")
                .setTitle(result[0].name)
                .addField(`Oyunun ID'sı`, result[0].id)
                .setThumbnail(results.otherData.imageUrl)
                .addField('Türleri', results.genres)
                .addField('Fiyati', `Nolmal Fiyat **${results.priceData.initialPrice}** TL
                İndirimli Fiyat **${results.priceData.finalPrice}** TL`, true)
                .addField('Platformlar', results.otherData.platforms, true)
                .addField('Metacritic Puanı', results.otherData.metacriticScore, true)
                .addField('Etiketleri', results.otherData.features, true)
                .addField('Geliştiricileri', results.otherData.developer, true)
                .addField('Yayımcıları', results.otherData.publisher)
                .setColor("RANDOM")
            message.channel.send(embed).catch(e => {
                console.log(e)
                message.reply('Hata Olustu Yada `' + game + '` Adlı Oyun Bulunamadı')
            })
        })
    })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'steamfiyat',
  description: 'Aradağınız oyunun steamdaki fiyatına bakmanızı sağlar',
  usage: 'steamfiyat PUBG'
};*/