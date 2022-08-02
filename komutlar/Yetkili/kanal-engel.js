const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../../ayarlar.json');

const hatamesaj = new Discord.MessageEmbed()
.setFooter("HATA!")
.setTimestamp()
.setColor("RANDOM")

let durums = ['deaktif','aktif','liste','bilgi']

exports.run = async (client, message, args) => {
    if(!db.has(`deaktifkanallar_${message.guild.id}`)) db.set(`deaktifkanallar_${message.guild.id}`, [])
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      hatamesaj.setDescription(`Bu Komutu Kullanabilmek İçin \`Yönetici\` İznine İhtiyacın Var.`)
      return message.channel.send(hatamesaj)
    }
    if(!args[0]) {
        hatamesaj.setDescription(`Bir Durum Belirtmen Gerekiyor **Örnek;**\n\`${ayarlar.prefix}kanal-engel <DEAKTIF/LISTE/AKTIF/BILGI>\``)
        return message.channel.send(hatamesaj)
    }
    let durum = args[0].toLowerCase()
    if(!durums.some(a => a === `${durum}`)) {
        hatamesaj.setDescription(`Doğru Durum Belirtmen Gerekiyor **Örnek;**\n\`${ayarlar.prefix}kanal-engel <DEAKTIF/LISTE/AKTIF/BILGI> <KANAL/YOK>\``)
        return message.channel.send(hatamesaj)
    }
    let kanal = message.mentions.channels.first() || message.guild.channels.cache.find(a => a.id === args[1]) || message.channel
    if(durum.toLowerCase() == "deaktif") {
        if(db.fetch(`deaktifkanallar_${message.guild.id}`).includes(kanal.id)) {
            hatamesaj.setDescription(`Bu kanalda komutlar zaten deaktif.`)
            return message.channel.send(hatamesaj)
        }
        const main = new Discord.MessageEmbed()
        .setDescription(`**${kanal.name}** adlı kanalda botun komutlarını deaktifleştireceğim,\n\n> Bu durumu onaylıyorsan :white_check_mark:,\n> Bu durumu onaylamıyorsan :x:`)
        .setColor("RANDOM")
        .setFooter("Düşünmek için 10 saniye süren var.", message.author.displayAvatarURL({dynamic:true}))
        message.channel.send(main).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")

            const onayFiltre = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            const retFiltre = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

            const onayAlert = msg.createReactionCollector(onayFiltre, { time: 10000 });
            const retAlert = msg.createReactionCollector(retFiltre, { time: 10000 });

            onayAlert.on('collect', async (reaction, user) => {
                db.push(`deaktifkanallar_${message.guild.id}`, `${kanal.id}`)
                main.setDescription(`**${kanal.name}** adlı kanalda botun komutlarını deaktifleştirme işlemi başarılı.`)
                main.setColor('RANDOM')
                main.setFooter("✅")
                msg.edit(main)
            })
            retAlert.on('collect', async (reaction, user) => {
                main.setDescription(`**${kanal.name}** adlı kanalda botun komutlarını deaktifleştirme işlemini iptal ettim.`)
                main.setColor('RANDOM')
                main.setFooter("❌")
                msg.edit(main)
            })
        })
    }
    if(durum.toLowerCase() == "aktif") {
        if(!db.fetch(`deaktifkanallar_${message.guild.id}`).includes(kanal.id)) {
            hatamesaj.setDescription(`Bu kanalda komutlar zaten aktif.`)
            return message.channel.send(hatamesaj)
        }
        const main = new Discord.MessageEmbed()
        .setDescription(`**${kanal.name}** adlı kanalda botun komutlarını aktifleştireceğim,\n\n> Bu durumu onaylıyorsan :white_check_mark:,\n> Bu durumu onaylamıyorsan :x:`)
        .setColor("RANDOM")
        .setFooter("Düşünmek için 10 saniye süren var.", message.author.displayAvatarURL({dynamic:true}))
        message.channel.send(main).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")

            const onayFiltre = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            const retFiltre = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

            const onayAlert = msg.createReactionCollector(onayFiltre, { time: 10000 });
            const retAlert = msg.createReactionCollector(retFiltre, { time: 10000 });

            onayAlert.on('collect', async (reaction, user) => {
                let toplukanal = db.fetch(`deaktifkanallar_${message.guild.id}`)
                let toplukanal2 = toplukanal.filter(a => a !== kanal.id)
                db.set(`deaktifkanallar_${message.guild.id}`, toplukanal2)
                main.setDescription(`**${kanal.name}** adlı kanalda botun komutlarını aktifleştirme işlemi başarılı.`)
                main.setColor('RANDOM')
                main.setFooter("✅")
                msg.edit(main)
            })
            retAlert.on('collect', async (reaction, user) => {
                main.setDescription(`**${kanal.name}** adlı kanalda botun komutlarını aktifleştirme işlemini iptal ettim.`)
                main.setColor('RANDOM')
                main.setFooter("❌")
                msg.edit(main)
            })
        })
    }
    if(durum.toLowerCase() == "liste") {
        let channels = db.fetch(`deaktifkanallar_${message.guild.id}`) || [];
        if(channels.length > 0) {
            let cakmauzunluk = parseInt(channels.length/10)
            let sayfa = 0
            let uzunluk;
            if(channels.length / 10 == cakmauzunluk) {uzunluk = cakmauzunluk} else {uzunluk = cakmauzunluk + 1}
            const main = new Discord.MessageEmbed()
            .setDescription(`**Komut Kullanımı Kapatılmış Kanallar;**\n\n${channels.slice(sayfa*10, (sayfa+1)*10).map(b => `• \`${b}\` | <#${b}>`).join('\n')}`)
            .setColor("RANDOM")
            .setFooter(`Sayfa 1 / ${uzunluk}`)
            message.channel.send(main).then(async msg => {
                await msg.react("⬅")
                await msg.react("➡")

                const geriFiltre = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
                const ileriFiltre = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

                const geriAlert = msg.createReactionCollector(geriFiltre, { time: 900000 });
                const ileriAlert = msg.createReactionCollector(ileriFiltre, { time: 900000 });

                ileriAlert.on('collect', async (reaction, user) => {
                    if(sayfa+1 === uzunluk) return;
                      sayfa++;
                      main.setDescription(`**Komut Kullanımı Kapatılmış Kanallar;**\n\n${channels.slice(sayfa*10, (sayfa+1)*10).map(b => `• \`${b}\` | <#${b}>`).join('\n')}`)
                      main.setColor('RANDOM')
                      main.setFooter(`Sayfa ${sayfa+1} / ${uzunluk}`)
                      msg.edit(main)
                  })
                  geriAlert.on('collect', async (reaction, user) => {
                    if(sayfa === 0) return;
                      sayfa--;
                      main.setDescription(`**Komut Kullanımı Kapatılmış Kanallar;**\n\n${channels.slice(sayfa*10, (sayfa+1)*10).map(b => `• \`${b}\` | <#${b}>`).join('\n')}`)
                      main.setColor('RANDOM')
                      main.setFooter(`Sayfa ${sayfa+1} / ${uzunluk}`)
                      msg.edit(main)
                  })
            })
        } else {
            const mesaj = new Discord.MessageEmbed()
            .setDescription(`**Komut Kullanımı Kapatılmış Kanallar;**\n\`\`\`fix
Komut kullanımı kapatılmış kanal bulunmuyor.\`\`\``)
            .setFooter(`${message.author.username} tarafından kullanıldı.`)
            return message.channel.send(mesaj)
        }
    }
    if(durum.toLowerCase() == "bilgi") {
        const bilgimetin = new Discord.MessageEmbed()
        .setDescription(`**Komut hakkında bilgi;**\n\`Bu komut kanalda botun komutlarının deaktif olmasını sağlar böylelikle genel sohbet kanallarında botu kullanmayı engelleyebilirsiniz.\``)
        .addField(`${ayarlar.prefix}kanal-engel **deaktif**`, `\`\`\`fix
Bu komutu kullandığınız kanalda botun komutları deaktifleşir ve çalışmaz hale gelir.\`\`\``, true)
        .addField(`${ayarlar.prefix}kanal-engel **aktif**`, `\`\`\`fix
Bu komutu kullandığınız kanalda botun komutları aktifleşir ve çalışır hale gelir.\`\`\``, true)
        .addField(`${ayarlar.prefix}kanal-engel **liste**`, `\`\`\`fix
Bu komut komutların deaktifleştiği kanalları gösterir.\`\`\``)
        .setFooter(`${ayarlar.prefix}kanal-engel <deaktif/aktif/liste/bilgi> <#champ/ID/message-channel>`, message.author.displayAvatarURL({dynamic:true}))
        return message.channel.send(bilgimetin)
    }

};

exports.conf = {
  aliases: ['komut-kullanım','komutkullanım','kanalakomutengel','kanala-komut-engelle','kanalengel','kanal-engel'],
  permLevel: 4
};

exports.help = {
  name: 'komutkullanım',
  description: 'Kanal da komut kullanımını engellersiniz.',
  usage: 'komut-kullanım <DEAKTIF/LISTE/AKTIF>'
};


/*
if(!db.has(`deaktifkanallar_${message.guild.id}`)) db.set(`deaktifkanallar_${message.guild.id}`, [])
if(db.fetch(`deaktifkanallar_${message.guild.id}`).some(champ => champ === message.channel.id)) return;	

if cmd kısmına */

