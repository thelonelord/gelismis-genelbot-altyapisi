const Discord = require(`discord.js`);
const db = require(`quick.db`);
module.exports.run = async (client, message, args) => {
  var user = message.mentions.users.first() || message.author || message.author.id;

  let onay = await db.fetch(`memberBadge_${user.id}`);
  let yetkili = await db.fetch(`memberBadge2_${user.id}`);
  let destekçi = await db.fetch(`memberBadge3_${user.id}`);
  let mod = await db.fetch(`memberBadge4_${user.id}`);
  let paraR = await db.fetch(`memberBadge6_${user.id}`);
  let gold = await db.fetch(`üyelikk_${user.id}`, "üyelik");
  let web = await db.fetch(`webp_${user.id}`, "webp");
/*  let evet = await client.emojis.cache.get(client.emojiler.evet);
  let hayır = await client.emojis.cache.get(client.emojiler.hayır);

  let onayE = await client.emojis.cache.get(client.emojiler.onayRozet);
  let yetkiliE = await client.emojis.cache.get(client.emojiler.yetkiliRozet);
  let modE = await client.emojis.cache.get(client.emojiler.modRozet);
  let destekçiE = await client.emojis.cache.get(client.emojiler.destekçiRozet);
  let paraE = await client.emojis.cache.get(client.emojiler.paraROZET);
  let goldE = await client.emojis.cache.get(client.emojiler.gold);
  let webE = await client.emojis.cache.get(client.emojiler.mutlu);*/
  let sayfa = [
    `**${user.tag} || Rozetler**

 <:yetkili:789739614247583775> **Yetkili rozeti:** ${
   yetkili ==
   `https://cdn.discordapp.com/attachments/474685686075621376/480845736347435009/401723658491527168.png`
     ? `<a:yesil_onay:727045346852601908> Alınmış`
     : `<a:neoncarpi:780444956849340416> Alınmamış`
 }
   
    <:moderator:789739646556831764> **Moderatör rozeti:** ${
      mod ==
      `https://cdn.discordapp.com/attachments/474685686075621376/480845735647117312/401724520806875139.png`
        ? `<a:yesil_onay:727045346852601908> Alınmış`
        : `<a:neoncarpi:780444956849340416> Alınmamış`
    }

    <:neononay:789739690965467136> **Onay rozeti:** ${
      onay ==
      `https://cdn.discordapp.com/attachments/474685686075621376/480845736347435015/401725450470031362.png`
        ? `<a:yesil_onay:727045346852601908> Alınmış`
        : `<a:neoncarpi:780444956849340416> Alınmamış`
    }

    <:destekci:789739719906295819> **Destekçi rozeti:** ${
      destekçi ==
      `https://cdn.discordapp.com/attachments/474685686075621376/480845737006202881/401725034453925889.png`
        ? `<a:yesil_onay:727045346852601908> Alınmış`
        : `<a:neoncarpi:780444956849340416> Alınmamış`
    }
   
    <:yildirim:789739751624278027> **Yıldırım rozeti:** ${
      paraR ==
      `https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png`
        ? `<a:yesil_onay:727045346852601908> Alınmış`
        : `<a:neoncarpi:780444956849340416> Alınmamış`
    }

  <:saf_altin:734000027072200754>  **Gold rozeti:** ${
    gold
      ? `<a:yesil_onay:727045346852601908> Alınmış`
      : `<a:neoncarpi:780444956849340416> Alınmamış`
  }

  <:colt:724983390633197608> **Panel rozeti:** ${
    web
      ? `<a:yesil_onay:727045346852601908> Alınmış`
      : `<a:neoncarpi:780444956849340416> Alınmamış`
  }
    `
  ];

  const profilE = new Discord.MessageEmbed()
    .setColor(`#0000c8`)
    .setDescription(sayfa)
    .setTimestamp()
    .setFooter(`Komut ${message.author.tag} tarafından kullanıldı`);
  message.channel.send(profilE);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rozetlerim"],
  permLevel: 0,
  kategori: "profil"
};

module.exports.help = {
  name: "rozetler",
  description: "Rozetlerinizi veya bir başkasının rozetlerini görürsünüz",
  usage: "rozetler"
};
