const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  let secenek = ["ayarla", "aç", "ac"];
  let secenekk = ["kapat", "sıfırla", "sifirla"];
  let acikmi = await db.fetch(`${message.guild.id}.capsengel`);
  let aredembed = new Discord.MessageEmbed().setColor("#0000c8");
  

  if (secenek.includes(args[0])) {
    if (!args[1]) {
      if (acikmi)
        return message.channel.send(
          aredembed.setDescription(
            "<a:neoncarpi:780444956849340416> Büyük Harf Engelleme sistemi aktif olmadığından kapatılamaz."
          )
        );
      message.channel.send(
        new Discord.MessageEmbed()
      .setColor("#0000c8")

          .setDescription(
            "<a:yesil_onay:727045346852601908> CapsLock Engelleme sistemi **varsayılan** olarak açıldı\n"
          )
      );
      db.set(`${message.guild.id}.capsengel`, { yuzde: "50" });
    } else {
      if (isNaN(args[1]))
        return message.channel.send(
          aredembed.setDescription(
            "Oran yalnızca bir **sayı** olmalıdır."
          )
        );
      if (args[1] >= 101)
        return message.channel.send(
          aredembed.setDescription(
            "**Oran 101 den küçük**, 0 dan büyük bir sayı olmalıdır."
          )
        );
      if (args[1] <= 0)
        return message.channel.send(
          aredembed.setDescription(
            "Oran 101 den küçük, **0 dan büyük bir sayı olmalıdır.**"
          )
        );
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Büyük harf engelleme sistemi, Aktive edildi.
Üyeleri Yasakla yetkisine sahip olanların %${args[1]} büyük harfli olan mesajları engellenmiyecektir.`)
      );

      db.set(`${message.guild.id}.capsengel`, { yuzde: args[1] });
    }
  } else if (secenekk.includes(args[0])) {
    if (!acikmi)
      return message.channel.send(
        aredembed.setDescription(
          `<a:neoncarpi:780444956849340416> Büyük Harf Engelleme sistemi aktif olmadığından kapatılamaz.`
        )
      );
    message.channel.send(
      new Discord.MessageEmbed().setColor("#0000c8").setDescription(`<a:yesil_onay:727045346852601908> Büyük Harf engelleme sistemi, **Kapatıldı.**`)
    );
    db.delete(`${message.guild.id}.capsengel`);
  } else {
    let acikkk;
    if (acikmi)
      acikkk = `${acikmi.yuzde}% olarak Açık**`;
    let kodare = new Discord.MessageEmbed().setColor("#0000c8").setDescription(
      `Büyük Harf Engelleme Sistemi
Açmak İçin: **${prefix}büyükharf-engelle aç <oran>** 
Kapatmak İçin: **${prefix}büyükharf-engelle kapat**`
    );

    message.channel.send(kodare);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [
    "buyukharfengelle",
    "caps-engelle",
    "capslockengelle",
    "capslock-engelle",
    "caps-engel",
    "capslock",
    "büyükharf-engelle"
  ],
  permLevel: 3
};
exports.help = {
  name: "capsengel",
  description:
    "Eğer açılırsa bir mesajda belirttiğiniz %de kadar harf büyük yazılmışsa o mesaj silinir.",
  usage:
    "capsengel aç/sıfırla oran (Oran 101 den küçük, 0 dan büyük bir sayı olmalıdır!)"
};
