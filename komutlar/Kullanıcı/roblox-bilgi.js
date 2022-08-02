const Discord = require("discord.js");


exports.run = async (client, message, args) => {


    var aktiflik;
    const fetch = require('node-fetch')
    let ulke = message.content.split(" ").slice(1).join(" ")
    if (!ulke) return message.reply('**Bir Oyuncu Adı Girmelisin!**')



    if (ulke.includes('ç' || 'Ç' || 'ğ' || 'Ğ' || 'İ' || 'ö' || 'Ö' || 'ş' || 'Ş' || 'ü' || 'Ü' || 'ı')) {
        return message.channel.send('**Oyuncu Adları Türkçe Karakterler İçermemelidir!**')
    }




    fetch(`http://api.roblox.com/users/get-by-username?username=${ulke}`)
        .then(res => res.json()).then(body => {
            let { Id, IsOnline } = body;



            if (body.success === false) return message.reply('**Böyle Bir Oyuncu Bulunamadı!**')



            if (ulke.length < 3) return message.reply(`**Oyuncu Adları En Az 3 Karakterden Oluşmalıdır!**`)


            if (IsOnline === false) {
                aktiflik = ":x:"
            } else {
                aktiflik = ":white_check_mark:"
            }



            fetch(`https://friends.roblox.com/v1/users/${Id}/friends/count`)
                .then(res => res.json()).then(body => {
                    let { } = body;

                    let arkadas = body.count


                    fetch(`https://users.roblox.com/v1/users/${Id}/status`)
                        .then(res => res.json()).then(body => {
                            let { status } = body;

                            if (status === "") {
                                status = "Durum Belirlenmemiş"
                            }

                            fetch(`https://friends.roblox.com/v1/users/${Id}/followers/count`)
                                .then(res => res.json()).then(body => {
                                    let { count } = body;



                                    fetch(`https://users.roblox.com/v1/users/${Id}`)
                                        .then(res => res.json()).then(body => {
                                            let { isBanned, created } = body;


                                            if (isBanned === true) {
                                                isBanned = "Bu Kullanıcı Yasaklı"
                                            }
                                            if (isBanned === false) {
                                                isBanned = "Bu Kullanıcı Yasaklı Değil"
                                            }


                                            fetch(`https://friends.roblox.com/v1/users/${Id}/followings/count`)
                                                .then(res => res.json()).then(body => {
                                                    let { } = body;

                                                    let takipedilen = body.count

                                                    var newStr = created.substring(0, created.length - 14);
                                                    console.log(newStr)
                                                    const splituras = newStr.split("-")
                                                    console.log(splituras.reverse())
                                                    const tarih = splituras.reverse()


                                                    const embed = new Discord.MessageEmbed()
                                                        .setAuthor(`${ulke} Oyuncusunun Bilgileri`, `https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=${ulke}`)
                                                        .setColor(`RANDOM`)
                                                        .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=${ulke}`)
                                                        .addField(` Kullanıcı Adı`, `${ulke}`, true)
                                                        .addField(` ID`, `${Id}`, true)
                                                        .addField(` Aktiflik Durumu`, `${aktiflik}`, true)
                                                        .addField(` Durum`, `${status}`, true)
                                                        .addField(` Arkadaş Sayısı`, `${arkadas}`, true)
                                                        .addField(`Takipçiler`, `${count}`, true)
                                                        .addField(`Takip Edilen`, `${takipedilen}`, true)
                                                        .addField(`Yasaklı Mı?`, `${isBanned}`, true)
                                                        .addField(`Hesap Oluşturulma Tarihi`, `${tarih[2]}-${tarih[1]}-${tarih[0]}`, true)
                                                        .setFooter("Bilgiler Her Zaman Doğru Olmayabilir!")
                                                    message.channel.send(embed)


                                                })

                                        })

                                })

                        })




                })

        })
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["roblox-kullanıcı-bilgi","roblox-bilgi"],
    permLevel: 0
};

exports.help = {
    name: 'roblox',
    description: 'Belirttiğiniz Roblox Kullanıcısının Hesap Bilgilerini Gösterir.'
};