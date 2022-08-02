const Discord = require("discord.js");
const db = require("quick.db");

    exports.run = async (client, message, args) => {
      
        const ayarlar = require("../../ayarlar.json");

  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

      
        message.delete();
        if (!args[0])
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Not Sistemi (3 Not İle Sınırlandırılmıştır!!)")
    .setTitle(`Not Komutları`)
    .addField('**oluştur:**', `**${prefix}not oluştur <1-2-3> <Not İçeriği>** Not Almanızı Sağlar`)
    .addField('**sil:**', `**${prefix}not sil <1-2-3>** Aldığınız Notu Silmenizi Sağlar.`)
    .addField('**oku:**', `**${prefix}not oku <1-2-3>** Aldığınız Notları Okumanızı Sağlar.`)
   .setColor("#0000c8")
                                .addField('**tümü:**', `**${prefix}not tümü** Aldığınız Tüm Notları Listeler`)
    );
      
      if (args[0] == "al"  || args[0] == "ekle" || args[0] == "oluştur" || args[0] == "yaz") {
        let zaman = new Date()
        let nott = zaman.getFullYear() + "/" + (zaman.getMonth() +1) + "/" + zaman.getDate() + " | " + zaman.getHours() + ":" + zaman.getMinutes() + ":" + zaman.getSeconds();

        if(args[1] === "1"){
            let mesaj = args.slice(2).join(' ')

            db.set(`not1_${message.author.id}`, [mesaj + "  \n`" + nott + "`"])
            message.delete();
            message.channel.send('1. Notunuz Kayıt Edildi...')
            
        }

        if(args[1] === "2"){
            let mesaj2 = args.slice(2).join(' ')

            db.set(`not2_${message.author.id}`, [mesaj2 + "  \n`" + nott + "`"])
            message.delete();
            message.channel.send('2. Notunuz Kayıt Edildi...')
            
        }

        if(args[1] === "3"){
            let mesaj3 = args.slice(2).join(' ')

            db.set(`not3_${message.author.id}`, [mesaj3 + "  \n`" + nott + "`"])
            message.delete();
            message.channel.send('3. Notunuz Kayıt Edildi...')
            
        }

        if(args[1] > 4){
            message.delete();
            message.reply('En Fazla 3 Not Kaydedebilirsiniz.')
            
        }
    };


    //------------------------------------------------------------------------------------------
    
         if (args[0] ==  "sil" || args[0] == "yoket") {

                    if(args[1] === "1"){
                        db.delete(`not1_${message.author.id}`)
                        message.delete();
                        message.channel.send('1. Notunuz Silindi')
                        
                    }
            
                    if(args[1] === "2"){
                        db.delete(`not2_${message.author.id}`)
                        message.delete();
                        message.channel.send('2. Notunuz Silindi')
                        
                    }
            
                    if(args[1] === "3"){
                        db.delete(`not3_${message.author.id}`)
                        message.delete();
                        message.channel.send('3. Notunuz Silindi')
                        
                    }
            
                    if(args[1] > 4){
                        message.delete();
                        message.reply('En Fazla 3 Not Silebilirsiniz.')
                        
                    };
                    
//------------------------------------------------------------------------------------------

               } else if (args[0] == "oku" || args[0] == "bak") {
                    let not1 = db.fetch(`not1_${message.author.id}`)
                    let not2 = db.fetch(`not2_${message.author.id}`)
                    let not3 = db.fetch(`not3_${message.author.id}`)

                    if(args[1] === "1"){
                        message.delete();
                        const msg1 = new Discord.MessageEmbed()
                    .setDescription(`
                        ${message.author} **İlk Aldığın Not;**
                        1- ${not1 || "Almış Olduğunuz Bir Not Bulunmuyor"}
                    `)
                    .setColor("#0000c8")
                    message.channel.send(msg1)
                    
                    }

                    if(args[1] === "2"){
                        message.delete();
                        const msg3 = new Discord.MessageEmbed()
                        .setDescription(`
                            ${message.author} **2. Aldığın Not;**
                            2- ${not2 || "Almış Olduğunuz Bir Not Bulunmuyor"}
                        `)
                        .setColor("#0000c8")
                        message.channel.send(msg3)
                        
                    }

                    if(args[1] === "3"){
                        message.delete();
                        const not4 = new Discord.MessageEmbed()
                        .setDescription(`
                            ${message.author} **3. Aldığın Not;**
                            1- ${not1 || "Almış Olduğunuz Bir Not Bulunmuyor"}
                        `)
                        .setColor("#0000c8")
                        message.channel.send(not4)
                        
                    }

                    if(args[1] > 4){
                        message.delete();
                        message.reply('En fazla 3 not silebilirsin.')
                    };

//------------------------------------------------------------------------------------------


     } else if (args[0] == "tümü" || args[0] == "hepsi" || args[0] == "tamamı") {
        let not1 = db.fetch(`not1_${message.author.id}`)
        let not2 = db.fetch(`not2_${message.author.id}`)
        let not3 = db.fetch(`not3_${message.author.id}`)



        message.delete();
        const nnot1 = new Discord.MessageEmbed()
        .setDescription(`
            ${message.author} **Aldığın Notlar**
            1- ${not1 || "Almış Olduğunuz Bir Not Bulunmuyor"}\n
            2- ${not2 || "Almış Olduğunuz Bir Not Bulunmuyor"}\n
            3- ${not3 || "Almış Olduğunuz Bir Not Bulunmuyor"}
        `)
        .setColor("#0000c8")
        message.channel.send(nnot1)
        
    } 

} 



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["note"],
    permLevel: 0,
};
 
exports.help = {
    name: 'not',
    description: 'not',
    usage: 'not'
}