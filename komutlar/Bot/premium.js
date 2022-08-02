const database = require("quick.db");
const Discord = require("discord.js");
const moment = require("moment");
const ayarlar = require("../../ayarlar.json")
exports.run = async (client, message, args) => {
  
  
  let u = message.mentions.members.first() || message.author.id
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setTitle(
          "<a:takviye8:855424463909814313>  Premium Paketi **__14,99₺__**"
        )
      .setDescription(`• Eğer paketi almak destek sunucusuna gelip destek açarak paketinizi alabilirsiniz.

• Oy vermeyi gerektiren komutları oy vermeden kullanabilme.
• Kapanmalardan etkilenmeme.
• Korum Sistemlerini kullanabilme.
• Premium alanlara özel bota eklenecek olan yeni komutları önceden görebilme.
• Premium alanlara Gold Üyelik verilir. Bununla birlikte Gelen-Giden, Sayaç, Otorol, Kayıt ve cevap-sistemi gibi sistemlerde gold üyeliğiniz görülür olur.
• Pakete özel yardım menüsünü görebilme.`)
     /*   .setDescription(
          `
**R8 Premium Nedir?**\nR8 Premium, bot gelişimini desteklemek için alabileceğiniz bir aboneliktir. R8 kullanmak zorunlu değildir, ancak alırsanız özel özelliklerin kilidini açmanızı sağlar.\n**Premium Özellikleri Nelerdir?**\nÖzel Koruma Sistemleri\nPlan Süresi Boyunca Gold Üyelik\nÖzel Çekiliş Sistemleri\n**Paketler Neler?**\n 1 Aylık Plan 11.95 ₺\n6 Aylık Plan 81.70 ₺\n1 Yıllık Plan 163.40 ₺\nÖmür Boyu Plan 83.90 ₺\n**Premium Kodunuz Mu Var?**\n Kullanmak İçin /premium kullan <kod>
`
        )*/
        
    );

 // if (args[0] == "kontrol" || args[0] == "süre") {}
  if (args[0].toLowerCase() === 'kontrol' || args[0].toLowerCase() === 'süre') {
    if (database.has(message.guild.id)) {
      const Embed = new Discord.MessageEmbed()
     //   .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
       .setColor(ayarlar.renk) .setDescription(`<a:takviye8:855424463909814313> Premium sürenizin bitmesine ${moment.duration(database.fetch(message.guild.id).Bitişp - Date.now()).format('w [hafta] d [gün] h [saat] m [dakika] s [saniye]')} kaldı.`)
    //    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      return message.channel.send(Embed)//.then(m => m.delete({ timeout: 5000 }));
    }
    if (database.has(`premium.${message.guild.id}`)) {
      const Embed = new Discord.MessageEmbed()
      //  .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
        .setDescription(`Sınırsız premium süreniz var.`)
    //    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      return message.channel.send(Embed)
    } else {
      message.channel.send(new Discord.MessageEmbed().setColor(ayarlar.renk).setDescription(`${message.author} Sunucu premiuma sahip değil.`))//.then(m => m.delete({ timeout: 5000 }));
    }
  }
    
    
  
  /*  if (message.author.id !== "")
      if (!u)
        //
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("Birini Etiketle")
        );
    function makeid(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    let kod = makeid(25);
    console.log(kod + ` Kodunu ${u} İçin Oluşturdum!`);
    db.push(`pre.${u.id}`, { code: kod });
    console.log(db.fetch(`pre.${u.id}`).code);
    u.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Premium`)
        .setDescription(
          `Bu Kodu İstediğin Bir Sunucuda Kullanabilirsin!\nKodun: ${kod} \nKodu Kullanmak İçin: /premium kullan <kod>`
        )
    );
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Kod Oluşturuldu.`)
    );
  }
  if (args[0] == "sil" || args[0] == "al") {
    if (message.author.id !== "")
      if (!args[1])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Bir Sunucunun ID'sini Gir.`)
        );
    let id = args[1];
    if (isNaN(id))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Sadece Sayı Girebilirsin.`)
      );

    if (!client.guilds.cache.get(id))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`**${id}**li Sunucusunu Bulamıyorum.`)
      );
    let pr = await db.fetch(`premium.${id}`);
    if (!pr)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            `**${client.guilds.cache.get(id).name}** Zaten Premium Aktif Değil.`
          )
      );

    db.delete(`premium.${id}`);
    message.channel.send(
      `${
        client.guilds.cache.get(id).name
      } İsimli Sunucu İçin **PREMIUM** de-aktif Edildi!`
    );
  } else if (args[0] == "kontrol") {
    let cmd = db.fetch(`premium.${message.guild.id}`);
    if (!cmd)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .addField("Premium:", "Aktif Değil")
      );
    let as = "";
    cmd.map(async k => (as += `${k.date}`));
    if (cmd) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .addField("Premium:", "Aktif")
          .addField("Premium Başlangıç Tarihi:", as)
      );
    }
  } else if (args[0] == "kullan") {
    let cmd = db.fetch(`pre.${message.author.id}`);
    if (!cmd)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription("Hiç Premium Kodun Yok!")
      );
    let a = cmd.find(a => a.code === args[1]);
    let pre = db.fetch(`premium.${message.guild.id}`);
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            "Bir Premium Kodu Girmelisin! \nKodlarının Listesini Görmek için premium kodum** Yaz!"
          )
      );
    if (pre)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription("Sunucu Zaten **Premium**")
      );
    if (a) {
      if (cmd.length === 1) {
        db.delete(`pre.${message.author.id}`);
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Başarıyla Kod Kullanıldı.`)
        );
        db.push(`premium.${message.guild.id}`, {
          date: moment().format("DD-MM-YYYY"),
          pre: true
        });
      } else {
        let ex = [];
        cmd.forEach(dbs => {
          if (dbs.code === args[1]) return;
          ex.push(dbs);
          db.set(`pre.${message.author.id}`, ex);
        });
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Başarıyla Kod Kullanıldı.`)
        );
        db.push(`premium.${message.guild.id}`, {
          date: moment().format("DD-MM-YYYY"),
          pre: true
        });
      }
    } else {
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Premim`)
          .setDescription(`Kod Hatalı Veya Kullanılmış!`)
          .setFooter(`Hata!`)
      );
    }
  } else if (args[0] == "kodum") {
    const a = await db.fetch(`pre.${message.author.id}`);
    if (a) {
      let i = 0;
      let as = "";
      a.map(async k => {
        i++;
        as += `${i}) **${k.code}** \n`;
      });
      let msgs = "";
      if (a.length === 1) msgs = "Kodun:";
      else msgs = "Kodların:";
      message.member.send(
        new Discord.MessageEmbed().setColor("RANDOM").addField(msgs, as)
      );
      let msg = "";
      if (a.length === 1) msg = "Kodunu DM'ne Gönderdim!";
      else msg = "Kodlarını DM'ne Gönderdim!";
      message.channel.send(
        new Discord.MessageEmbed().setColor("RANDOM").setDescription(msg)
      );
    }
  }*/
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pre"],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: "premium",
  description: "Premium sistemi hakkında bilgi verir",
  usage: "premium"
};
