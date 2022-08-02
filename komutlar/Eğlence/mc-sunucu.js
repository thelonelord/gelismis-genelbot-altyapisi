const Discord = require("discord.js");
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send(`${message.author} Sunucu IP adresi giriniz.`)
    const API = await fetch(`http://mcapi.tc/?${args[0]}/json`)
    const Data = await API.json();
    if (Data.status === "offline") {
        const embed2 = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(args[0])
            .setDescription(`Girmiş olduğun IP adresine bağlı olan sunucu aktif değil.`)
            
        message.channel.send(embed2)
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(args[0])
            .addField(`Sunucu IP Adresi`, Data.hostname, true)
            .addField(`Gecikme`, Data.ping, true)
            .addField(`Oyuncu Sayısı`, `${Data.players}/${Data.max_players}`, true)
            .addField(`Sürüm`, Data.version, true)
            .setImage(`http://status.mclive.eu/ROO8-Bot/${args[0]}/25565/banner.png`)
        message.channel.send(embed)
    }

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mc-sunucu-bilgi","mc-sunucu"],
    permLevel: 0
};
exports.help = {
    name: 'minecraft-sunucu-bilgi',
};