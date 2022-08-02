const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json")
module.exports.run = async (client, message, args) => {



    let google = args.slice(0).join('+');

        let link = `https://www.google.com/search?q=` + google;
        if(!google)return message.reply(`Googleda Aratmak İstediğini Yazarmısın`)
        if(!link)return message.channel.send("Bir hata oluştu.")
        let embed = new Discord.MessageEmbed()
    
    .setColor(ayarlar.renk)
    .setTimestamp()
    .addField('Aranıyor:', `${args.slice(0).join(' ')}`)
    .addField("Yazı:", `${args.slice(0).join(' ')}`)
    .addField('Link:', `${link}`)
    .setFooter("Google", message.author.avatarURL());
          
    message.channel.send(embed);
    //message.author.send(`Bulunan ${link} | ${ message.guild.name}`);
  
}



exports.conf =
{
  aliases: ["google-ara"]
}

exports.help =
{
  name: "google",
  description: "Google Search.",
  usage: "google"
}