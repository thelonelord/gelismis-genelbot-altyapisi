const discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  var ayarlar = require("../../ayarlar.json");

  let kapalı = "KAPALI";
  let açık = "AÇIK";
  let capslock = db.fetch(`${message.guild.id}.capsengel`);
  let modlog = db.fetch(`modlogkanaly_${message.guild.id}`);
  let hg = db.fetch(`gcc_${message.guild.id}`);
  let ek2 = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  let g3 = db.fetch(`guvenlik3_${message.guild.id}`);
  let le = db.fetch(`linkE_${message.guild.id}`);
  let ke = db.fetch(`küfürE_${message.guild.id}`, "acik");
  let ce = db.fetch(`ss_${message.guild.id}`);
  let otorol = db.fetch(`orol_${message.guild.id}`);
  let sayac = db.fetch(`sKanal_${message.guild.id}`);

  let hgbb;
  if (!hg) {
    hgbb = kapalı;
  } else {
    hgbb = `<#${hg}>`;
  }

  let modlogs;
  if (!modlog) {
    modlogs = kapalı;
  } else {
    modlogs = `<#${modlog}>`;
  }

  let saya;
  if (!sayac) {
    saya = kapalı;
  } else {
    saya = `<#${sayac}>`;
  }

  let oto;
  if (!otorol) {
    oto = kapalı;
  } else {
    oto = `<@&${otorol}>`;
  }

  let capslock2;
  if (!capslock) {
    capslock2 = kapalı;
  } else {
    capslock2 = açık;
  }

  let ek;
  if (!ek2) {
    ek = kapalı;
  } else {
    ek = `${ek2}`;
  }

  let g;
  if (!g3) {
    g = kapalı;
  } else {
    g = `<#${g3}>`;
  }

  let l;
  if (!le) {
    l = kapalı;
  } else {
    l = açık;
  }

  let k;
  if (!ke) {
    k = kapalı;
  } else {
    k = açık;
  }

  let c;
  if (!ce) {
    c = kapalı;
  } else {
    c = açık;
  }

  const ayarla = new discord.MessageEmbed()
    .setTitle(`:gear: ${message.guild.name} | Ayarları`)
    .setDescription(
      `
  **Sunucu Ön Eki** ${ek2}
  
  **Gelen Giden** ${hgbb}
  
  **Güvenlik** ${g}
  
  **Sayaç Kanal** ${saya}
  
  **ModLog Kanalı** ${modlogs}
   
  **Otorol** ${oto}
  
  **Reklam engel** ${l}
  
  **Küfür engel** ${k}
  
  **Cevap sistemi** ${c}
  
  **CapsLock Engel** ${capslock2}

 
 
  `
    )
    .setColor(ayarlar.renk);
  message.channel.send(ayarla);
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["settings"],
  permlvl: 0
};

exports.help = {
  name: "ayarlar"
};
