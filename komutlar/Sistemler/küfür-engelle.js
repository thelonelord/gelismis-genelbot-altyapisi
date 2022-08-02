const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message) => {
  const db = require("quick.db");

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
  let args = message.content.split(" ").slice(1);
  const secenekler = args.slice(0).join(" ");

  if (secenekler.length < 1)
    return message.reply(
      new Discord.MessageEmbed()

        .setDescription(
          `<a:neoncarpi:780444956849340416> Küfür Engelleme Sistemi\nAçmak İçin **${prefix}küfür-engelle aç**\nKapatmak İçin **${prefix}küfür-engelle kapat**`
        )
        .setColor("#0000c8")
    );

  //if(secenekler === "aç" || "kapat") return message.channel.send(errembed);

  if (
    secenekler !== "aç" &&
    secenekler !== "kapat" &&
    secenekler !== "on" &&
    secenekler !== "off"
  )
    return message.reply(
      new Discord.MessageEmbed()

        .setDescription(
          `<a:neoncarpi:780444956849340416> Küfür Engelleme Sistemi\nAçmak İçin **${prefix}küfür-engelle aç**\nKapatmak İçin **${prefix}küfür-engelle kapat**`
        )
        .setColor("#0000c8")
    );

  if (secenekler === "aç" || secenekler === "on") {
    var i = db.set(`küfürE_${message.guild.id}`, "acik");

    const embed = new Discord.MessageEmbed()
      .setColor("#0000c8")
      .setDescription(
        `<a:yesil_onay:727045346852601908> Küfür engelleme sistemi, **Açıldı**\n**Üyeleri Yasakla yetkisine sahip olanların küfürleri engellenmiyecektir.**`
      );
    message.channel.send(embed);
    /*let kufurEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));
 if(!kufurEngel[message.guild.id]){
		kufurEngel[message.guild.id] = {
			kufurEngel: "acik"
		  };
  };
		  fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (x) => {
        if (x) console.error(x)
      })*/
  }

  if (secenekler === "kapat" || secenekler === "off") {
    //var i = db.set(`küfürE_${message.guild.id}`, "kapali")

    db.delete(`küfürE_${message.guild.id}`);

    message.channel.send(
      new Discord.MessageEmbed()

        .setDescription(
          `<a:yesil_onay:727045346852601908> Küfür engelleme sistemi, **Kapatıldı.**`
        )
        .setColor("#0000c8")
    );
    /*let kufurEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));
  if(!kufurEngel[message.guild.id]){
		kufurEngel[message.guild.id] = {
			kufurEngel: "kapali"
		  };
  };
		fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (x) => {
        if (x) console.error(x)
      })
    
    if (kufurEngel[message.guild.id]) {
    delete kufurEngel[message.guild.id]
    delete kufurEngel[message.guild.id].kufurEngel
    }*/
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel", "küfür"],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: "küfür-engelle",
  description: "Küfür engelleme sistemini açıp kapatmanızı sağlar.",
  usage: "küfür-engelle <aç/kapat>"
};
