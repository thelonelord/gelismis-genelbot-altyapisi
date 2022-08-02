const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json")

exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let uid = user.id


    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${client.token}`
        }
    })

    let receive = ''
    let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'

    response.then(a => {
        if (a.status !== 404) {
            a.json().then(data => {
                receive = data['banner']
                console.log(data)

                if (receive !== null) {

                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${client.token}`
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                        }

                    })
                }
            })
        }
    })

    setTimeout(() => {
         let embed1 = new MessageEmbed()
         .setDescription("Kullanıcı bulunamadı.")
            .setColor(ayarlar.renk)
         
        if (!receive) return message.channel.send(embed1)
        let embed = new MessageEmbed()
            .setColor(ayarlar.renk)
            .setImage(banner)
        message.channel.send(embed)
    }, 1000)

}



exports.conf = {
  aliases: ['banner'],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'Banner',
  description: 'İstediğiniz kullanıcının Bannerını verir.',
  usage: 'banner <Kullanıcı Adı>',
};