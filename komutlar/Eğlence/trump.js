const Discord = require("discord.js");
const { get } = require("superagent");
const a = require("../../ayarlar.json");
  exports.run = (client, message, args) => {
    
    
    
    try {
        if(!args[0]){
message.channel.send(new Discord.MessageEmbed()
                    .setColor(a.renk)
                     .setDescription(":pencil: Oluşturulacak resmin metnini girmelisin.") 
                     )
return;
}
      
      
       if (args[0].includes('ç' || 'Ç' || 'ğ' || 'Ğ' || 'İ' || 'ö' || 'Ö' || 'ş' || 'Ş' || 'ü' || 'Ü' || 'ı')) {
        return message.channel.send(new Discord.MessageEmbed()
                                   .setDescription("<:engel8:855416305028300800> Oluşturulacak resmin metni türkçe karakter içermemelidir.")
                                   .setColor(a.renk)
                                   )
    }
      
      
        let url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args.join(" ")}`
        get(url).then(res => {
            const embed = new Discord.MessageEmbed() 
            .setColor(a.renk)
            .setImage(res.body.message)
            setTimeout(() => {
                return message.channel.send(embed); 
            }, 100);
        });
    } catch(err) {
        console.log(err)   
    }
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'trump',
  description: 'Trump yazar',
  usage: 'trump <yazı>'
};